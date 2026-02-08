import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useAuthStore } from './src/store/authStore';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const token = useAuthStore((s) => s.token);
  const segments = useSegments();
  const router = useRouter();
  const hydrate = useAuthStore((s) => s.hydrate);
  const rootNavigationState = useRootNavigationState();
  const hydrated = useAuthStore((s) => s.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    console.log('rootNavigationState', rootNavigationState);
    if (!hydrated || !rootNavigationState?.key) return;
    console.log('segments', segments);

    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      router.replace('/login');
    }

    if (token && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [hydrated, token, segments, rootNavigationState?.key]);
  console.log('~ autStore', useAuthStore.getState());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}