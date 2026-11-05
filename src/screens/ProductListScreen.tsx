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
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const products = data.products.filter(
    (item: any) => !categoryId || item.categoryId === categoryId
  );

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (item: any) => {
    addToCart(item, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <View style={styles.imageBox}>
          <Image
            source={getImage(item.image)}
            style={styles.productImage}
            resizeMode="cover"
          />
          {/* Wireframe Heart Wishlist Icon */}
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleWishlist(item.id)}
          >
            <Ionicons
              name={wishlist[item.id] ? 'heart' : 'heart-outline'}
              size={18}
              color={wishlist[item.id] ? '#E53E3E' : '#718096'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.productTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
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
        {/* Top Header with Brand & Top Cart Symbol with Live Badge */}
        <View style={styles.topRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>MyShoppy</Text>
            <View style={styles.underlineRow}>
              <View style={styles.logoUnderline} />
              <View style={styles.logoDot} />
            </View>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
          >
            <Ionicons name="cart-outline" size={26} color="#333" />
            {totalCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Wireframe Breadcrumbs & Header Title with Back navigation */}
        <TouchableOpacity
          style={styles.breadcrumbRow}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color="#4E6E70" style={{ marginRight: 6 }} />
          <Text style={styles.breadcrumb}>Categories/ {categoryName}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{categoryName} For You!</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
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
  cartButton: {
    position: 'relative',
    padding: 4,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
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
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  breadcrumb: {
    fontSize: 14,
    color: '#4E6E70',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  imageBox: {
    position: 'relative',
    width: '100%',
    height: 125,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F7FAFC',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E4D48',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 10,
    height: 28,
  },
  addButton: {
    backgroundColor: '#1E4D48',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
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
