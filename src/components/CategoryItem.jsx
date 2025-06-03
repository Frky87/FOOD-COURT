// src/components/CategoryItem.jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Category } from 'iconsax-react-native';

const CategoryItem = ({ name, onPress }) => (
  <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
    <Category size={24} color="#FF5A5F" variant="Bold" />
    <Text style={{ marginTop: 4, fontSize: 12 }}>{name}</Text>
  </TouchableOpacity>
);

export default CategoryItem;
