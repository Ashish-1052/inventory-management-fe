import { Image } from 'expo-image';
import { StyleSheet, FlatList } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useItems } from '../src/hooks/useItems';
import { useAuthStore } from '../src/store/authStore';
import { Button } from '@react-navigation/elements';
import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableFooter,
  TableBody,
  TableHead,
  TableData,
  TableRow,
  TableCaption,
} from '../../components/ui/table';

export interface Item {
  name: string;
  id: string;
  quantity: number;
  minQuantity: number;
  sku: string;
};

export default function HomeScreen() {
  const token = useAuthStore((s) => s.token);
  console.log(token);
  const { data, isPending, error } = useItems();
  console.log('useitems', { data, isPending, error });
  const logout = useAuthStore((s) => s.logout);

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Inventory Management!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Button onPress={logout}>Logout</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Min Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableData>{item.name}</TableData>
              <TableData>{item.sku}</TableData>
              <TableData>{item.quantity}</TableData>
              <TableData>{item.minQuantity}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
