import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import data from '../data/products.json';
import { getImage } from '../utils/imageMap';
import { useCart } from '../context/CartContext';

export default function ProductListScreen({ route, navigation }: any) {
  const { categoryId, categoryName } = route.params || { categoryId: '3', categoryName: 'Home Décor' };
  const { addToCart, totalCount } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const products = data.products.filter(
    (item: any) => !categoryId || item.categoryId === categoryId
  );

  const handleAdd = (item: any) => {
    addToCart(item, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
        <Image
          source={getImage(item.image)}
          style={styles.productImage}
          resizeMode="cover"
        />
        <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addButton, addedId === item.id && styles.addedButton]}
        onPress={() => handleAdd(item)}
      >
        <Text style={styles.addButtonText}>
          {addedId === item.id ? 'Added ✓' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header with Back, Title, Home & Cart Icons */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#1b4d58" />
          </TouchableOpacity>

          <Text style={styles.screenTitle} numberOfLines={1}>
            {categoryName}
          </Text>

          <View style={styles.rightIcons}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
            >
              <Ionicons name="home-outline" size={24} color="#1b4d58" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconBtn, styles.cartBtn]}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
            >
              <Ionicons name="cart-outline" size={26} color="#1b4d58" />
              {totalCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.breadcrumb}>Categories / {categoryName}</Text>
        <Text style={styles.headerTitle}>{categoryName} For You</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products available in this category.</Text>
          }
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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 6 : 8,
    paddingBottom: 8,
    marginBottom: 6,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b4d58',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 6,
  },
  cartBtn: {
    position: 'relative',
    marginLeft: 6,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E53935',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    zIndex: 10,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  breadcrumb: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 14,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'space-between',
  },
  productImage: {
    width: '100%',
    height: 110,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#EEE',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A7C7C',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#777',
    marginBottom: 8,
    height: 28,
  },
  addButton: {
    backgroundColor: '#4A7C7C',
    paddingVertical: 7,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  addedButton: {
    backgroundColor: '#2E7D32',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 14,
  },
});
