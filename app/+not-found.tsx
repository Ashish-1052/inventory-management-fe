import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from "@/components/themed-text";

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.container}>
            <ThemedText>404 - Page Not Found</ThemedText>
            <Link style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} href="/">Go back to home</Link>
        </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});