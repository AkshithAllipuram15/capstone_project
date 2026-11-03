export const appImages: Record<string, any> = {
  'Cleaning-Supplies.jpg': require('../../assets/images/Cleaning-Supplies.jpg'),
  'Daily-Use-Accessories.jpg': require('../../assets/images/Daily-Use-Accessories.jpg'),
  'home-decor.jpg': require('../../assets/images/home-decor.jpg'),
  'Kitchen-Essentials.jpg': require('../../assets/images/Kitchen-Essentials.jpg'),
  'Storage-items.jpg': require('../../assets/images/Storage-items.jpg'),
  'home-screen.png': require('../../assets/images/home-screen.png'),
  'logo.jpeg': require('../../assets/images/logo.jpeg'),
};

export const getImage = (imageName?: string) => {
  if (imageName && appImages[imageName]) {
    return appImages[imageName];
  }
  return appImages['home-decor.jpg'];
};

export default appImages;