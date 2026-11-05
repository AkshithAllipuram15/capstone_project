import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { getImage } from '../utils/imageMap';

export default function HomeScreen({ navigation }: any) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Responsive height according to viewport, keeping entire screen visible without scrolling
  const imageHeight = Math.round(windowHeight * 0.40);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Centered Brand Header Matching Wireframe */}
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>MyShoppy</Text>
          <View style={styles.underlineRow}>
            <View style={styles.logoUnderline} />
            <View style={styles.logoDot} />
          </View>
        </View>

        {/* Full Viewport Width Promotional Illustration */}
        <View style={[styles.imageContainer, { width: windowWidth, height: imageHeight }]}>
          <Image
            source={getImage('home-screen.png')}
            style={[styles.promoImage, { width: windowWidth }]}
            resizeMode="cover"
          />
        </View>

        {/* Wireframe Welcome Text & Browse Categories Button Directly Below */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Shopping And{'\n'}Department Store.
          </Text>
          <Text style={styles.subtitle}>
            Shopping is a bit of a relaxing hobby for me, which{'\n'}is sometimes troubling for the bank balance.
          </Text>

          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Categories')}
            activeOpacity={0.85}
          >
            <Text style={styles.browseButtonText}>Browse Categories</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 4 : 6,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
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
    width: 54,
    height: 2.5,
    backgroundColor: '#4E6E70',
    borderRadius: 2,
  },
  logoDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#4E6E70',
    marginLeft: 2,
  },
  imageContainer: {
    backgroundColor: '#8CE1F6',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoImage: {
    height: '100%',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: '#E8F5F5',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#133B39',
    marginBottom: 8,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 13,
    color: '#4E6E70',
    lineHeight: 20,
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#4E6E70',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13.5,
  },
});
