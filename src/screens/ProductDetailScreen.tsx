import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '../utils/imageMap';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }: any) {
  const { product } = route.params;
  const { addToCart, totalCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header with Back, Title, Home & Cart Icons */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#1b4d58" />
          </TouchableOpacity>

          <Text style={styles.screenTitle} numberOfLines={1}>
            Product Details
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

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={styles.breadcrumb}>Products / {product.name}</Text>

          {/* Product Image */}
          <View style={styles.imageBox}>
            <Image
              source={getImage(product.image)}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Product Details */}
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>₹{product.price}</Text>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity Selector */}
          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {added && <Text style={styles.successText}>✓ Added to cart</Text>}

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginBottom: 12,
  },
  imageBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C7C',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 14,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyNumber: {
    marginHorizontal: 14,
    fontSize: 15,
    fontWeight: 'bold',
  },
  successText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4A7C7C',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
