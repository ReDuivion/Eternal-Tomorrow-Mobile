import { Stack } from "expo-router";
import { PaperProvider, Button } from "react-native-paper";
import { View, Text } from "react-native";
import Header from "../components/Header";
import Toast from 'react-native-toast-message';

const RootLayout = () => {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "HomePage",
            headerRight: () => <Header />,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerRight: () => <Header />,
            headerTitle: "Login",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerRight: () => <Header />,
            headerTitle: "Register",
          }}
        />
      </Stack>
      <Toast />
    </PaperProvider>
    
  );
};

export default RootLayout;
