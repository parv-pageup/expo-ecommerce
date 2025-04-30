import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
const Home = () => {
  const [data, setdata] = useState([]);

  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log("🔐 Here's your value 🔐 \n" + result);
    } else {
      console.log("No values stored under that key.");
    }
  }

  const fetchallproducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const response = await res.json();
      const sliced = response.products.slice(1, 10);
      setdata(sliced);
      // console.log("Fetched products:", sliced);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getValueFor("accessToken");
    console.log("fetching products");
    fetchallproducts();
  }, []);

  const Item = ({ item }: any) => (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={item.images[0]}
          style={{ height: 150, width: 150 }}
          contentFit="contain"
        />
      </View>
      <View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>${item.price}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Ionicons
            name="star"
            size={25}
            color={item.rating > 1 ? "yellow" : "grey"}
          />
          <Ionicons
            name="star"
            size={25}
            color={item.rating > 2 ? "yellow" : "grey"}
          />
          <Ionicons
            name="star"
            size={25}
            color={item.rating > 3 ? "yellow" : "grey"}
          />
          <Ionicons
            name="star"
            size={25}
            color={item.rating > 4 ? "yellow" : "grey"}
          />
          <Ionicons
            name="star"
            size={25}
            color={item.rating > 5 ? "yellow" : "grey"}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item?.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Home;
