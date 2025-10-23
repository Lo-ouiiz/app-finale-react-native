import * as Battery from "expo-battery";
import { useEffect, useState } from "react";

export default function useBattery() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const getBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync(); // retourne un float entre 0 et 1
      setBatteryLevel(level);
    };

    getBatteryLevel();

    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });

    return () => subscription.remove();
  }, []);

  return batteryLevel;
}
