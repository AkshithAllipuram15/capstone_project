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

  const [name, setName] = useState('Akshith Allipuram');
  const [phone, setPhone] = useState('9126123456');
  const [address, setAddress] = useState('street no 1 , sangareddy');
  const [city, setCity] = useState('Sangareddy');
  const [state, setState] = useState('Telangana');
  const [pin, setPin] = useState('502001');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logoText}>MyShoppy</Text>
            <View style={styles.logoUnderline} />
          </View>

          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={styles.pageTitle}>Shipping & Checkout</Text>

          {/* Delivery Form */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Delivery Address</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

            <Text style={styles.inputLabel}>Address</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} />

            <Text style={styles.inputLabel}>City</Text>
            <TextInput style={styles.input} value={city} onChangeText={setCity} />

            <Text style={styles.inputLabel}>State</Text>
            <TextInput style={styles.input} value={state} onChangeText={setState} />

            <Text style={styles.inputLabel}>PIN Code</Text>
            <TextInput style={styles.input} value={pin} onChangeText={setPin} keyboardType="numeric" />
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Payment Method</Text>
            <Text style={styles.paymentText}>• Cash On Delivery (COD)</Text>
          </View>

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items:</Text>
              <Text style={styles.summaryValue}>{totalCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charge:</Text>
              <Text style={[styles.summaryValue, { color: '#2E7D32' }]}>FREE</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Platform Fee:</Text>
              <Text style={styles.summaryValue}>₹{platformFee}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total Amount:</Text>
              <Text style={styles.totalPrice}>₹{finalTotal.toLocaleString()}</Text>
            </View>
          </View>

          {/* Place Order Button */}
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate('OrderSuccess')}
          >
            <Text style={styles.orderButtonText}>Place Order</Text>
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
    marginTop: 10,
    marginBottom: 8,
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
    marginBottom: 12,
  },
  section: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  paymentText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#666',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 6,
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7C7C',
  },
  orderButton: {
    backgroundColor: '#4A7C7C',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
