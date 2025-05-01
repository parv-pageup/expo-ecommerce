import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { api } from "../_layout";
import { useDebounce } from "use-debounce";

interface apiitems {
  title: string;
  description: string;
  image: string;
  price: number;
}
const Flat = () => {
  const [allProducts, setAllProducts] = useState<apiitems[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<apiitems[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [value] = useDebounce(searchQuery, 1000);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products/products`);
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
    await fetchProducts();
    setRefreshing(false);
  };

  const handleSort = (key: any, order: any) => {
    setFilteredProducts((prev) =>
      prev.sort((a, b) => (order === "asc" ? a[key] - b[key] : b[key] - a[key]))
    );
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
        <Button
          title="Price ↑"
          onPress={() => {
            handleSort("price", "asc");
            setActiveBtn(1);
          }}
          style={[styles.button, activeBtn === 1 && { backgroundColor: "red" }]}
        />
        <Button
          title="Price ↓"
          onPress={() => {
            handleSort("price", "desc");
            setActiveBtn(2);
          }}
          style={[styles.button, activeBtn === 2 && { backgroundColor: "red" }]}
        />
        <Button
          title="Rating ↑"
          onPress={() => {
            handleSort("rating", "asc");
            setActiveBtn(3);
          }}
          style={[styles.button, activeBtn === 3 && { backgroundColor: "red" }]}
        />
        <Button
          title="Rating ↓"
          onPress={() => {
            handleSort("rating", "desc");
            setActiveBtn(4);
          }}
          style={[styles.button, activeBtn === 4 && { backgroundColor: "red" }]}
        />
      </View>

      {/* Product List */}
      <FlatList
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
  <View key={item.id} style={styles.card}>
    <Image source={item.image} style={styles.image} contentFit="cover" />
    <View style={styles.cardContent}>
      <Text style={styles.itemName}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  </View>
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
    paddingHorizontal: 15,
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
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sortOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  button: {
    marginVertical: 5,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
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
