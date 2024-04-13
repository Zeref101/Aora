import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Link href={"/home"} style={{ fontFamily: "Poppins-Bold" }}>
        Go to Home
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
