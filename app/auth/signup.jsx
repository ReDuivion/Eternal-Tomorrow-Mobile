import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { Card, Button, TextInput as Input, Divider } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../libs/supabase";
import Toast from "react-native-toast-message";
export default function signup() {
  const [object, setObject] = React.useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (name, value) => {
    setObject({ ...object, [name]: value });
  };

  const handleSignUp = async () => {
    if (object.password !== object.password_confirmation) {
      Toast.show({
        type: "error",
        text1: "Password Confirmation Atau Salah Satunya Berbeda",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: object.email,
        password: object.password,
      });
      if (error) throw error;
      console.log("User", data);
      Toast.show({
        type: "success",
        text1: "Registrasi Berhasil",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ada yang salah dengan Server" + error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          Register Page
        </Text>
        <Divider style={{ marginBottom: 15 }} />
        <Input
          style={styles.inputGap}
          label="Email"
          value={object.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <Input
          value={object.password}
          onChangeText={(text) => handleChange("password", text)}
          style={styles.inputGap}
          label="Password"
          secureTextEntry
          right={<Input.Icon icon="eye" />}
        />
        <Input
          value={object.password_confirmation}
          onChangeText={(text) => handleChange("password_confirmation", text)}
          style={styles.inputGap}
          label="Confirm Password"
          secureTextEntry
          right={<Input.Icon icon="eye" />}
        />
        <View style={{ marginBottom: 20 }}>
          <Divider />
        </View>
        <Button mode="contained" onPress={handleSignUp}>
          Create Account
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
          <Link href="/login">Already have an account? </Link>
        </Text>
      </Card>
    </View>
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
