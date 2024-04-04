import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput as Input, Button, Card, Divider } from "react-native-paper";
import { supabase } from "../libs/supabase";
import { router, Link } from "expo-router";
import Toast from "react-native-toast-message";

export default function Login() {
  const [userData, setUserData] = React.useState(null);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    password2: "",
  });

  const [isSubmit, setIsSubmit] = React.useState(false);

  async function handleSubmit(e) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        console.error(error.message);
        Toast.show({
          type: "error",
          text1: error.message,
        });
      } else {
        console.log(data);
        Toast.show({
          type: "success",
          text1: "Login Success",
          text2: data.user,
        });
        router.replace("/")
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmit(false);
    }
  }
  return (
    <>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "500",
              color: "indigo",
              marginBottom: 20,
            }}
          >
            Login Page
          </Text>
          <Divider style={{ marginBottom: 15 }} />
          <Input
            style={styles.inputGap}
            label="Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <Input
            style={styles.inputGap}
            label="Password"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry
            right={<Input.Icon icon="eye" />}
          />
          <View style={{ marginBottom: 20 }}>
            <Divider />
          </View>
          <Button mode="contained" onPress={handleSubmit}>
            Sign In
          </Button>

          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontWeight: "400",
              fontSize: 20,
              color: "indigo",
            }}
          >
            <Link href="/signup">Doesn't have an account? </Link>
          </Text>
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  card: {
    width: "80%",
    padding: 20,
    justifyContent: "center", // Center content vertically within card
  },
  inputContainer: {},
  input: {
    flex: 1,
    marginRight: 10,
    flexShrink: 0,
  },

  inputGap: {
    marginTop: 20,
  },
});
