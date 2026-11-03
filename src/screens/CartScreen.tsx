import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { getImage } from '../utils/imageMap';

export default function CartScreen({ navigation }: any) {
  const { cart, updateQuantity, removeFromCart, totalCount, totalPrice } = useCart();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image
        source={getImage(item.image)}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>

        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, 'decrease')}
          >
            <Ionicons name="remove" size={16} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, 'increase')}
          >
            <Ionicons name="add" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => removeFromCart(item.id)}
          style={styles.removeBtn}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Home');
              }
            }}
            style={styles.iconBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#1A3333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.iconBtn}
            >
              <Ionicons name="home-outline" size={22} color="#1A3333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="cart-outline" size={22} color="#1A3333" />
              {totalCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Cart items */}
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color="#CCC" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Explore our products and add items to your cart</Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate('Categories')}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Bottom checkout bar */}
        {cart.length > 0 && (
          <View style={styles.bottomCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{totalCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹{totalPrice.toLocaleString()}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed To Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { flex: 1 },
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
  listContainer: { padding: 16, paddingBottom: 20 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  itemDetails: { flex: 1, marginLeft: 14, justifyContent: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#1A3333', marginBottom: 4 },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: '#2A6B6B', marginBottom: 8 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2A6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { marginHorizontal: 12, fontSize: 15, fontWeight: 'bold', color: '#1A3333' },
  removeBtn: { alignSelf: 'flex-start', marginTop: 2 },
  removeText: { color: '#E53E3E', fontSize: 13, fontWeight: '500' },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#EEE',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 15, color: '#555' },
  summaryValue: { fontSize: 16, fontWeight: 'bold', color: '#1A3333' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#2A6B6B' },
  checkoutButton: {
    backgroundColor: '#2A6B6B',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 6,
  },
  checkoutButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#777', textAlign: 'center', marginBottom: 24 },
  shopButton: {
    backgroundColor: '#2A6B6B',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  shopButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
});
