import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }: any) {
  const { totalCount, totalPrice } = useCart();
  const platformFee = 20;
  const finalTotal = totalPrice + (totalCount > 0 ? platformFee : 0);

  const [fullName, setFullName] = useState('Tanmay Kailas Ghanwat');
  const [phone, setPhone] = useState('7249107391');
  const [address, setAddress] = useState('Rajgurunagar, khed');
  const [city, setCity] = useState('Pune');
  const [state, setState] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('411041');

  const handlePlaceOrder = () => {
    navigation.navigate('OrderSuccess');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A3333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
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
        {/* Delivery Details Card */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionEmoji}>📍</Text>
            <Text style={styles.sectionTitle}>Delivery Details</Text>
          </View>

          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="City"
          />
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={setState}
            placeholder="State"
          />
          <TextInput
            style={styles.input}
            value={pinCode}
            onChangeText={setPinCode}
            placeholder="PIN Code"
            keyboardType="numeric"
          />
        </View>

        {/* Payment Method Card */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionEmoji}>💳</Text>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          <View style={styles.paymentBox}>
            <Ionicons name="checkmark-circle" size={20} color="#2A6B6B" />
            <Text style={styles.paymentText}>Cash On Delivery (COD)</Text>
          </View>
        </View>

        {/* Order Summary Card */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionEmoji}>🛒</Text>
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items</Text>
            <Text style={styles.summaryValue}>{totalCount}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.freeText}>FREE</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Fee</Text>
            <Text style={styles.summaryValue}>₹{platformFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{finalTotal.toLocaleString()}</Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={styles.orderButton}
          activeOpacity={0.85}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F5F7' },
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
  container: { padding: 16, paddingBottom: 30 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionEmoji: { fontSize: 18, marginRight: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A3333' },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7F7',
    padding: 14,
    borderRadius: 10,
    gap: 10,
  },
  paymentText: { fontSize: 14, fontWeight: '600', color: '#1A3333' },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#1A3333' },
  freeText: { fontSize: 14, fontWeight: 'bold', color: '#2E7D32' },
  divider: { height: 1, backgroundColor: '#EAEAEA', marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A3333' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#2A6B6B' },
  orderButton: {
    backgroundColor: '#2A6B6B',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 8,
  },
  orderButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
