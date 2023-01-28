import "./src/lib/dayjs";

import { StatusBar, Button } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import * as Notifications from "expo-notifications";

async function scheduleNotification() {
  const trigger = new Date(Date.now());
  trigger.setMinutes(trigger.getMinutes() + 1);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Olá, Mateus! ❤",
      body: "Você praticou seus hábitos hoje?",
    },
    trigger,
  });
}

async function getScheduleNotifications() {
  const schedules = await Notifications.getAllScheduledNotificationsAsync();
  console.log(schedules);
}

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      {/* <Button title="Enviar" onPress={scheduleNotification} />
      <Button title="Agendadas" onPress={getScheduleNotifications} /> */}
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
