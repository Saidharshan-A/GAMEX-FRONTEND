export const pcComponents = {
  cpu: [
    {
      id: 'cpu-1',
      name: 'Intel Core i9-14900K',
      brand: 'Intel',
      specs: '24 Cores / 32 Threads, 3.2 GHz',
      price: 58900,
      wattage: 125,
      tier: 'ultra',
      image: import.meta.env.BASE_URL + "images/cat_processor_1779732439324.png" // re-using existing images for now
    },
    {
      id: 'cpu-2',
      name: 'AMD Ryzen 7 7800X3D',
      brand: 'AMD',
      specs: '8 Cores / 16 Threads, 4.2 GHz',
      price: 38500,
      wattage: 120,
      tier: 'high',
      image: import.meta.env.BASE_URL + "images/cat_processor_1779732439324.png"
    }
  ],
  cooler: [
    {
      id: 'cooler-1',
      name: 'Corsair iCUE H150i ELITE LCD XT',
      brand: 'Corsair',
      specs: '360mm AIO Liquid Cooler',
      price: 24500,
      wattage: 15,
      tier: 'ultra',
      image: import.meta.env.BASE_URL + "images/cat_cooling.png"
    }
  ],
  motherboard: [
    {
      id: 'mobo-1',
      name: 'ASUS ROG Strix Z790-E Gaming WiFi',
      brand: 'ASUS',
      specs: 'ATX, Intel LGA 1700, DDR5',
      price: 42900,
      wattage: 40,
      tier: 'ultra',
      image: import.meta.env.BASE_URL + "images/cat_motherboard.png"
    }
  ],
  ram: [
    {
      id: 'ram-1',
      name: 'Corsair Vengeance RGB DDR5',
      brand: 'Corsair',
      specs: '32GB (2 x 16GB) 6000MHz',
      price: 12499,
      wattage: 10,
      tier: 'high',
      image: import.meta.env.BASE_URL + "images/cat_memory_1779732467941.png"
    }
  ],
  gpu: [
    {
      id: 'gpu-1',
      name: 'NVIDIA GeForce RTX 4090',
      brand: 'NVIDIA',
      specs: '24GB GDDR6X',
      price: 159900,
      wattage: 450,
      tier: 'ultra',
      image: import.meta.env.BASE_URL + "images/rtx_4090_1779654832020.png"
    },
    {
      id: 'gpu-2',
      name: 'AMD Radeon RX 7900 XTX',
      brand: 'AMD',
      specs: '24GB GDDR6',
      price: 99900,
      wattage: 355,
      tier: 'high',
      image: import.meta.env.BASE_URL + "images/rtx_4090_1779654832020.png"
    }
  ],
  storage: [
    {
      id: 'storage-1',
      name: 'Samsung 990 PRO 2TB',
      brand: 'Samsung',
      specs: 'PCIe 4.0 NVMe M.2 SSD',
      price: 15900,
      wattage: 8,
      tier: 'ultra',
      image: import.meta.env.BASE_URL + "images/pc_builder_1779654793386.png"
    }
  ],
  psu: [
    {
      id: 'psu-1',
      name: 'Corsair RM1000x (2024)',
      brand: 'Corsair',
      specs: '1000W, 80+ Gold, Fully Modular',
      price: 18900,
      wattage: 0, // Doesn't consume its own capacity
      tier: 'ultra',
      image: import.meta.env.BASE_URL + "images/cat_psu.png"
    }
  ],
  case: [
    {
      id: 'case-1',
      name: 'Lian Li PC-O11 Dynamic EVO',
      brand: 'Lian Li',
      specs: 'Mid Tower ATX Case',
      price: 14900,
      wattage: 10, // fans
      tier: 'high',
      image: import.meta.env.BASE_URL + "images/pc_builder_1779654793386.png"
    }
  ]
};

export const defaultBuild = {
  cpu: pcComponents.cpu[0],
  cooler: pcComponents.cooler[0],
  motherboard: pcComponents.motherboard[0],
  ram: pcComponents.ram[0],
  gpu: pcComponents.gpu[0],
  storage: pcComponents.storage[0],
  psu: pcComponents.psu[0],
  case: pcComponents.case[0]
};
