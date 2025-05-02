import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { api } from "@/services/reqResInterceptors";
import Button from "@/components/Button";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const [user, setuser] = useState({});
  useEffect(() => {
    fetchuserdetails();
  }, []);

  const fetchuserdetails = async () => {
    try {
      const res = await api.get("/users/user");
      if (!res) {
        throw new Error(
          "error is coming in getting user details and res is causing problem"
        );
      } else {
        console.log("getting user details", res.data);
        setuser(res.data);
      }
    } catch (error) {
      console.log("error in logout", error);
    }
  };

  const handlelogout = async () => {
    try {
      const res = await api.post("/users/logout");
      if (!res) {
        throw new Error("error is coming in logout and res is causing problem");
      } else {
        console.log("logouting user", res.data);
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");

        router.replace("/(auth)/signin");
      }
    } catch (error) {
      console.log("error in logout", error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 50,
      }}
    >
      <View>
        <Text style={{ fontSize: 65, fontWeight: 500 }}>Profile</Text>
        <Text style={{ fontSize: 35, fontWeight: 300 }}>{user?.email}</Text>
        <Text style={{ fontSize: 35, fontWeight: 300 }}>{user?.username}</Text>
      </View>
      <Button title="Logout" onPress={handlelogout} />
    </SafeAreaView>
  );
};

export default Profile;
