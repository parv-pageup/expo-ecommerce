import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "@/app/_layout";
import { Image } from "expo-image";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>({});

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      if (res) {
        setData(res.data);
        console.log("data=", res.data);
      }
    } catch (error: any) {
      console.log("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    if (id === undefined) {
      router.navigate("/(tabs)/home");
    }
    fetchProduct();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={data?.image} style={styles.image} contentFit="cover" />
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.category}>{data?.category}</Text>
      <Text style={styles.price}>${data?.price?.toFixed(2)}</Text>
      <Text style={styles.description}>{data?.description}</Text>

      {data?.tags?.length > 0 && (
        <View style={styles.tagContainer}>
          {data.tags.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 6,
  },
  category: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: "#008080",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
    gap: 8,
  },
  tag: {
    backgroundColor: "#eef6f6",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  tagText: {
    fontSize: 14,
    color: "#008080",
  },
});

export default ProductDetails;
