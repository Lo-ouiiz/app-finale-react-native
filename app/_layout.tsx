import useBattery from "@/hooks/useBattery";
import { StyleSheet, View } from "react-native";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const batteryLevel = useBattery();

  // Choix de la couleur
  const backgroundColor =
    batteryLevel !== null
      ? batteryLevel > 0.5
        ? "#ADD8E6" // bleu clair
        : "#FA8072" // saumon
      : "#FFFFFF"; // couleur par défaut pendant le chargement

  return (
    <View style={[styles.container, { backgroundColor }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
