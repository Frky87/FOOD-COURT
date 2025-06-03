// src/components/FoodCard.jsx
import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

const FoodCard = ({ item, onPress }) => (
  <TouchableOpacity style={{ width: 140, marginRight: 16, backgroundColor: '#fff', borderRadius: 12, elevation: 3, padding: 8 }} onPress={() => onPress(item)}>
    <Image source={{ uri: item.image }} style={{ width: '100%', height: 90, borderRadius: 8, marginBottom: 8 }} />
    <Text style={{ fontSize: 14 }}>{item.name}</Text>
    <Text style={{ fontSize: 12, color: '#888' }}>{item.price}</Text>
  </TouchableOpacity>
);

export default FoodCard;
