import { Stack } from "expo-router";
import { PaperProvider, Button } from "react-native-paper";
import { View, Text } from "react-native";
import Header from "../components/Header";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerRight: () => <Header /> }}
        />
      </Stack>

      <Toast />
    </PaperProvider>
  );
};

export default RootLayout;
