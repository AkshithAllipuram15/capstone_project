import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '../utils/imageMap';
import data from '../data/products.json';

export default function HomeScreen({ navigation }: any) {
  const categories = data.categories;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>MyShoppy</Text>
          <View style={styles.logoUnderline} />
        </View>

        {/* Promo Image */}
        <View style={styles.imageContainer}>
          <Image
            source={getImage('home-screen.png')}
            style={styles.promoImage}
            resizeMode="cover"
          />
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>Shopping And Department Store</Text>
          <Text style={styles.welcomeSubtitle}>
            Welcome to MyShoppy. Find all your home, kitchen, and daily essentials at great prices.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Categories')}
          >
            <Text style={styles.browseButtonText}>Browse Categories</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Preview */}
        <Text style={styles.sectionTitle}>Featured Categories</Text>
        <View style={styles.grid}>
          {categories.map((item: any, index: number) => {
            const isLastOdd = index === categories.length - 1 && categories.length % 2 !== 0;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isLastOdd && styles.cardFull]}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('ProductList', {
                    categoryId: item.id,
                    categoryName: item.name,
                  })
                }
              >
                <Image
                  source={getImage(item.image)}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <Text style={styles.cardName}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 6 : 14,
    marginBottom: 14,
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
  imageContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  welcomeBox: {
    backgroundColor: '#F0F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
    marginBottom: 14,
  },
  browseButton: {
    backgroundColor: '#4A7C7C',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  card: {
    width: '48%',
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#EEEEEE',
    position: 'relative',
  },
  cardFull: {
    width: '100%',
    height: 130,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardName: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
