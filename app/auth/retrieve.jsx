import { supabase } from "../../libs/supabase";
import * as React from "react";
import { View, Text } from "react-native";
import { TextInput as Input, Button } from "react-native-paper";

export default function Retrieve() {
  const [userEmail, setUserEmail] = React.useState(null);
  const [newUserName, setNewUserName] = React.useState(null);
  const [existingUserName, setExistingUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState();
  const [verify, setVerify] = React.useState(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.error(error);
        } else {
          setUserEmail(user.email);

          const { data, error } = await supabase
            .from("user")
            .select("nama_user")
            .eq("email", user.email)
            .single();

          if (error) {
            console.error(error.message);
          } else {
            if (data) {
              setExistingUserName(data?.nama_user);
            }
          }
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleAddData = async () => {
    try {
      if (existingUserName) {
        console.log("Nama Sudah Ada", existingUserName);
        return;
      }

      const { data, error } = await supabase
        .from("user")
        .insert([{ email: userEmail, nama_user: newUserName, Verified: true }]);

      if (error) {
        console.error(error.message);
      } else {
        console.log("Data Added Succesfully", data);
        setNewUserName("");
        setVerify(true);
      }
    } catch (error) {
      console.error(error.message);
    }

    if (isLoading) {
      return null;
    }
  };

  if (!existingUserName) {
    return (
      <>
        <Input
          label="Nama User"
          value={newUserName}
          onChangeText={(text) => setNewUserName(text)}
        />
        <Button onPress={handleAddData}>Tambah Data</Button>
      </>
    );
  }
}
