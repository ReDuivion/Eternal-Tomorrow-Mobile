import * as React from "react";
import { Appbar } from "react-native-paper";
import App from "../App";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Link } from "expo-router";
function Header({ children }) {
  return (
    <>
      <View style={{ flexDirection: "row", gap: 6, marginRight: 10 }}>
        <Button title="Login" mode="contained" buttonColor="indigo">
          <Link href="login">Login</Link>
        </Button>
        <Button title="SignUp">
          <Link href="/signup">Register</Link>
        </Button>
      </View>
    </>
  );
}
export default Header;
