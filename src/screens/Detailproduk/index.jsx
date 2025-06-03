import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Detailproduk = () => {
  const { product } = useRoute().params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === 'increase') setQuantity(quantity + 1);
    else if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const numericPrice = parseFloat(product.harga);
    const cartItem = {
      productName: product.title,
      quantity,
      price: numericPrice,
      productImage: product.image,
    };

    navigation.navigate('MainApp', {
      screen: 'Cart',
      params: { newlyAddedItem: cartItem },
    });
  };

  const handleEdit = () => {
    navigation.navigate('EditProduk', { id: product.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productRating}>⭐ 4.5 (70+ Ulasan)</Text>
        <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
        <Text style={styles.productDescription}>
          {product.deskripsi || 'Tidak ada deskripsi untuk produk ini.'}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange('decrease')} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange('increase')} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Button title="Tambah Ke Troli" onPress={handleAddToCart} color="#FF7F50" />

        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editText}>✏️ Edit / Hapus Produk</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detailproduk;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 30, paddingHorizontal: 16 },
  productImage: { width: '100%', height: 250, marginBottom: 16, borderRadius: 10 },
  productTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  productRating: { fontSize: 15, color: '#666', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: '#333' },
  productDescription: { fontSize: 16, color: '#444', lineHeight: 24, textAlign: 'justify', marginBottom: 20 },
  quantityContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 25
  },
  quantityButton: {
    backgroundColor: '#FFCDB2', width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, elevation: 2
  },
  quantityButtonText: { color: '#FF7F50', fontSize: 22, fontWeight: 'bold' },
  quantityValue: { fontSize: 20, fontWeight: 'bold', color: '#333', minWidth: 40, textAlign: 'center' },
  editButton: {
    marginTop: 20, backgroundColor: '#2196F3', padding: 12, borderRadius: 8
  },
  editText: {
    textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16
  }
});
