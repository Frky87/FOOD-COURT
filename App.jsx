import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
import { CartProvider } from './src/context/CartContext';
import { ProductProvider } from './src/context/ProductContext';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

async function registerAppWithFCM() {
  // Mendaftar perangkat untuk menerima remote notifications
  await messaging().registerDeviceForRemoteMessages();

  // Mendapatkan token perangkat yang diperlukan untuk pengiriman pesan
  const token = await messaging().getToken();
  console.log('FCM token:', token); // Log token untuk digunakan di server atau Firebase
}

// Meminta izin untuk menerima notifikasi
async function requestPermissions() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Notification permission granted');
    registerAppWithFCM(); // Daftarkan aplikasi setelah izin diberikan
  } else {
    console.log('Notification permission denied');
  }
}

export default function App() {
  useEffect(() => {
    requestPermissions(); // Meminta izin saat aplikasi dimulai
  }, []);

  return (
    <ProductProvider>
      <CartProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </CartProvider>
    </ProductProvider>
  );
}
