import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import data from '../data/products.json';
import { getImage } from '../utils/imageMap';
import { useCart } from '../context/CartContext';

type SortOption = 'all' | 'top_rated' | 'price_low' | 'price_high';
type PriceOption = 'all' | 'under_500' | '500_1000' | 'above_1000';

export default function ProductListScreen({ route, navigation }: any) {
  const { categoryId, categoryName } = route.params || { categoryId: '3', categoryName: 'Home Décor' };
  const { addToCart, totalCount } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('all');
  const [selectedPrice, setSelectedPrice] = useState<PriceOption>('all');

  const filteredProducts = useMemo(() => {
    let list = data.products.filter(
      (item: any) => !categoryId || item.categoryId === categoryId
    );

    if (searchQuery.trim()) {
      list = list.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedPrice === 'under_500') {
      list = list.filter((item: any) => item.price < 500);
    } else if (selectedPrice === '500_1000') {
      list = list.filter((item: any) => item.price >= 500 && item.price <= 1000);
    } else if (selectedPrice === 'above_1000') {
      list = list.filter((item: any) => item.price > 1000);
    }

    if (selectedSort === 'top_rated') {
      list = [...list].sort((a: any, b: any) => b.rating - a.rating);
    } else if (selectedSort === 'price_low') {
      list = [...list].sort((a: any, b: any) => a.price - b.price);
    } else if (selectedSort === 'price_high') {
      list = [...list].sort((a: any, b: any) => b.price - a.price);
    }

    return list;
  }, [categoryId, searchQuery, selectedPrice, selectedSort]);

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={getImage(item.image)}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={13} color="#FFFFFF" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        <Text style={styles.inStockText}>In Stock</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(item, 1)}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A3333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{categoryName}</Text>
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

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Search within products"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Sort</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
            <TouchableOpacity
              style={[styles.chip, selectedSort === 'all' && styles.chipActive]}
              onPress={() => setSelectedSort('all')}
            >
              <Text style={[styles.chipText, selectedSort === 'all' && styles.chipTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, selectedSort === 'top_rated' && styles.chipActive]}
              onPress={() => setSelectedSort('top_rated')}
            >
              <Text style={[styles.chipText, selectedSort === 'top_rated' && styles.chipTextActive]}>
                Top Rated
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, selectedSort === 'price_low' && styles.chipActive]}
              onPress={() => setSelectedSort('price_low')}
            >
              <Text style={[styles.chipText, selectedSort === 'price_low' && styles.chipTextActive]}>
                Price Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, selectedSort === 'price_high' && styles.chipActive]}
              onPress={() => setSelectedSort('price_high')}
            >
              <Text style={[styles.chipText, selectedSort === 'price_high' && styles.chipTextActive]}>
                Price High
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <Text style={styles.filterLabel}>Price Range</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
            <TouchableOpacity
              style={[styles.chip, selectedPrice === 'all' && styles.chipActive]}
              onPress={() => setSelectedPrice('all')}
            >
              <Text style={[styles.chipText, selectedPrice === 'all' && styles.chipTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, selectedPrice === 'under_500' && styles.chipActive]}
              onPress={() => setSelectedPrice('under_500')}
            >
              <Text style={[styles.chipText, selectedPrice === 'under_500' && styles.chipTextActive]}>
                Under ₹500
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, selectedPrice === '500_1000' && styles.chipActive]}
              onPress={() => setSelectedPrice('500_1000')}
            >
              <Text style={[styles.chipText, selectedPrice === '500_1000' && styles.chipTextActive]}>
                ₹500 - ₹1000
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, selectedPrice === 'above_1000' && styles.chipActive]}
              onPress={() => setSelectedPrice('above_1000')}
            >
              <Text style={[styles.chipText, selectedPrice === 'above_1000' && styles.chipTextActive]}>
                Above ₹1000
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Product List */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products match your criteria.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  iconBtn: { padding: 4, position: 'relative' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A3333' },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterSection: { marginBottom: 12 },
  filterLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  chipsScroll: { flexDirection: 'row', marginBottom: 10 },
  chip: {
    backgroundColor: '#EDEFEF',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#2A6B6B',
  },
  chipText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: { paddingBottom: 24 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#F3F4F6',
  },
  productImage: { width: '100%', height: '100%' },
  detailsContainer: { padding: 14 },
  productTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A3333', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#2A6B6B', marginBottom: 8 },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B7A57',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  ratingText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  inStockText: { fontSize: 13, color: '#2E7D32', fontWeight: '600', marginBottom: 10 },
  addButton: {
    backgroundColor: '#2A6B6B',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  addButtonText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#888', fontSize: 15 },
});
