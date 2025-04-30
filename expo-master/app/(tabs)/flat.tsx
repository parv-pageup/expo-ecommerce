import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import demodata from "@/constants/demo.json";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRef } from "react";

const Flat = () => {
  const [loadmore, setloadmore] = useState(false);
  const [activebtn, setactivebtn] = useState(0);
  const [number, setnumber] = useState(5);
  const [data, setdata] = useState(demodata.slice(0, number));
  // const [search, setsearch] = useState("");
  const [refreshing, setrefreshing] = useState(false);

  const searchRef = useRef("");

  const searchdata = () => {
    const newdata = demodata.filter((item) =>
      item.name.toLowerCase().includes(searchRef.current.toLowerCase())
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
    if (!loadmore) {
      setrefreshing(true);
      setnumber(5);
      setdata(demodata.slice(0, number));
      setTimeout(() => {
        setrefreshing(false);
        setactivebtn(0);
      }, 2000);
    }
  };
  useEffect(() => {
    setnumber(5);
    setdata(demodata.slice(0, number));
  }, [refreshing]);

  const handleloadmore = () => {
    setloadmore(true);
    setTimeout(() => {
      if (number < 15 && searchRef.current !== " ") {
        const somedata = demodata.slice(number, number + 1);
        setdata((prev) => [...prev, ...somedata]);
      }
      setnumber((prev) => prev + 1);
    }, 3000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          onChangeText={(text) => {
            searchRef.current = text;
          }}
          // value={searchRef.currenppt}
        />
        <Button
          title="Search"
          onPress={searchdata}
          style={styles.searchButton}
        />
      </View>
      <FlatList
        data={[null]}
        style={styles.sortOptions}
        horizontal
        renderItem={() => (
          <>
            <Button
              title="Price Asc"
              onPress={() => {
                selectedSort("asc"), setactivebtn(1);
              }}
              style={[
                styles.button,
                activebtn === 1 && { backgroundColor: "red" },
              ]}
            />
            <Button
              title="Price Desc"
              onPress={() => {
                selectedSort("desc"), setactivebtn(2);
              }}
              style={[
                styles.button,
                activebtn === 2 && { backgroundColor: "red" },
              ]}
            />
            <Button
              title="Rating Asc"
              onPress={() => {
                sortByRating("rasc"), setactivebtn(3);
              }}
              style={[
                styles.button,
                activebtn === 3 && { backgroundColor: "red" },
              ]}
            />
            <Button
              title="Rating Desc"
              onPress={() => {
                sortByRating("rdesc"), setactivebtn(4);
              }}
              style={[
                styles.button,
                activebtn === 4 && { backgroundColor: "red" },
              ]}
            />
          </>
        )}
      />
      {/* <ScrollView horizontal style={styles.sortOptions}>
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
      </ScrollView> */}
      <FlatList
        data={data}
        renderItem={({ item }: any) => <Item item={item} />}
        keyExtractor={(item) => JSON.stringify(Math.random())}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleloadmore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {number < 15 && (
              <Text style={{ fontWeight: 500, fontSize: 25 }}>
                <ActivityIndicator
                  size={75}
                  style={{ height: 75, width: 75 }}
                />
                <IconSymbol
                  name="play.circle"
                  color={"black"}
                  size={4}
                  style={{ height: 20, width: 20 }}
                />{" "}
              </Text>
            )}
          </View>
        )}
      />
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

export default Flat;

const Item = React.memo(({ item }: any) => (
  <View key={item.id} style={styles.card}>
    <Image source={item.image} style={styles.image} contentFit="cover" />
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
));
