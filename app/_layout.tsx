import useBattery from "@/hooks/useBattery";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const batteryLevel = useBattery();
  const [menuSelection, setMenuSelection] = useState<string | null>(null);
  const [dogImageUrl, setDogImageUrl] = useState<string | null>(null);

  const backgroundColor =
    batteryLevel !== null
      ? batteryLevel > 0.5
        ? "#ADD8E6" // bleu clair
        : "#FA8072" // saumon
      : "#FFFFFF";

  const handleMenu = async (option: string) => {
    setMenuSelection(option);

    if (option === "Quit") {
      if (Platform.OS === "android") {
        BackHandler.exitApp(); // Quitte l'app sur Android
      } else {
        Alert.alert("Quit", "Impossible de quitter l'application sur iOS");
      }
    }

    if (option === "Dog") {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setDogImageUrl(data.message);
      } catch (e) {
        console.error("Erreur fetch dog", e);
      }
    }

    if (option === "Chat") {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sounds/meow.mp3")
        );
        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
          if ("isLoaded" in status && status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.error("Erreur lecture son chat", e);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {children}

      <View style={styles.content}>
        {menuSelection === "Chat" && (
          <MaterialCommunityIcons name="cat" size={100} color="#000" />
        )}
        {menuSelection === "Dog" && dogImageUrl && (
          <Image source={{ uri: dogImageUrl }} style={styles.dogImage} />
        )}
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenu("Chat")}
        >
          <MaterialCommunityIcons name="cat" size={30} color="#fff" />
          <Text style={styles.menuText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenu("Dog")}
        >
          <MaterialCommunityIcons name="dog" size={30} color="#fff" />
          <Text style={styles.menuText}>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenu("Quit")}
        >
          <MaterialCommunityIcons name="exit-to-app" size={30} color="#fff" />
          <Text style={styles.menuText}>Quit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  dogImage: { width: 300, height: 300, borderRadius: 10 },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
