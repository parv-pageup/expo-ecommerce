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
const SignIn = () => {
	const router = useRouter();

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "white" }}
		>
			<KeyboardAvoiding>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
				>
					<ScrollView
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<View style={styles.secondContainer}>
							<View style={{ width: "100%" }}>
								<Text style={styles.titleContainer}>
									SignIn
								</Text>
								<View style={styles.inputbox}>
									<Text style={styles.text}>Email:</Text>

									<CustomeInput
										placeholder="Email"
										keyboardType="email-address"
									/>
								</View>
								<View style={styles.inputbox}>
									<Text style={styles.text}>Password:</Text>

									<CustomeInput
										placeholder="Password"
										keyboardType="visible-password"
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
								<Button
									title="Sign-In"
									onPress={() =>
										router.navigate("/(tabs)/home")
									}
								/>

								<Text>
									Don't Have an Account{" "}
									<Link
										href={"/(auth)/signup"}
										style={{ color: "blue" }}
									>
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
