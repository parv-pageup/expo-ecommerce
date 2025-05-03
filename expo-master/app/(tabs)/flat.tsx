import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import Button from "@/components/Button";
import { useDebounce } from "use-debounce";
import { Link } from "expo-router";
import { fetchproductsapi } from "@/services/apicalling";

const category = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home",
  "Sports",
  "Toys",
  "Books",
  "food",
];

const Flat = () => {
  const [loading, setloading] = useState(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setsortOrder] = useState("");
  const [sortBy, setsortBy] = useState("");
  const [cat, setcat] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [value] = useDebounce(searchQuery, 1000);
  const [searchprdts, setsearchprdts] = useState<any[]>([]);
  const [totalpages, settotalpages] = useState(0);
  const [modal, setmodal] = useState({});
  const fetchProducts = async () => {
    setloading(true);
    try {
      const res = await fetchproductsapi({
        page,
        category: cat,
        sortOrder,
        sortBy,
        searchQuery,
      });
      const data = res.data;
      // console.log("data=", res);
      settotalpages(res?.pages);
      if (page === 1) {
        setAllProducts(data);
        setsearchprdts(data);
      } else {
        setAllProducts((prev) => [...prev, ...data]);
        setsearchprdts((prev) => [...prev, ...data]);
      }
    } catch (error: any) {
      console.log("Fetch error:", error.message);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [cat, sortOrder, page, sortBy, activeBtn, value]);

  const onRefresh = async () => {
    setRefreshing(true);
    setActiveBtn(0);
    setcat("");
    setsortBy("");
    setsortOrder("");
    setSearchQuery("");
    setmodal({});
    setPage(1);
    await fetchProducts();
    setRefreshing(false);
  };

  const handleSort = (key: string, order: string) => {
    setsortBy(key);
    setsortOrder(order);
    setPage(1);
    setAllProducts([]);
    setsearchprdts([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.sortOptions}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={category}
          renderItem={({ item, index }) => (
            <Button
              title={item}
              onPress={() => {
                setcat(item);
                setActiveBtn(index + 1);
                setPage(1);
                setAllProducts([]);
                setsearchprdts([]);
              }}
              style={[
                styles.button,
                activeBtn === index + 1 && { backgroundColor: "#03205e" },
                { marginHorizontal: 10 },
              ]}
            />
          )}
          ListFooterComponent={() => (
            <ScrollView style={{ flex: 1 }} horizontal>
              <Button
                title="Price ↑"
                onPress={() => {
                  handleSort("price", "asc");
                  setActiveBtn(10);
                }}
                style={[
                  styles.button,
                  activeBtn === 10 && { backgroundColor: "#03205e" },
                  { marginHorizontal: 10 },
                ]}
              />
              <Button
                title="Price ↓"
                onPress={() => {
                  handleSort("price", "desc");
                  setActiveBtn(11);
                }}
                style={[
                  styles.button,
                  activeBtn === 11 && { backgroundColor: "#03205e" },
                ]}
              />
            </ScrollView>
          )}
          style={{ gap: 5, marginHorizontal: 20 }}
        />
      </View>
      {JSON.stringify(modal) !== "{}" && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            height: 250,
            width: "80%",
            left: "10%",
            top: 200,
            zIndex: 11,
            backgroundColor: "#E8F1E5",
            borderRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <Image
            source={modal?.image}
            style={{
              height: 80,
              width: 80,
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#00000",
              marginBottom: 5,
            }}
          >
            {modal?.title}
          </Text>
          <Text style={{ fontSize: 16, color: "#00000", marginBottom: 10 }}>
            ${modal?.price}
          </Text>
          <Button
            title="❌"
            onPress={() => setmodal({})}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          />
        </View>
      )}
      {loading && page === 1 ? (
        <View style={styles.sortOptions}>
          <ActivityIndicator size={75} />
        </View>
      ) : searchprdts.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={JSON.stringify(modal) === "{}"}
          data={searchprdts}
          renderItem={({ item }) => <Item item={item} setmodal={setmodal} />}
          keyExtractor={(item) => item?.id?.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
            if (!loading && page <= totalpages) setPage((prev) => prev + 1);
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading && page > 1 ? <ActivityIndicator /> : null
          }
          style={[
            { position: "relative" },
            JSON.stringify(modal) !== "{}" ? { opacity: 0.3 } : {},
          ]}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={{ fontSize: 50, justifyContent: "center" }}>
            No Products Founded
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const Item = React.memo(({ item, setmodal }: any) => (
  <Link
    href={{
      pathname: "/productdetails/[id]",
      params: { id: `${item._id}` },
    }}
    style={{ marginVertical: 10 }}
  >
    <View key={item.id} style={styles.card}>
      <Image source={item.image} style={styles.image} contentFit="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Button
          title="View Modal"
          style={[
            styles.button,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={() => setmodal(item)}
        />
      </View>
    </View>
  </Link>
));

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  paginationButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#f8f9fa",
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingLeft: 10,
  },
  sortOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  button: {
    marginVertical: 5,
    backgroundColor: "#1b5eee",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 40,
    borderWidth: 1,
  },
  card: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  image: {
    width: 120,
    height: 140,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#6c757d",
    marginVertical: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: "#6c757d",
  },
});

export default Flat;
