import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getMenus } from '../../services/api';
import MenuCard from '../../components/MenuCard';
import { Add } from 'iconsax-react-native';

const Home = () => {
  
  const [menuList, setMenuList] = useState([]);
  const navigation = useNavigation();

  const fetchMenus = async () => {
    const res = await getMenus();
    setMenuList(res.data);
  };

  useFocusEffect(React.useCallback(() => {
    fetchMenus();
  }, []));

  const grouped = menuList.reduce((acc, item) => {
    const key = item.category?.name || 'Lainnya';
    acc[key] = [...(acc[key] || []), item];
    return acc;
  }, {});

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.title}>Food Court</Text>
        {Object.keys(grouped).map((cat) => (
          <View key={cat} style={styles.section}>
            <Text style={styles.sectionTitle}>{cat} Populer</Text>
            <ScrollView horizontal style={styles.cardRow}>
              {grouped[cat].map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('TambahProduk')}>
        <Add color="#fff" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', margin: 16 ,paddingTop: 30},
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, },
  cardRow: { paddingHorizontal: 16 , paddingTop: 10 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF6F00',
    padding: 20,
    borderRadius: 32,
  },
});
