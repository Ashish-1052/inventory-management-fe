import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { login } from "../src/api/auth";
import { useAuthStore } from "../src/store/authStore";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setLogin = useAuthStore((s) => s.login);
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    try {
      const data = await login({email, password});
      console.log('~ data', data);
      setLogin(data.access_token, data.user);
      router.replace("/(tabs)");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <ThemedView>
      <View style={{ padding: 20 }}>
        <ThemedText>Email</ThemedText>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{ borderWidth: 1, marginBottom: 10, borderColor: "gray", borderRadius: 5, padding: 5, color: colorScheme === "dark" ? "white" : "black" }}
        />

        <ThemedText>Password</ThemedText>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, marginBottom: 20, borderColor: "gray", color: colorScheme === "dark" ? "white" : "black", borderRadius: 5, padding: 5, }}
        />

        <Button title="Login" onPress={handleLogin} />
        <ThemedText>Don&apos;t have an account?</ThemedText>
        <Button title="Register" onPress={() => router.push("/register")} />
      </View>
    </ThemedView>
  );
}
