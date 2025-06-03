import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getMenuById, updateMenu, deleteMenu } from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditProdukScreen = () => {
  const { id } = useRoute().params;
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getMenuById(id).then((res) => setData(res.data));
  }, [id]);

  const handleChange = (key, value) => {
    if (key === 'category') {
      setData({ ...data, category: { id: 1, name: value } });
    } else {
      setData({ ...data, [key]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      await updateMenu(id, { ...data, harga: parseFloat(data.harga) });
      Alert.alert('Berhasil', 'Data berhasil diperbarui');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMenu(id);
      Alert.alert('Berhasil', 'Data berhasil dihapus');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (!data) return null;

  return (
    <View style={styles.container}>
      <TextInput value={data.title} onChangeText={(t) => handleChange('title', t)} style={styles.input} />
      <TextInput value={data.image} onChangeText={(t) => handleChange('image', t)} style={styles.input} />
      <TextInput value={data.category.name} onChangeText={(t) => handleChange('category', t)} style={styles.input} />
      <TextInput value={data.deskripsi} onChangeText={(t) => handleChange('deskripsi', t)} style={styles.input} />
      <TextInput value={String(data.harga)} onChangeText={(t) => handleChange('harga', t)} keyboardType="numeric" style={styles.input} />
      
      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.text}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={[styles.button, { backgroundColor: 'red' }]}>
        <Text style={styles.text}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProdukScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  button: { padding: 12, borderRadius: 6, backgroundColor: '#2196F3', marginTop: 10 },
  text: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
