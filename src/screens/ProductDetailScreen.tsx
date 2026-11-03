import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '../utils/imageMap';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }: any) {
  const { product } = route.params;
  const { addToCart, totalCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A3333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
            style={styles.iconBtn}
          >
            <Ionicons name="home-outline" size={22} color="#1A3333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
            style={styles.iconBtn}
          >
            <Ionicons name="cart-outline" size={22} color="#1A3333" />
            {totalCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={getImage(product.image)}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
            {product.discount && (
              <Text style={styles.discountText}>{product.discount}</Text>
            )}
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#EAA023" />
            <Text style={styles.ratingText}>{product.rating || 4.5}</Text>
          </View>

          <Text style={styles.stockText}>✓ In Stock</Text>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionHeading}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Features card */}
          <View style={styles.featuresCard}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚚</Text>
              <Text style={styles.featureLabel}>Free Delivery</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔄</Text>
              <Text style={styles.featureLabel}>7 Days Easy Return</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💳</Text>
              <Text style={styles.featureLabel}>Cash On Delivery</Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity.toString().padStart(2, '0')}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {addedMessage && (
            <View style={styles.addedNotice}>
              <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
              <Text style={styles.addedNoticeText}>Item added to cart!</Text>
            </View>
          )}

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            activeOpacity={0.85}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  iconBtn: { padding: 4, position: 'relative' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A3333' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#E53E3E',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  container: { paddingBottom: 30 },
  imageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#EDEDED',
  },
  image: { width: '100%', height: '100%' },
  detailsContainer: { paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A3333', marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  price: { fontSize: 22, fontWeight: 'bold', color: '#2A6B6B' },
  originalPrice: { fontSize: 16, color: '#888', textDecorationLine: 'line-through' },
  discountText: { fontSize: 14, color: '#2E7D32', fontWeight: 'bold' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 4 },
  ratingText: { fontSize: 14, fontWeight: '600', color: '#444' },
  stockText: { fontSize: 14, color: '#2E7D32', fontWeight: 'bold', marginBottom: 14 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginBottom: 14 },
  sectionHeading: { fontSize: 16, fontWeight: 'bold', color: '#1A3333', marginBottom: 6 },
  description: { fontSize: 14, color: '#555', lineHeight: 22, marginBottom: 16 },
  featuresCard: {
    backgroundColor: '#F0F4F4',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 10,
  },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureIcon: { fontSize: 16 },
  featureLabel: { fontSize: 14, color: '#333', fontWeight: '500' },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A3333' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: {
    width: 34,
    height: 34,
    backgroundColor: '#2A6B6B',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' },
  qtyValue: { marginHorizontal: 16, fontSize: 16, fontWeight: 'bold', color: '#1A3333' },
  addedNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  addedNoticeText: { color: '#2E7D32', fontWeight: '600' },
  addToCartButton: {
    backgroundColor: '#2A6B6B',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  addToCartText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
