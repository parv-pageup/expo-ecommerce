import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import * as SecureStore from "expo-secure-store";
import { getValueFor } from "@/utils/securestore";
const Index = () => {
  const router = useRouter();

  // async function getValueFor(key: string) {
  //   let result = await SecureStore.getItemAsync(key);
  //   if (result) {
  //     console.log("🔐 Here's your value 🔐 \n" + result);
  //     router.replace("/(tabs)/home");
  //   } else {
  //     console.log("No values stored under that key.");
  //   }
  // }

  useEffect(() => {
    if (getValueFor("accessToken") !== undefined) {
      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 100);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?t=st=1745491296~exp=1745494896~hmac=9479ddb28bddf4d6dea64e164c9deb73683ca1477a3bfe3945ed4b46534320e8&w=1380"
          style={styles.image}
          contentFit="contain"
        />
        <Text style={styles.title}>Welcome to E-Commerce App</Text>
        <Text style={styles.subtitle}>
          Your one-stop shop for everything you need.
        </Text>

        <Button onPress={() => router.navigate("/signin")} title="Sign-In" />
        <Button onPress={() => router.navigate("/signup")} title="Sign-Up" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 10,
    width: "35%",
    borderRadius: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default Index;
