import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 54,
        },
      }}
    >
      <Tabs.Screen
        name="home"
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
          title: "ScrollList",
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="Flat"
        options={{
          title: "FlatList",
          animation: "shift",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
