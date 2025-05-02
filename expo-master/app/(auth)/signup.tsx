import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import CustomeInput from "@/components/CustomeInput";
import KeyboardAvoiding from "@/components/KeyboardAvoiding";
import { useState } from "react";
import { api } from "@/services/reqResInterceptors";
import { signupapi } from "@/services/apicalling";

const SignUp = () => {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesignup = async () => {
    try {
      console.log("in frontend sending request on backend");

      const res = await signupapi({
        username,
        email,
        password,
      });
      if (!res) {
        throw new Error("error is coming in signup and res is causing problem");
      } else {
        console.log("regestring user", res.data);
      }
    } catch (error) {
      console.log("error in signup", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <>
        <KeyboardAvoiding offset={80}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.secondContainer}>
                <View style={{ width: "100%" }}>
                  <Text style={styles.titleContainer}>SignUp</Text>
                  <View style={styles.inputbox}>
                    <Text style={styles.text}>Username:</Text>

                    <CustomeInput
                      placeholder="Username"
                      keyboardType="default"
                      autoComplete="username"
                      onChangeText={setusername}
                      value={username}
                    />
                  </View>
                  <View style={styles.inputbox}>
                    <Text style={styles.text}>Email:</Text>

                    <CustomeInput
                      placeholder="Email"
                      keyboardType="email-address"
                      autoComplete="email"
                      onChangeText={setemail}
                      value={email}
                    />
                  </View>
                  <View style={styles.inputbox}>
                    <Text style={styles.text}>Password:</Text>

                    <CustomeInput
                      placeholder="Password"
                      keyboardType="default"
                      onChangeText={setpassword}
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
                  <Button title="Sign-Up" onPress={handlesignup} />

                  <Text>
                    Already Have an Account{" "}
                    <Link href={"/(auth)/signin"} style={{ color: "blue" }}>
                      <Text> SignIn</Text>
                    </Link>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoiding>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginVertical: 8,
  },
  secondContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    color: "black",
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
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
  },
});

export default SignUp;
