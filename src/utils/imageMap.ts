export const appImages: Record<string, any> = {
  // Categories & App Assets
  'Cleaning-Supplies.jpg': require('../../assets/images/Cleaning-Supplies.jpg'),
  'Daily-Use-Accessories.jpg': require('../../assets/images/Daily-Use-Accessories.jpg'),
  'home-decor.jpg': require('../../assets/images/home-decor.jpg'),
  'Kitchen-Essentials.jpg': require('../../assets/images/Kitchen-Essentials.jpg'),
  'Storage-items.jpg': require('../../assets/images/Storage-items.jpg'),
  'tech-gadgets.jpg': require('../../assets/images/tech-gadgets.jpg'),
  'home-screen.png': require('../../assets/images/home-screen.png'),
  'logo.jpeg': require('../../assets/images/logo.jpeg'),

  // High Quality Products
  'modern-yellow-chair.jpg': require('../../assets/images/modern-yellow-chair.jpg'),
  'modern-red-chair.jpg': require('../../assets/images/modern-yellow-chair.jpg'),
  'dining-table.jpg': require('../../assets/images/dining-table.jpg'),
  'led-table-lamp.jpg': require('../../assets/images/led-table-lamp.jpg'),
  'aromatherapy-candle.jpg': require('../../assets/images/aromatherapy-candle.jpg'),
  'measuring-cup-set.jpg': require('../../assets/images/measuring-cup-set.jpg'),
  'stainless-steel-cookware.jpg': require('../../assets/images/stainless-steel-cookware.jpg'),
  'liquid-detergent.jpg': require('../../assets/images/liquid-detergent.jpg'),
  'disinfectant-spray.jpg': require('../../assets/images/disinfectant-spray.jpg'),
  'storage-baskets.jpg': require('../../assets/images/storage-baskets.jpg'),
  'wardrobe-organizer.jpg': require('../../assets/images/wardrobe-organizer.jpg'),
  'daily-backpack.jpg': require('../../assets/images/daily-backpack.jpg'),
  'leather-wallet.jpg': require('../../assets/images/leather-wallet.jpg'),
  'wireless-headphones.jpg': require('../../assets/images/wireless-headphones.jpg'),
  'smart-watch.jpg': require('../../assets/images/smart-watch.jpg'),
  'gaming-console.jpg': require('../../assets/images/gaming-console.jpg'),
  'smart-tablet.jpg': require('../../assets/images/smart-tablet.jpg'),
};

export const getImage = (imageName?: string) => {
  if (imageName && (imageName.startsWith('http://') || imageName.startsWith('https://'))) {
    return { uri: imageName };
  }
  if (imageName && appImages[imageName]) {
    return appImages[imageName];
  }
  return appImages['home-decor.jpg'];
};

export default appImages;
