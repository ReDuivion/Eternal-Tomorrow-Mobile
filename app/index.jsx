import { View, Text, Modal } from "react-native";
import { Link } from "expo-router";
import * as React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
export default function HomePage() {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontWeight: "400", fontSize: 24 }}>MyNimeList</Text>
        </View>
        <View>
          <Button
            title="Open Modal"
            mode="outlined"
            icon="folder"
            onPress={() => setModalVisible(true)}
          >
            Categories
          </Button>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Modal Content</Text>
                <Button
                  mode="outlined"
                  title="Close"
                  onPress={() => setModalVisible(false)}
                >
                  Close
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#eaeaea",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
