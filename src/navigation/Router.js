import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screen
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfilScreen from '../screens/ProfilScreen';
import Detailproduk from '../screens/Detailproduk';
import TambahProdukScreen from '../screens/TambahProduk';
import EditProdukScreen from '../screens/EditProduk';
import EditProfil from '../screens/EditProfil';

// Ikon dari iconsax-react-native
import { Home2, ShoppingCart, ProfileCircle } from 'iconsax-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator
function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#FF7F50',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Home2 color={color} variant={focused ? 'Bold' : 'Linear'} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        initialParams={{ cartItems: [] }}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused, color }) => (
            <ShoppingCart color={color} variant={focused ? 'Bold' : 'Linear'} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ focused, color }) => (
            <ProfileCircle color={color} variant={focused ? 'Bold' : 'Linear'} size={28} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailProduk"
        component={Detailproduk}
        options={{
          headerShown: true,
          title: 'Detail Produk',
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="TambahProduk"
        component={TambahProdukScreen}
        options={{
          headerShown: true,
          title: 'Tambah Produk',
        }}
      />
      <Stack.Screen
        name="EditProduk"
        component={EditProdukScreen}
        options={{
          headerShown: true,
          title: 'Edit Produk',
        }}
      />
      <Stack.Screen
  name="EditProfil"
  component={EditProfil}
  options={{
    headerShown: true,
    title: 'Edit Profil',
  }}
/>

    </Stack.Navigator>
  );
};

export default Router;
