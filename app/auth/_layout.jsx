import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "Login" }}
        />
        <Stack.Screen
          name="signup"
          options={{ headerShown: false, title: "SignUp" }}
        />
        <Stack.Screen
          name="retrieve"
          options={{ headerShown: false, title: "Auth" }}
        />
      </Stack>
    </>
  );
}
