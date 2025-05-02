import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import Button from "@/components/Button";
import { api } from "@/services/reqResInterceptors";
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
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [value] = useDebounce(searchQuery, 1000);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  const fetchProducts = async () => {
    try {
      const res = await fetchproductsapi();
      const data = res.data;
      setAllProducts(data);
      setFilteredProducts(data);
      setPage(1);
    } catch (error: any) {
      console.log("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setActiveBtn(0);
    setFilteredProducts(allProducts);
    await fetchProducts();
    setRefreshing(false);
  };

  const handleSort = (key: string, order: string) => {
    let updatedProducts = [...allProducts];

    if (key === "category") {
      updatedProducts = updatedProducts.filter(
        (item) => item.category === order
      );
    } else {
      updatedProducts.sort((a, b) =>
        order === "asc" ? a[key] - b[key] : b[key] - a[key]
      );
    }

    setFilteredProducts(updatedProducts);
    setPage(1);
  };

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );
  //20 - 30
  useEffect(() => {
    if (value) {
      const filtered = allProducts.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setPage(1);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Sort Buttons */}
      <View style={styles.sortOptions}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={category}
          renderItem={({ item, index }) => (
            <Button
              title={item}
              onPress={() => {
                handleSort("category", item);
                setActiveBtn(index + 1);
              }}
              style={[
                styles.button,
                activeBtn === index + 1 && { backgroundColor: "red" },
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
                  activeBtn === 10 && {
                    backgroundColor: "red",
                  },
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
                  activeBtn === 11 && { backgroundColor: "red" },
                ]}
              />
            </ScrollView>
          )}
          style={{ gap: 5, marginHorizontal: 20 }}
        />
      </View>

      {/* Product List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={paginatedProducts}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item?.id?.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={() => (
          <View style={styles.paginationContainer}>
            <Button
              title="Previous"
              onPress={() => {
                if (page > 1) setPage(page - 1);
              }}
              disabled={page === 1}
              style={[
                styles.paginationButton,
                page === 1 && { backgroundColor: "#ccc" },
              ]}
            />
            <Text style={styles.pageNumber}>
              Page {page} of {totalPages}
            </Text>
            <Button
              title="Next"
              onPress={() => {
                if (page < totalPages) setPage(page + 1);
              }}
              disabled={page >= totalPages}
              style={[
                styles.paginationButton,
                page >= totalPages && { backgroundColor: "#ccc" },
              ]}
            />
          </View>
        )}
      />
    </View>
  );
};

const Item = React.memo(({ item }: any) => (
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
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 40,
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
    height: 120,
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
