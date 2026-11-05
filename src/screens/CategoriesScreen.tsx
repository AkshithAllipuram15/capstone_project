import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import data from '../data/products.json';
import { getImage } from '../utils/imageMap';

export default function CategoriesScreen({ navigation }: any) {
  const categories = data.categories;

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.bgColor || '#4E6E70' }]}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('ProductList', {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.imageWrapper}>
        <Image
          source={getImage(item.image)}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Brand Header */}
        <View style={styles.topRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>MyShoppy</Text>
            <View style={styles.underlineRow}>
              <View style={styles.logoUnderline} />
              <View style={styles.logoDot} />
            </View>
          </View>
        </View>

        {/* Wireframe Categories Title */}
        <Text style={styles.title}>Categories</Text>

        {/* 2-Column Categories Grid Matching Wireframe */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 12,
    paddingBottom: 8,
  },
  logoBox: {
    alignItems: 'flex-start',
  },
  logoText: {
    fontSize: 24,
    color: '#4E6E70',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  underlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  logoUnderline: {
    width: 55,
    height: 2.5,
    backgroundColor: '#4E6E70',
    borderRadius: 2,
  },
  logoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4E6E70',
    marginLeft: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E6E70',
    marginTop: 14,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 175,
    borderRadius: 14,
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 16,
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});
