import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import data from '../data/products.json';
import { getImage } from '../utils/imageMap';

export default function CategoriesScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filtered = data.categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('ProductList', {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
    >
      <Image
        source={getImage(item.image)}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>MyShoppy</Text>
          <View style={styles.logoUnderline} />
        </View>

        <Text style={styles.title}>Shop by Category</Text>
        <Text style={styles.subtitle}>Find products by your favorite category</Text>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#777" />
          <TextInput
            placeholder="Search categories"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Category Cards with Images Filling the Cards */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'flex-start',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 6 : 10,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 22,
    color: '#4A7C7C',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logoUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#4A7C7C',
    marginTop: 3,
    borderRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#777',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  card: {
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: '#EEEEEE',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
