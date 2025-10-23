import useBattery from "@/hooks/useBattery";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Linking,
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

  const [chatCount, setChatCount] = useState(0);
  const [dogCount, setDogCount] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      const savedChat = await AsyncStorage.getItem("chatCount");
      const savedDog = await AsyncStorage.getItem("dogCount");
      if (savedChat !== null) setChatCount(parseInt(savedChat));
      if (savedDog !== null) setDogCount(parseInt(savedDog));
    };
    loadCounts();
  }, []);

  const saveCount = async (key: string, value: number) => {
    await AsyncStorage.setItem(key, value.toString());
  };

  const backgroundColor =
    batteryLevel !== null
      ? batteryLevel > 0.5
        ? "#ADD8E6"
        : "#FA8072"
      : "#FFFFFF";

  const handleMenu = async (option: string) => {
    setMenuSelection(option);

    if (option === "Quit") {
      if (Platform.OS === "android") {
        BackHandler.exitApp();
      } else {
        Alert.alert("Quit", "Impossible de quitter l'application sur iOS");
      }
    }

    if (option === "Dog") {
      const newCount = dogCount + 1;
      setDogCount(newCount);
      saveCount("dogCount", newCount);

      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setDogImageUrl(data.message);
      } catch (e) {
        console.error("Erreur fetch dog", e);
      }
    }

    if (option === "Chat") {
      const newCount = chatCount + 1;
      setChatCount(newCount);
      saveCount("chatCount", newCount);

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

  const sendSms = () => {
    const phoneNumber = "0606060606";
    const message = "Je n'aime pas les chats";

    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Erreur", "Impossible d'ouvrir l'application SMS");
        }
      })
      .catch((err) => console.error("Erreur SMS", err));
  };

  const resetCounts = async () => {
    setChatCount(0);
    setDogCount(0);
    await saveCount("chatCount", 0);
    await saveCount("dogCount", 0);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {children}

      <View style={styles.content}>
        {menuSelection === "Chat" && (
          <MaterialCommunityIcons name="cat" size={100} color="#000" />
        )}

        {menuSelection === "Dog" && dogImageUrl && (
          <TouchableOpacity onPress={sendSms}>
            <Image source={{ uri: dogImageUrl }} style={styles.dogImage} />
          </TouchableOpacity>
        )}

        {menuSelection === "Clicker" && (
          <View style={styles.clickerContainer}>
            <Text style={styles.clickerTitle}>Statistiques de clics</Text>
            <Text style={styles.clickerText}>Chats cliqués : {chatCount}</Text>
            <Text style={styles.clickerText}>Chiens cliqués : {dogCount}</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetCounts}>
              <Text style={styles.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
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
          onPress={() => handleMenu("Clicker")}
        >
          <MaterialCommunityIcons name="counter" size={30} color="#fff" />
          <Text style={styles.menuText}>Clicker</Text>
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
  clickerContainer: {
    alignItems: "center",
    padding: 20,
  },
  clickerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  clickerText: {
    fontSize: 18,
    marginVertical: 5,
  },
  resetButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
