import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import demodata from "@/constants/demo.json";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

const Scroll = () => {
  const [activebtn, setactivebtn] = useState(0);
  const [number, setnumber] = useState(5);
  const [data, setdata] = useState(demodata.slice(0, number));
  // const [search, setsearch] = useState("");
  const search = useRef("");
  const [refreshing, setrefreshing] = useState(false);
  const searchdata = () => {
    const newdata = demodata.filter((item) =>
      item.name.toLowerCase().includes(search.current.toLowerCase())
    );
    setdata(newdata);
  };

  const selectedSort = (sort: string) => {
    setdata((prev) => {
      return prev.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price
      );
    });
  };

  const sortByRating = (order: string) => {
    setdata((prev) => {
      return prev.sort((a, b) =>
        order === "asc" ? a.rating - b.rating : b.rating - a.rating
      );
    });
  };

  const onRefresh = () => {
    setrefreshing(true);

    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    setdata(demodata.slice(0, number));
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          onChangeText={(text) => {
            search.current = text;
          }}
        />
        <Button
          title="Search"
          onPress={searchdata}
          style={styles.searchButton}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortOptions}
      >
        <Button
          title="Price Asc"
          onPress={() => {
            selectedSort("asc"), setactivebtn(1);
          }}
          style={[styles.button, activebtn === 1 && { backgroundColor: "red" }]}
        />
        <Button
          title="Price Desc"
          onPress={() => {
            selectedSort("desc"), setactivebtn(2);
          }}
          style={[styles.button, activebtn === 2 && { backgroundColor: "red" }]}
        />
        <Button
          title="Rating Asc"
          onPress={() => {
            sortByRating("asc"), setactivebtn(3);
          }}
          style={[styles.button, activebtn === 3 && { backgroundColor: "red" }]}
        />
        <Button
          title="Rating Desc"
          onPress={() => {
            sortByRating("desc"), setactivebtn(4);
          }}
          style={[styles.button, activebtn === 4 && { backgroundColor: "red" }]}
        />
      </ScrollView>
      <ScrollView
        style={styles.scrollArea}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                ${item.price} | Rating: {item.rating}
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
  actbutton: {
    backgroundColor: "red",
  },
});

export default Scroll;
