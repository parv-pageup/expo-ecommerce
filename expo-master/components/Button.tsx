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
  isActive?: boolean;
};

const Button = ({ isActive = false, title, ...props }: something) => {
  return (
    <TouchableOpacity style={[styles.button]} activeOpacity={0.8} {...props}>
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
    marginHorizontal: 10,
  },
  active: {
    backgroundColor: "green",
  },
});
export default Button;
