import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React from "react";

const KeyboardAvoiding = ({ children, offset = 50 }) => {
	return (
		<KeyboardAvoidingView
			behavior={
				Platform.OS === "ios" ? "padding" : "height"
			}
			keyboardVerticalOffset={offset}
			style={{ flex: 1 }}
		>
			{children}
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoiding;
