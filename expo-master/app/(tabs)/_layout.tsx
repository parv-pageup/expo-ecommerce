import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      initialRouteName="flat"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 54,
          marginBottom: 10,
          marginLeft: 10,
          borderRadius: 40,
          width: "95%",
        },
        tabBarActiveTintColor: "#1b5eee",
      }}
    >
      <Tabs.Screen
        name="flat"
        options={{
          title: "Home",
          animation: "shift",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          animation: "shift",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cart-arrow-down" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          animation: "shift",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scroll"
        options={{
          title: "Scrolllist",
          animation: "shift",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-circle" color={color} />
          ),
          href: null,
        }}
      />

      <Tabs.Screen
        name="productdetails/[id]"
        options={{
          title: "detailed products",
          animation: "shift",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-circle" color={color} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
