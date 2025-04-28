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

const SignUp = () => {
	const router = useRouter();

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "white" }}
		>
			<>
				<KeyboardAvoiding offset={80}>
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
					>
						<ScrollView
							contentContainerStyle={{ flexGrow: 1 }}
						>
							<View style={styles.secondContainer}>
								<View style={{ width: "100%" }}>
									<Text style={styles.titleContainer}>
										SignUp
									</Text>
									<View style={styles.inputbox}>
										<Text style={styles.text}>
											Username:
										</Text>

										<CustomeInput
											placeholder="Username"
											keyboardType="default"
											autoComplete="username"
										/>
									</View>
									<View style={styles.inputbox}>
										<Text style={styles.text}>Email:</Text>

										<CustomeInput
											placeholder="Email"
											keyboardType="email-address"
											autoComplete="email"
										/>
									</View>
									<View style={styles.inputbox}>
										<Text style={styles.text}>
											Password:
										</Text>

										<CustomeInput
											placeholder="Password"
											keyboardType="default"
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
										title="Sign-Up"
										onPress={() =>
											router.navigate("/signup")
										}
									/>

									<Text>
										Already Have an Account{" "}
										<Link
											href={"/(auth)/signin"}
											style={{ color: "blue" }}
										>
											SignIn
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
