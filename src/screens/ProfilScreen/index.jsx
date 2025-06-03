import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ProfilScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const product = {
    name: 'Gado Gado',
    subTitle: 'Bumbu Kacang',
    image: 'https://awsimages.detik.net.id/community/media/visual/2024/02/14/resep-gado-gado-siram.jpeg?w=1200',
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const db = getFirestore();
          const docRef = doc(db, 'users', 'user_01');
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );

  const handleDelivery = () => {
    console.log('Pengantaran');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfil');
  };

  if (loading || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: userData?.image }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Nama      : {userData?.name}</Text>
          <Text style={styles.userInfoText}>Telepon   : {userData?.phone}</Text>
          <Text style={styles.userInfoText}>Jenis     : {userData?.userType}</Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productSubTitle}>{product.subTitle}</Text>
        </View>
        <TouchableOpacity style={styles.deliveryButton} onPress={handleDelivery}>
          <Text style={styles.deliveryText}>Pengantaran</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userInfo: {
    alignSelf: 'flex-start',
  },
  userInfoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  editButton: {
    marginTop: 16,
    backgroundColor: '#FF7F50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productSubTitle: {
    fontSize: 14,
    color: '#888',
  },
  deliveryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FF7F50',
    borderRadius: 8,
  },
  deliveryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
