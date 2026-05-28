const fs = require('fs');
const path = require('path');

const categories = [
  'PC Gaming', 'Graphics Cards', 'Processors', 'Motherboards',
  'Memory', 'Storage', 'Cooling', 'Power Supplies', 'Cases',
  'Monitors', 'Keyboards', 'Mice', 'Headsets', 'Chairs & Desks', 'Accessories'
];

// Local images mapping for every category
const categoryImages = {
  'Graphics Cards': '/images/rtx_4090_1779654832020.png',
  'Processors': '/images/cat_processor_1779732439324.png',
  'Motherboards': '/images/cat_motherboard_1779732453490.png',
  'Memory': '/images/cat_memory_1779732467941.png',
  'Storage': '/images/cat_storage_1779732482772.png',
  'Cooling': '/images/cat_cooling_1779732499117.png',
  'Power Supplies': '/images/cat_psu_1779732524305.png',
  'Cases': '/images/pc_builder_1779654793386.png',
  'Monitors': '/images/monitor_deal_1779654815151.png',
  'Keyboards': '/images/cat_keyboard_1779732542291.png',
  'Mice': '/images/cat_mouse_1779732558786.png',
  'Headsets': '/images/headset_1779654846277.png',
  'Chairs & Desks': '/images/cat_chair_1779732574707.png',
  'Accessories': '/images/cat_accessory_1779732590770.png',
  'PC Gaming': '/images/pc_builder_1779654793386.png'
};

const brands = {
  'Graphics Cards': ['NVIDIA', 'AMD', 'ASUS', 'MSI', 'Gigabyte', 'Zotac'],
  'Processors': ['Intel Core', 'AMD Ryzen'],
  'Motherboards': ['ASUS ROG', 'MSI MPG', 'Gigabyte AORUS', 'ASRock'],
  'Memory': ['Corsair Vengeance', 'G.Skill Trident', 'Kingston FURY', 'Crucial'],
  'Storage': ['Samsung 980', 'WD Black', 'Seagate FireCuda', 'Crucial P3'],
  'Cooling': ['Corsair iCUE', 'NZXT Kraken', 'Noctua', 'Cooler Master'],
  'Power Supplies': ['Corsair RMx', 'EVGA SuperNOVA', 'Seasonic Focus', 'Be Quiet!'],
  'Cases': ['NZXT H510', 'Corsair 4000D', 'Lian Li O11', 'Fractal Design'],
  'Monitors': ['ASUS ROG', 'Alienware', 'LG UltraGear', 'Samsung Odyssey', 'BenQ ZOWIE'],
  'Keyboards': ['Razer', 'Logitech G', 'Corsair', 'SteelSeries', 'Keychron'],
  'Mice': ['Logitech G', 'Razer', 'SteelSeries', 'Glorious', 'Zowie'],
  'Headsets': ['HyperX Cloud', 'SteelSeries Arctis', 'Logitech G', 'Razer'],
  'Chairs & Desks': ['Secretlab', 'Herman Miller', 'DXRacer', 'Corsair'],
  'Accessories': ['Elgato Stream Deck', 'Blue Yeti', 'Razer Seiren', 'Logitech Webcam'],
  'PC Gaming': ['Alienware Aurora', 'HP Omen', 'Lenovo Legion', 'Corsair Vengeance PC']
};

const productTypes = {
  'Graphics Cards': ['RTX 4090', 'RTX 4080', 'RTX 4070', 'RX 7900 XTX', 'RX 7800 XT', 'RTX 3060', 'RTX 4060 Ti'],
  'Processors': ['i9-14900K', 'i7-14700K', 'i5-13600K', 'Ryzen 9 7950X', 'Ryzen 7 7800X3D', 'Ryzen 5 7600X'],
  'Motherboards': ['Z790', 'B650', 'X670E', 'B760', 'Z690'],
  'Memory': ['32GB DDR5-6000', '16GB DDR5-5600', '64GB DDR5-6400', '32GB DDR4-3600'],
  'Storage': ['2TB NVMe SSD', '1TB Gen4 SSD', '4TB HDD', '500GB SSD'],
  'Cooling': ['360mm AIO', '240mm Liquid Cooler', 'Dual Tower Air Cooler', '120mm RGB Fan Pack'],
  'Power Supplies': ['850W 80+ Gold', '1000W 80+ Platinum', '750W Fully Modular', '650W Bronze'],
  'Cases': ['Mid-Tower ATX', 'Mini-ITX Chassis', 'Full-Tower E-ATX', 'Dual-Chamber Case'],
  'Monitors': ['27" 1440p 165Hz', '24" 1080p 240Hz', '34" Ultrawide OLED', '32" 4K 144Hz'],
  'Keyboards': ['Mechanical Gaming Keyboard', '60% Optical Keyboard', 'TKL Wireless RGB', 'Low Profile Keyboard'],
  'Mice': ['Wireless Gaming Mouse', 'Ultralight Mouse', 'MMO Gaming Mouse', 'Symmetrical Esports Mouse'],
  'Headsets': ['Wireless Gaming Headset', '7.1 Surround Sound', 'Open-Back Headset', 'Noise Cancelling Headset'],
  'Chairs & Desks': ['Gaming Chair', 'Ergonomic Mesh Chair', 'Standing Gaming Desk', 'L-Shaped Desk'],
  'Accessories': ['Capture Card', 'USB Microphone', 'Webcam 1080p60', 'RGB Mousepad', 'Monitor Arm'],
  'PC Gaming': ['Gaming PC', 'Pre-built Desktop', 'Esports Rig', 'Streaming PC']
};

// Fallback Unsplash placeholder images based on category
const fallbackImages = {
  'Graphics Cards': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400&h=400',
  'Processors': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400&h=400',
  'Motherboards': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=400',
  'Memory': 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=400&h=400',
  'Storage': 'https://images.unsplash.com/photo-1628527304948-06157ee3c8a6?auto=format&fit=crop&q=80&w=400&h=400',
  'Cooling': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=400&h=400',
  'Power Supplies': 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400&h=400',
  'Cases': 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=400&h=400',
  'Monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400&h=400',
  'Keyboards': 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400&h=400',
  'Mice': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400&h=400',
  'Headsets': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=400',
  'Chairs & Desks': 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400&h=400',
  'Accessories': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400&h=400',
  'PC Gaming': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400&h=400'
};

const products = [];

categories.forEach(category => {
  // Generate 15 products per category
  for (let i = 0; i < 15; i++) {
    const brandList = brands[category] || ['Generic'];
    const typeList = productTypes[category] || ['Product'];

    const brand = brandList[Math.floor(Math.random() * brandList.length)];
    const type = typeList[Math.floor(Math.random() * typeList.length)];

    // Some random base price depending on category roughly
    let basePrice = 50 + Math.random() * 200;
    if (['Graphics Cards', 'PC Gaming', 'Monitors'].includes(category)) {
      basePrice = 300 + Math.random() * 1500;
    } else if (['Processors', 'Motherboards'].includes(category)) {
      basePrice = 150 + Math.random() * 400;
    }

    // Convert to INR (roughly * 83)
    basePrice = basePrice * 83;

    const price = Math.floor(basePrice);
    // 30% chance of having a discount
    const hasDiscount = Math.random() > 0.7;
    const originalPrice = hasDiscount ? Math.floor(price * (1 + Math.random() * 0.3)) : null;

    const rating = Number((3.5 + Math.random() * 1.5).toFixed(1));
    const isNew = Math.random() > 0.8;

    products.push({
      name: `${brand} ${type} ${Math.floor(Math.random() * 1000)}`,
      category: category,
      price: price,
      originalPrice: originalPrice,
      rating: rating,
      isNew: isNew,
      image: categoryImages[category] || '/images/hero_bg_1779654779374.png'
    });
  }
});

const fileContent = `export const allProducts = ${JSON.stringify(products, null, 2)};\n`;

const targetDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(path.join(targetDir, 'products.js'), fileContent);
console.log('Successfully generated products.js with ' + products.length + ' products.');
