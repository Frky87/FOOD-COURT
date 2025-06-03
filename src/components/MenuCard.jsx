import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailProduk', { product: item })} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Rp {item.harga}</Text>
    </TouchableOpacity>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  card: { width: 160, marginRight: 12 },
  image: { width: '100%', height: 100, borderRadius: 8 },
  title: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  price: { fontSize: 13, color: '#555' },
});
