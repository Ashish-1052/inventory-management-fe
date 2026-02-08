import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { register } from "../src/api/auth";
import { useAuthStore } from "../src/store/authStore";
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setLogin = useAuthStore((s) => s.login);
  const colorScheme = useColorScheme();

  const handleRegister = async () => {
    try {
      const data = await register({name, email, password});
      setLogin(data.token, data.user);
      router.replace("/(tabs)");
    } catch {
      alert("Failed to register");
    }
  };

  return (
    <ThemedView>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, borderColor: "gray", borderRadius: 5, padding: 5, color: colorScheme === "dark" ? "white" : "black" }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, borderColor: "gray", borderRadius: 5, padding: 5, color: colorScheme === "dark" ? "white" : "black" }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, borderColor: "gray", borderRadius: 5, padding: 5, color: colorScheme === "dark" ? "white" : "black" }}
      />
      <Button title="Register" onPress={handleRegister} />
    </ThemedView>
  );
}