import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { addMenu } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import notifee, { AndroidImportance } from '@notifee/react-native'; // Import notifee

const TambahProdukScreen = () => {
  const [form, setForm] = useState({ title: '', image: '', deskripsi: '', harga: '', category: { id: 1, name: '' } });
  const navigation = useNavigation();

  const handleChange = (key, value) => {
    if (key === 'category') setForm({ ...form, category: { id: 1, name: value } });
    else setForm({ ...form, [key]: value });
  };

  // Fungsi untuk menangani penundaan upload produk
  const handleDelayedPost = async (delay) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'post',
      name: 'Produk Baru',
      importance: AndroidImportance.HIGH,
    });

    // Notifikasi untuk memberi tahu pengguna bahwa produk akan di-upload setelah delay
    await notifee.displayNotification({
      title: 'Produk Baru',
      body: `Produk akan dirilis dalam ${delay} detik.`,
      android: {
        channelId: channelId,
        asForegroundService: true, // Menjalankan sebagai foreground service
      },
    });

    // Delay sesuai dengan parameter yang diterima
    setTimeout(() => {
      addMenu({ ...form, harga: parseFloat(form.harga) })
        .then(() => {
          Alert.alert('Sukses', 'Produk berhasil ditambahkan');
          navigation.goBack();
        })
        .catch((e) => Alert.alert('Gagal', e.message));
    }, delay * 1000); // Delay dalam detik
  };

  const handleSubmit = async () => {
    try {
      await handleDelayedPost(10); // Menunggu 10 detik sebelum upload
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  };

  return (
    <View style={styles.container}>
      {['title', 'image', 'deskripsi', 'harga'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={`Masukkan ${field}`}
          keyboardType={field === 'harga' ? 'numeric' : 'default'}
          value={form[field]}
          onChangeText={(t) => handleChange(field, t)}
        />
      ))}
      <TextInput
        placeholder="Kategori"
        style={styles.input}
        value={form.category.name}
        onChangeText={(t) => handleChange('category', t)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahProdukScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderRadius: 6, marginBottom: 12, padding: 10 },
  button: { backgroundColor: '#FF6F00', padding: 12, borderRadius: 6 },
  buttonText: { color: 'white', textAlign: 'center' },
});
