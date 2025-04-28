import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TextInputProps,
} from "react-native";
import React from "react";

const CustomeInput = ({
	placeholder,

	...props
}: TextInputProps) => {
	return (
		<View style={styles.inputbox}>
			<TextInput
				placeholder={placeholder}
				style={styles.input}
				{...props}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	input: {
		backgroundColor: "white",
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginBottom: 30,
		borderColor: "black",
		borderWidth: 1,
	},
	inputbox: {
		width: "100%",
		alignItems: "center",
	},
});
export default CustomeInput;
