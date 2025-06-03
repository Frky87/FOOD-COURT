import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc } from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const EditProfil = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ name: '', phone: '', userType: '', image: '' });
  const [loading, setLoading] = useState(true);
  const userId = 'user_01';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', userId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setUserData(snapshot.data());
        } else {
          Alert.alert('Data tidak ditemukan', 'Dokumen user_01 belum tersedia di Firestore.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Gagal mengambil data profil');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, userData);
      Alert.alert('Sukses', 'Data profil berhasil diperbarui');
      navigation.goBack();
    } catch (error) {
      console.error('Gagal update:', error);
      Alert.alert('Error', 'Gagal memperbarui data');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
      />

      <Text style={styles.label}>Nomor Telepon</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={userData.phone}
        onChangeText={(text) => setUserData({ ...userData, phone: text })}
      />

      <Text style={styles.label}>Jenis Pengguna</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={userData.userType}
          onValueChange={(itemValue) =>
            setUserData({ ...userData, userType: itemValue })
          }
          style={styles.picker}
        >
          <Picker.Item label="Pilih jenis pengguna..." value="" />
          <Picker.Item label="Customer" value="Customer" />
          <Picker.Item label="Seller" value="Seller" />
          <Picker.Item label="Admin" value="Admin" />
        </Picker>
      </View>

      <Text style={styles.label}>URL Foto Profil</Text>
      <TextInput
        style={styles.input}
        value={userData.image}
        onChangeText={(text) => setUserData({ ...userData, image: text })}
        placeholder="https://example.com/photo.jpg"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfil;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    ...Platform.select({
      android: {
        paddingHorizontal: 6,
      },
    }),
  },
  picker: {
    color: '#000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF7F50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
