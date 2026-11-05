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
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, 'increase')}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Home');
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logoText}>MyShoppy</Text>
            <View style={styles.logoUnderline} />
          </View>

          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.pageTitle}>Review Cart Items</Text>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={50} color="#AAA" />
            <Text style={styles.emptyTitle}>Your cart is currently empty</Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('Categories')}
            >
              <Text style={styles.browseBtnText}>Browse Products</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        {cart.length > 0 && (
          <View style={styles.totalSection}>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Items:</Text>
              <Text style={styles.totalValue}>{totalCount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalPrice}>₹{totalPrice.toLocaleString()}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
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
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 14,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  itemImage: {
    width: 65,
    height: 65,
    borderRadius: 6,
    backgroundColor: '#EEE',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A7C7C',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
    marginBottom: 16,
  },
  browseBtn: {
    backgroundColor: '#4A7C7C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  browseBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 15,
    color: '#555',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C7C',
  },
  checkoutButton: {
    backgroundColor: '#4A7C7C',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
