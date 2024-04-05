import { View, Text } from "react-native";
import React from "react";
import { StyleSheet, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../libs/supabase";
import { Avatar, Card, TextInput as Input } from "react-native-paper";
export default function Profile() {
  const [image, setImage] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.getUser();
        if (error) {
          console.error(error);
        } else {
          setUserEmail(user.email);

          const { data, error } = await supabase.from("user");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View>
          <Avatar.Image
            size={100}
            source={require("../../assets/violetP.jpg")}
          />
          <Text style={{ fontSize: 24, fontWeight: "400", marginLeft: 5 }}>
            Arienesu
          </Text>
        </View>
      </View>
      <View>
        <Card style={styles.card}>
          <Input
            label="Nama"
            right={<Input.Icon icon="pencil" />}
            left={<Input.Icon icon="account" />}
          />
          <Input
            label="Info"
            right={<Input.Icon icon="pencil" />}
            left={<Input.Icon icon="information" />}
          />
          <View>
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGap: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  profileContainer: {
    padding: 44,
    backgroundColor: "#fdf5fe",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  card: {
    borderRadius: 0,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 0,
    padding: 10,
    backgroundColor: "indigo",
  },
});
