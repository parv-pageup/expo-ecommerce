import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TouchableOpacityProps,
} from "react-native";
import React from "react";

interface ButtonProps extends TouchableOpacityProps {
	title: string;
}
type something = TouchableOpacityProps & {
	title: string;
};

const Button = ({ title, ...props }: something) => {
	return (
		<TouchableOpacity
			style={styles.button}
			activeOpacity={0.8}
			{...props}
		>
			<Text style={{ color: "white" }}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: "blue",
		padding: 10,
		marginVertical: 10,
		width: "35%",
		borderRadius: 5,
	},
});
export default Button;
