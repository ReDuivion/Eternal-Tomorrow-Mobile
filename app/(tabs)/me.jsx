import * as React from "react";
import {
  Card,
  Button,
  Text,
  Divider,
  TextInput as Input,
} from "react-native-paper";
import { supabase } from "../../libs/supabase";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
export default function Me() {
  const [title, setTitle] = React.useState("");
  const [userData, setUserData] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState("");
  const [existingUserName, setExistingUserName] = React.useState("");

  const handleLinkRouter = () => {
    router.replace(`https://l4tomo.vercel.app/message/${existingUserName}`);
  };

  const handleWhatsAppRouter = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `https://l4tomo.vercel.app/message/${existingUserName}`
    )}`;
    router.replace(url)
  }
  React.useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        setUserEmail(user.email);
        const { data, error: userError } = await supabase
          .from("user")
          .select("*")
          .eq("email", user.email)
          .single();
        if (userError) {
          throw userError;
        }
        setUserData(data);
        setExistingUserName(data.nama_user);
        console.log(data);
      } catch (error) {
        console.error("Error Fetching User", error);
      }
    }
    fetchUser();
  }, []);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleAddData = async () => {
    try {
      if (!title) {
        console.error("Title is Empty");
        return;
      }

      if (!userEmail) {
        console.error("User Email is Empty");
        return;
      }

      const { error: updateError } = await supabase
        .from("user")
        .update({ title: title })
        .eq("email", userEmail);

      if (updateError) {
        throw updateError;
      }

      console.log("Title is Updated Succesfully");

      const { data, error: fetchError } = await supabase
        .from("user")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (fetchError) {
        throw fetchError;
      }
      setUserData(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Card
          style={{
            backgroundColor: "#eaeaea",
            elevation: 2,
            maxWidth: "100%",
            height: 500,
          }}
        >
          <View>
            <Card.Cover
              style={{ height: 300, width: "100%" }}
              source={require("../../assets/PFP.jpg")}
              resizeMode="cover"
            />
            <View style={{ alignItems: "center", margin: 20 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 25,
                  color: "indigo",
                  marginBottom: 20,
                }}
              >
                {userData ? userData.title : ""}
              </Text>
              <Input
                placeholder="Create A New Title"
                mode="outlined"
                onChangeText={handleTitleChange}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderColor: "violet",
                }}
              />
              <Button
                onPress={handleAddData}
                mode="contained"
                style={{ color: "indigo", width: "100%", marginTop: 15 }}
              >
                Add New Title
              </Button>
            </View>
          </View>
        </Card>

        <View style={{ marginTop: 50 }} />
        <Card
          style={{
            backgroundColor: "#eaeaea",
            elevation: 2,
            maxWidth: "100%",
            height: 170,
          }}
        >
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: "500" }}>
              Step 1: Copy Your Link
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: "100",
                color: "",
              }}
            >
              https://l4tomo.vercel.app
            </Text>
            <View style={{}}>
              <Text
                style={{
                  backgroundColor: "#fff1fe",
                  elevation: 2,
                  padding: 5,
                  fontWeight: 500,
                  fontSize: 20,
                  marginTop: 20,
                  borderRadius: 10,
                  marginBottom: 5,
                  color: "indigo",
                }}
              >
                <Button mode="text" onPress={handleLinkRouter}>
                  {`https://l4tomo.vercel.app/message/${existingUserName}`}
                </Button>
              </Text>
            </View>
          </View>
        </Card>
        <View style={{ marginTop: 50 }} />

        <Card
          style={{
            backgroundColor: "#eaeaea",
            elevation: 2,
            height: 170,
            maxWidth: "100%",
          }}
        >
          <ScrollView style={{}}>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                Step 2: Share Link On Your Story
              </Text>
              <Button
              onPress={handleWhatsAppRouter}
                mode="contained"
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  fontWeight: "100",
                  color: "",
                }}
              >
                Share On WhatsApp
              </Button>
            </View>
          </ScrollView>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
});
