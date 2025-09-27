// File: app/_layout.jsx

import { Stack, useRouter } from 'expo-router';
import { WalletProvider, useWallet } from '../context/WalletContext';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isLoggedIn, isLoading } = useWallet();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
    
    if (isLoading || !fontsLoaded) return;

    if (isLoggedIn) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [isLoggedIn, isLoading, fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#0D1B2A' }, // Dark Blue Header
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontFamily: 'Poppins-Bold' }
    }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ title: "Dashboard", headerLeft: () => null }} />
        <Stack.Screen name="buy-gold" options={{ title: "Buy Gold" }} />
        <Stack.Screen name="transfer-gold" options={{ title: "Transfer Gold" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <WalletProvider>
      <InitialLayout />
    </WalletProvider>
  );
}