import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function OrderSuccessScreen({ navigation }: any) {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconSquare}>
          <Ionicons name="checkmark" size={60} color="#FFFFFF" />
        </View>

        <Text style={styles.successTitle}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>Thank you for shopping with MyShoppy.</Text>

        {/* Order Info Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>#MS974145</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>Cash On Delivery</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estimated Delivery</Text>
            <Text style={styles.value}>2 - 4 Days</Text>
          </View>
        </View>

        {/* Continue Shopping Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconSquare: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: '#48BB78',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#48BB78',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A3333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 28,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: 'bold', color: '#1A3333' },
  continueButton: {
    width: '100%',
    backgroundColor: '#2A6B6B',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
