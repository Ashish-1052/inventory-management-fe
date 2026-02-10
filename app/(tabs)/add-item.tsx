import { Button, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { addItem } from '../src/api/items';
import { useRouter } from 'expo-router';

export default function AddItemScreen() {
  const colorScheme = useColorScheme();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minQuantity, setMinQuantity] = useState("");

  const router = useRouter();
  const handleAddItem = async () => {
    try {
      const data = await addItem({ name, sku, quantity: Number(quantity), minQuantity: Number(minQuantity) });
      console.log('~ data', data);
      router.replace("/(tabs)");
    } catch {
      alert("Invalid credentials");
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedText>Name</ThemedText>
      <TextInput
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, borderColor: "gray", borderRadius: 5, padding: 5, color: colorScheme === "dark" ? "white" : "black" }}
      />

      <ThemedText>SKU</ThemedText>
      <TextInput
        value={sku}
        onChangeText={setSku}
        style={{ borderWidth: 1, marginBottom: 20, borderColor: "gray", color: colorScheme === "dark" ? "white" : "black", borderRadius: 5, padding: 5, }}
      />

      <ThemedText>Quantity</ThemedText>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        style={{ borderWidth: 1, marginBottom: 20, borderColor: "gray", color: colorScheme === "dark" ? "white" : "black", borderRadius: 5, padding: 5, }}
      />

      <ThemedText>Min Quantity</ThemedText>
      <TextInput
        value={minQuantity}
        onChangeText={setMinQuantity}
        style={{ borderWidth: 1, marginBottom: 20, borderColor: "gray", color: colorScheme === "dark" ? "white" : "black", borderRadius: 5, padding: 5, }}
      />

      <Button title="Add Item" onPress={handleAddItem} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
