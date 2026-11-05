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
        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>MyShoppy</Text>
          <View style={styles.logoUnderline} />
        </View>

        {/* Checkmark Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={50} color="#FFFFFF" />
        </View>

        <Text style={styles.successTitle}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>Thank you for shopping with MyShoppy.</Text>

        {/* Order Details Box */}
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID:</Text>
            <Text style={styles.value}>#MS974145</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>Cash On Delivery</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estimated Delivery:</Text>
            <Text style={styles.value}>2 - 4 Days</Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 24,
    color: '#4A7C7C',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logoUnderline: {
    width: 45,
    height: 3,
    backgroundColor: '#4A7C7C',
    marginTop: 4,
    borderRadius: 2,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  value: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#4A7C7C',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
