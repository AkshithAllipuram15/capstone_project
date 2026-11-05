import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { getImage } from '../utils/imageMap';

export default function CartScreen({ navigation }: any) {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleContinueShopping = () => {
    clearCart();
    setShowSuccessModal(false);
    navigation.navigate('Home');
  };

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

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={60} color="#A0AEC0" />
            <Text style={styles.emptyTitle}>Your cart is currently empty</Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('Categories')}
            >
              <Text style={styles.browseBtnText}>Browse Categories</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Box 1: Review Item And Shipping */}
            <View style={styles.reviewBox}>
              <Text style={styles.reviewHeading}>Review Item And Shipping</Text>

              {cart.map((item: any) => (
                <View key={item.id} style={styles.cartItemRow}>
                  <Image
                    source={getImage(item.image)}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemColor}>Color: Standard</Text>

                    {/* Qty Selector */}
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

                    <Text style={styles.stockNotice}>Only 12 Items Left! Don't miss it</Text>
                  </View>

                  <View style={styles.itemRight}>
                    <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                    <Text style={styles.quantityLabel}>
                      Quantity: {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                    </Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ marginTop: 6 }}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Box 2: Total Price Breakdown */}
            <View style={styles.totalSection}>
              <Text style={styles.totalPriceTitle}>Total Price</Text>

              {cart.map((item: any) => (
                <View key={item.id} style={styles.summaryItemRow}>
                  <Text style={styles.summaryItemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.summaryItemQty}>{item.quantity}</Text>
                  <Text style={styles.summaryItemPrice}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </Text>
                </View>
              ))}

              <View style={styles.totalLine}>
                <Text style={styles.grandTotalText}>
                  Total : ₹{totalPrice.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Wireframe Place Order Button */}
            <TouchableOpacity
              style={styles.placeOrderBtn}
              activeOpacity={0.85}
              onPress={() => setShowSuccessModal(true)}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* Wireframe Order Success Modal (No separate screen) */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              {/* Soft Aura with Green Checkmark */}
              <View style={styles.auraContainer}>
                <View style={styles.auraCircle}>
                  <View style={styles.checkmarkCircle}>
                    <Ionicons name="checkmark" size={38} color="#FFFFFF" />
                  </View>
                </View>
              </View>

              <Text style={styles.modalTitle}>Your order has been accepted</Text>
              <Text style={styles.modalSubtitle}>Transaction ID: 8984294820</Text>

              {/* Wireframe Orange Continue Shopping Button */}
              <TouchableOpacity
                style={styles.continueButton}
                activeOpacity={0.85}
                onPress={handleContinueShopping}
              >
                <Text style={styles.continueButtonText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 10,
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
  scrollContent: {
    paddingBottom: 90,
    paddingTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 16,
    color: '#718096',
    marginTop: 14,
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: '#4E6E70',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
  },
  browseBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  reviewBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  reviewHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  itemImage: {
    width: 62,
    height: 62,
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  itemColor: {
    fontSize: 11,
    color: '#718096',
    marginVertical: 2,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  stockNotice: {
    fontSize: 9,
    color: '#E53E3E',
    marginTop: 2,
  },
  itemRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  quantityLabel: {
    fontSize: 10,
    color: '#718096',
    marginTop: 2,
  },
  removeText: {
    fontSize: 11,
    color: '#E53E3E',
    fontWeight: '600',
  },
  totalSection: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  totalPriceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 16,
  },
  summaryItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#2D3748',
    flex: 1,
  },
  summaryItemQty: {
    fontSize: 14,
    color: '#4A5568',
    width: 40,
    textAlign: 'center',
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'right',
    minWidth: 70,
  },
  totalLine: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  grandTotalText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'right',
  },
  placeOrderBtn: {
    backgroundColor: '#4E6E70',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignSelf: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  auraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  auraCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E6F9EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#52C41A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#F56523',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
