import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Button from "@/components/Button";
import CustomeInput from "@/components/CustomeInput";
import KeyboardAvoiding from "@/components/KeyboardAvoiding";
import { useState } from "react";
import { api } from "../_layout";
import * as SecureStore from "expo-secure-store";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  const handlesignin = async () => {
    try {
      console.log("email", email);
      const res = await api.post("/users/login", { email, password });
      if (!res) {
        console.log("error is coming in login and res is causing problem");
      } else {
        console.log("logginin user", res.data);
        await save("accessToken", res.data.accessToken);
        await save("refreshToken", res.data.refreshToken);

        router.replace("/(tabs)/home");
      }
    } catch (error: any) {
      console.log("error in login", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoiding>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.secondContainer}>
              <View style={{ width: "100%" }}>
                <Text style={styles.titleContainer}>SignIn</Text>
                <View style={styles.inputbox}>
                  <Text style={styles.text}>Email:</Text>

                  <CustomeInput
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                  />
                </View>
                <View style={styles.inputbox}>
                  <Text style={styles.text}>Password:</Text>

                  <CustomeInput
                    placeholder="Password"
                    keyboardType="visible-password"
                    onChangeText={setPassword}
                    value={password}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",

                  paddingBottom: 40,
                }}
              >
                <Button title="Sign-In" onPress={handlesignin} />

                <Text>
                  Don't Have an Account{" "}
                  <Link href={"/(auth)/signup"} style={{ color: "blue" }}>
                    SignUp
                  </Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoiding>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: 220,
    alignSelf: "center",
  },
  titleContainer: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginVertical: 2,
    marginBottom: 20,
  },
  secondContainer: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  text: {
    color: "black",
    marginBottom: 10,
    fontWeight: "bold",
  },

  inputbox: {
    width: "100%",
    alignItems: "center",
    borderColor: "black",
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 10,
    width: "35%",
    borderRadius: 5,
    marginTop: 20,
  },
});

export default SignIn;
