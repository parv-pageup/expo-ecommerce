import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import demodata from "@/constants/demo.json";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

const Scroll = () => {
  const [data, setdata] = useState(demodata);
  const [search, setsearch] = useState("");

  const searchdata = () => {
    const newdata = demodata.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setdata(newdata);
  };

  const selectedSort = (sort: string) => {
    const newdata = [...data].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
    setdata(newdata);
  };

  const sortByRating = (order: string) => {
    const newdata = [...data].sort((a, b) =>
      order === "asc" ? a.rating - b.rating : b.rating - a.rating
    );
    setdata(newdata);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          onChangeText={setsearch}
          value={search}
        />
        <Button
          title="Search"
          onPress={searchdata}
          style={styles.searchButton}
        />
      </View>
      <ScrollView horizontal style={styles.sortOptions}>
        <Button
          title="Price Asc"
          onPress={() => selectedSort("asc")}
          style={styles.button}
        />
        <Button
          title="Price Desc"
          onPress={() => selectedSort("desc")}
          style={styles.button}
        />
        <Button
          title="Rating Asc"
          onPress={() => sortByRating("asc")}
          style={styles.button}
        />
        <Button
          title="Rating Desc"
          onPress={() => sortByRating("desc")}
          style={styles.button}
        />
      </ScrollView>
      <ScrollView style={styles.scrollArea}>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image
              source={item.image}
              style={styles.image}
              contentFit="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                ${item.price} | Rating: {item.rating}{" "}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="star"
                    size={15}
                    color={item.rating > 1 ? "#FFD700" : "grey"}
                  />
                  <Ionicons
                    name="star"
                    size={15}
                    color={item.rating > 2 ? "#FFD700" : "grey"}
                  />
                  <Ionicons
                    name="star"
                    size={15}
                    color={item.rating > 3 ? "#FFD700" : "grey"}
                  />
                  <Ionicons
                    name="star"
                    size={15}
                    color={item.rating > 4 ? "#FFD700" : "grey"}
                  />
                  <Ionicons
                    name="star"
                    size={15}
                    color={item.rating > 5 ? "#FFD700" : "grey"}
                  />
                </View>
              </Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sortOptions: {
    flexWrap: "wrap",
    flexGrow: 0,
    flexDirection: "row",
    marginBottom: 20,
    height: "10%",
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  scrollArea: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#6c757d",
  },
  itemDescription: {
    fontSize: 12,
    color: "#6c757d",
  },
});

export default Scroll;
