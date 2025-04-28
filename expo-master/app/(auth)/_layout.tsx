import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
	return (
		<>
			<Stack>
				<Stack.Screen
					name="signin"
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="signup"
					options={{ headerShown: true }}
				/>
			</Stack>
			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
}
