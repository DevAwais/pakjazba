import React, { Component } from 'react';
import { Cascader, Button } from 'antd';
import { Redirect } from "react-router-dom";
import './banner-tabs.css';

const category = [{
  value: 'Electronic',
  label: 'Electronics Devices',
  children: [{
    value: 'Mobile',
    label: 'Mobile Phones',
    children: [{
      value: 'Apple',
      label: 'Apple iPhones',
    }, {
      value: 'Samsung',
      label: 'Samsung Mobiles',
    }, {
      value: 'Nokia',
      label: 'Nokia Mobiles',
    }, {
      value: 'Xiaomi',
      label: 'Xiaomi Mi Mobiles',
    }, {
      value: 'Redmi',
      label: 'Redmi Mobiles',
    }, {
      value: 'Realme',
      label: 'Realme Mobiles',
    }, {
      value: 'Oppo',
      label: 'Oppo Mobiles',
    }, {
      value: 'Oneplus',
      label: 'Oneplus Mobiles'
    }],
  },
  {
    value: 'Tablets',
    label: 'Tablets',
    children: [{
      value: 'Tablets',
      label: 'Tablets',

    }]
  },
  {
    value: 'Laptops',
    label: 'Laptops',
    children: [{
      value: 'Gaming Laptops',
      label: 'Gaming Laptops',
    }, {
      value: 'Laptops & Notebooks',
      label: 'Laptops & Notebooks',
    }, {
      value: 'Macbooks',
      label: 'Macbooks',
    }]
  }, {
    value: 'Desktops',
    label: 'Desktops',
    children: [{
      value: 'Gaming Desktops',
      label: 'Gaming Desktops',
    }, {
      value: 'All-In-One',
      label: 'All-In-One',
    }, {
      value: 'DIY',
      label: 'DIY',
    }]
  }, {
    value: 'Gaming',
    label: 'Gaming Console',
    children: [{
      value: 'PlayStation Consoles',
      label: 'PlayStation Consoles',
    }, {
      value: 'PlayStation Games',
      label: 'PlayStation Games',
    }, {
      value: 'PlayStation Controllers',
      label: 'PlayStation Controllers',
    }, {
      value: 'Nintendo Games',
      label: 'Nintendo Games',
    }, {
      value: 'Xbox Games',
      label: 'Xbox Games',
    }]

  }, {
    value: 'Action/Video',
    label: 'Action/Video Cameras',
    children: [{
      value: 'Video Camera',
      label: 'Video Camera',
    }]
  }, {
    value: 'Security',
    label: 'Security Cameras',
    children: [{
      value: 'IP',
      label: 'IP Security Cameras',
    }]
  }, {
    value: 'Digital',
    label: 'Digital Cameras',
    children: [{
      value: 'DSLR',
      label: 'DSLR Cameras',
    }, {
      value: 'Point',
      label: 'Point & Shoot',
    }, {
      value: 'Instant',
      label: 'Instant Camera',
    }]
  }, {
    value: 'Insurance',
    label: 'Insurance & Protection',
    children: [{
      value: 'Insurance',
      label: 'Insurance & Protection',

    }]
  }]

}, {
  value: 'Accessories',
  label: 'Electronic Accessories',
  children: [{
    value: 'MobileAccessories',
    label: 'Mobile Accessories',
    children: [{
      value: 'PhoneCases',
      label: 'Phone Cases',
    }, {
      value: 'PowerBanks',
      label: 'Power Banks',
    }, {
      value: 'Cables&Converters',
      label: 'Cables & Converters',
    }, {
      value: 'WallChargers',
      label: 'Wall Chargers',
    }, {
      value: 'WirelessChargers',
      label: 'Wireless Chargers',
    }, {
      value: 'TabletAccessories',
      label: 'Tablet Accessories',
    }, {
      value: 'Parts&Tools',
      label: 'Parts & Tools',
    }]
  }, {
    value: 'Audio',
    label: 'Audio',
    children: [{
      value: 'Headphones & Headsets',
      label: 'Headphones & Headsets',
    }, {
      value: 'Home Entertainment',
      label: 'Home Entertainment',
    }, {
      value: 'Live Sound & Stage Equipment',
      label: 'Live Sound & Stage Equipment',
    }, {
      value: 'Portable Players',
      label: 'Portable Players',
    }]
  }, {
    value: 'Wearable',
    label: 'Wearable',
    children: [{
      value: 'Smartwatches',
      label: 'Smartwatches',
    }, {
      value: 'Fitness & Activity Trackers',
      label: 'Fitness & Activity Trackers',
    }, {
      value: 'Fitness Tracker Accessories',
      label: 'Fitness Tracker Accessories',
    }, {
      value: 'Virtual Reality',
      label: 'Virtual Reality',
    }]
  }, {
    value: 'Console Accessories',
    label: 'Console Accessories',
    children: [{
      value: 'PlayStationControllers',
      label: 'PlayStation Controllers',
    }, {
      value: 'PlayStationAudio & Accessories',
      label: 'PlayStation Audio & Accessories',
    }]
  }, {
    value: 'Camera Accessories',
    label: 'Camera Accessories',
    children: [{
      value: 'Memory Cards',
      label: 'Memory Cards',
    }, {
      value: 'Lenses',
      label: 'Lenses',
    }, {
      value: 'Tripod & Monopods',
      label: 'Tripod & Monopods',
    }, {
      value: 'Camera Cases, Covers',
      label: 'Camera Cases, Covers',
    }, {
      value: 'Action Camera Accessories',
      label: 'Action Camera Accessories',
    }, {
      value: 'Lightining & Studio Equipment',
      label: 'Lightining & Studio Equipment',
    }, {
      value: 'Batteries',
      label: 'Batteries',
    }]
  }, {
    value: 'Computer Accessories',
    label: 'Computer Accessories',
    children: [{
      value: 'Monitors',
      label: 'Monitors',
    }, {
      value: 'Keyboards',
      label: 'Keyboards',
    }, {
      value: 'Mice',
      label: 'Mice',
    }, {
      value: 'Adapters & Cables',
      label: 'Adapters & Cables',
    }, {
      value: 'PC Audio',
      label: 'PC Audio',
    }]
  }, {
    value: 'Storage',
    label: 'Storage',
    children: [{
      value: 'External Hard Drives',
      label: 'External Hard Drives',
    }, {
      value: 'Internal Hard Drives',
      label: 'Internal Hard Drives',
    }, {
      value: 'Flash Drives',
      label: 'Flash Drives',
    }, {
      value: 'OTG Drives',
      label: 'OTG Drives',
    }, {
      value: 'Storage for Mac',
      label: 'Storage for Mac',
    }],
  }, {
    value: 'Printer',
    label: 'Printer',
    children: [{
      value: 'Printers',
      label: 'Printers',
    }, {
      value: 'Ink & Toners',
      label: 'Ink & Toners',
    }, {
      value: 'Fax Machines',
      label: 'Fax Machines',
    }]
  }, {
    value: 'Computer Components',
    label: 'Computer Components',
    children: [{
      value: 'Graphic Cards',
      label: 'Graphic Cards',
    }, {
      value: 'Desktop Casing',
      label: 'Desktop Casing',
    }, {
      value: 'Motherboards',
      label: 'Motherboards',
    }, {
      value: 'Fans & Heatsinks',
      label: 'Fans & Heatsinks',
    }, {
      value: 'Processors',
      label: 'Processors',
    }]
  }, {
    value: 'Network Components',
    label: 'Network Components',
    children: [{
      value: 'Network Components',
      label: 'Network Components',

    }]
  }]
}, {
  value: 'TV',
  label: 'TV & Home Appliances',
  children: [{
    value: 'TV & Video Devices',
    label: 'TV & Video Devices',
    children: [{
      value: 'Projectors',
      label: 'Projectors',
    }, {
      value: 'LED Televisons',
      label: 'LED Televisons',
    }, {
      value: 'Smart Televisions',
      label: 'Smart Televisions',
    }, {
      value: 'OLED Televisions',
      label: 'OLED Televisions',
    }, {
      value: 'QLED Televisions',
      label: 'QLED Televisions',
    }, {
      value: 'Other Televisons',
      label: 'Other Televisons',
    }, {
      value: 'Blu-Ray/DVD Players',
      label: 'Blu-Ray/DVD Players',
    }]
  }, {
    value: 'Home Audio',
    label: 'Home Audio',
    children: [{
      value: 'Soundbars',
      label: 'Soundbars',
    }, {
      value: 'Home Entertainment',
      label: 'Home Entertainment',
    }, {
      value: 'Portable Players',
      label: 'Portable Players',
    }, {
      value: 'Live Sound & Stage Equipment',
      label: 'Live Sound & Stage Equipment',
    }]
  }, {
    value: 'TV Accessories',
    label: 'TV Accessories',
    children: [{
      value: 'TV Recievers',
      label: 'TV Recievers',
    }, {
      value: 'Wall Mounts & Protectors',
      label: 'Wall Mounts & Protectors',
    }]
  }, {
    value: 'Large Appliances',
    label: 'Large Appliances',
    children: [{
      value: 'Washing Machines',
      label: 'Washing Machines',
    }, {
      value: 'Refrigerators',
      label: 'Refrigerators',
    }, {
      value: 'Microwave',
      label: 'Microwave',
    }, {
      value: 'Oven',
      label: 'Oven',
    }, {
      value: 'Freezer',
      label: 'Freezer',
    }, {
      value: 'Cooktop & Range',
      label: 'Cooktop & Range',
    }, {
      value: 'Water Heater',
      label: 'Water Heater',
    }]
  }, {
    value: 'Small Kitchen Appliances',
    label: 'Small Kitchen Appliances',
    children: [{
      value: 'Rice Cooker',
      label: 'Rice Cooker',
    }, {
      value: 'Blender, Mixer & Grinder',
      label: 'Blender, Mixer & Grinder',
    }, {
      value: 'Electric Ketttle',
      label: 'Electric Ketttle',
    }, {
      value: 'Juicer & Fruit Extraction',
      label: 'Juicer & Fruit Extraction',
    }, {
      value: 'Fryer',
      label: 'Fryer',
    }, {
      value: 'Water Purifier',
      label: 'Water Purifier',
    }, {
      value: 'Pressure Cookers',
      label: 'Pressure Cookers',
    }, {
      value: 'Speciality Cookware',
      label: 'Speciality Cookware',
    }]
  }, {
    value: 'Cooling & Air Treatment',
    label: 'Cooling & Air Treatment',
    children: [{
      value: 'Fan',
      label: 'Fan',
    }, {
      value: 'Air Conditioner',
      label: 'Air Conditioner',
    }, {
      value: 'Air Cooler',
      label: 'Air Cooler',
    }, {
      value: 'Air Purifier',
      label: 'Air Purifier',
    }, {
      value: 'Dehumidier',
      label: 'Dehumidier',
    }, {
      value: 'Humidifier',
      label: 'Humidifier',
    }]
  }, {
    value: 'Vaccum & Floor Care',
    label: 'Vaccum & Floor Care',
    children: [{
      value: 'Vacuum Cleaner',
      label: 'Vacuum Cleaner',
    }, {
      value: 'Floor Polisher',
      label: 'Floor Polisher',
    }, {
      value: 'Vacuum Cleaner Parts',
      label: 'Vacuum Cleaner Parts',
    }]
  }, {
    value: 'Iron & Garment Care',
    label: 'Iron & Garment Care',
    children: [{
      value: 'Irons',
      label: 'Irons',
    }, {
      value: 'Garment Steamers',
      label: 'Garment Steamers',
    }, {
      value: 'Sewing Machine',
      label: 'Sewing Machine',
    }]
  }, {
    value: 'Personal Care Allpiances',
    label: 'Personal Care Allpiances',
    children: [{
      value: 'Hair Dryer & Styling',
      label: 'Hair Dryer & Styling',
    }, {
      value: 'Grooming Appliances',
      label: 'Grooming Appliances',
    }, {
      value: 'Air Purifier',
      label: 'Air Purifier',
    }]
  }]
}, {
  value: 'Health',
  label: 'Health & Beauty',
  children: [{
    value: 'Bath & Body',
    label: 'Bath & Body',
    children: [{
      value: 'BodyMassage',
      label: 'Body & Massage Oils'
    }, {
      value: 'BodySoaps',
      label: 'Body  Soaps & Shower Gels',
    }]
  }, {
    value: 'Beauty Tools',
    label: 'Beauty Tools',
    children: [{
      value: 'CurlingIrons',
      label: 'Curling Irons & Wands',
    }, {
      value: 'FlatIrons',
      label: 'Flat Irons',
    }]
  }, {
    value: 'Fragrances',
    label: 'Fragrances',
    children: [{
      value: 'Women Fragrances',
      label: 'Women Fragrances',
    }, {
      value: 'Men Fragrances',
      label: 'Men Fragrances',
    }, {
      value: 'Unisex',
      label: 'Unisex',
    }]
  }, {
    value: 'HairCare',
    label: 'Hair Care',
    children: [{
      value: 'Shampoo',
      label: 'Shampoo',
    }, {
      value: 'Hair Treatments',
      label: 'Hait Treatments',
    }, {
      value: 'Hair Accessories',
      label: 'Hair Accessories',
    }]
  }, {
    value: 'Makeup',
    label: 'Makeup',
    children: [{
      value: 'Makeup',
      label: 'Makeup',

    }]
  }, {
    value: 'Mens Care',
    label: 'Mens Care',
    children: [{
      value: 'Mens Care',
      label: 'Mens Care',

    }]
  }, {
    value: 'Personal Care',
    label: 'Personal Care',
    children: [{
      value: 'Personal Care',
      label: 'Personal Care',

    }]
  }, {
    value: 'Skin Care',
    label: 'Skin Care',
    children: [{
      value: 'Skin Care',
      label: 'Skin Care',

    }]
  }]
}, {
  value: 'Babies',
  label: 'Babies & Toys',
  children: [{
    value: 'Feeding',
    label: 'Feeding',
    children: [{
      value: 'Utensils',
      label: 'Utensils',
    }, {
      value: 'Bottle-Feeding',
      label: 'Bottle-Feeding',
    }]
  }, {
    value: 'Baby Gear',
    label: 'Baby Gear',
    children: [{
      value: 'Kids Bag',
      label: 'Kids Bag',
    }, {
      value: 'Swings, Jumpers & Bouncers',
      label: 'Swings, Jumpers & Bouncers',
    }]
  }, {
    value: 'Baby toddler Toys',
    label: 'Baby toddler Toys',
    children: [{
      value: 'Activity Gym & Playmats',
      label: 'Activity Gym & Playmats',
    }, {
      value: 'Bath Toys',
      label: 'Bath Toys',
    }, {
      value: 'Building Blocks Toys',
      label: 'Building Blocks Toys',
    }, {
      value: 'Crib Toys & Attachmensts',
      label: 'Crib Toys & Attachmensts',
    }, {
      value: 'Early Development Toys',
      label: 'Early Development Toys',
    }, {
      value: 'Music & Sounds',
      label: 'Music & Sounds',
    }, {
      value: 'Ratlles',
      label: 'Ratlles',
    }, {
      value: 'Push & Pull Toys',
      label: 'Push & Pull Toys',
    }]
  }, {
    value: 'Remote Control & Vehicles',
    label: 'Remote Control & Vehicles',
    children: [{
      value: 'Die-Cast Vehicles',
      label: 'Die-Cast Vehicles',
    }, {
      value: 'Drones & Accessories',
      label: 'Drones & Accessories',
    }, {
      value: 'Play Trains & Railway Sets',
      label: 'Play Trains & Railway Sets',
    }, {
      value: 'Play Vehicles',
      label: 'Play Vehicles',
    }, {
      value: 'RC Vehicles & Batteries',
      label: 'RC Vehicles & Batteries',
    }]
  }, {
    value: 'Sports & Outdoor Play',
    label: 'Sports & Outdoor Play',
    children: [{
      value: 'Inflatable Bouncers',
      label: 'Inflatable Bouncers',
    }, {
      value: 'Swimming Pool &  Water Toys',
      label: 'Swimming Pool &  Water Toys',
    }, {
      value: 'Fidget Spinners',
      label: 'Fidget Spinners',
    }]
  }, {
    value: 'Milk Formula',
    label: 'Milk Formula',
    children: [{
      value: 'Growing-up Milk (3yrs +)',
      label: 'Growing-up Milk (3yrs +)',
    }, {
      value: 'Toddler Milk (1 - under 3yrs)',
      label: 'Toddler Milk (1 - under 3yrs)',
    }, {
      value: 'Maternal',
      label: 'Maternal',
    }, {
      value: 'Baby Fromula',
      label: 'Baby Fromula',
    }]
  }, {
    value: 'Diapering & Potty',
    label: 'Diapering & Potty',
    children: [{
      value: 'Disposable diapers',
      label: 'Disposable diapers',
    }, {
      value: 'Diaper Bags',
      label: 'Diaper Bags',
    }, {
      value: 'Wipes & Holders',
      label: 'Wipes & Holders',
    }, {
      value: 'Changing Tables, Pads & Kits',
      label: 'Changing Tables, Pads & Kits',
    }, {
      value: 'Diapering Care',
      label: 'Diapering Care',
    }, {
      value: 'Cloth Diapers & Accessories',
      label: 'Cloth Diapers & Accessories',
    }, {
      value: 'Potty Training',
      label: 'Potty Training',
    }]
  }, {
    value: 'Nursery',
    label: 'Nursery',
    children: [{
      value: 'Baby Furniture',
      label: 'Baby Furniture',
    }, {
      value: 'Mattresses & Bedding',
      label: 'Mattresses & Bedding',
    }, {
      value: 'Storage & Organization',
      label: 'Storage & Organization',
    }]
  }, {
    value: 'Baby Personal Care',
    label: 'Baby Personal Care',
    children: [{
      value: 'Skin Care',
      label: 'Skin Care',
    }, {
      value: 'Bathing Tubs & Seats',
      label: 'Bathing Tubs & Seats',
    }, {
      value: 'Soap, Cleanser & Bodywash',
      label: 'Soap, Cleanser & Bodywash',
    }, {
      value: 'Baby Groomings & Care Kits',
      label: 'Baby Groomings & Care Kits',
    }, {
      value: 'Gromming & Healthcare Kits',
      label: 'Gromming & Healthcare Kits',
    }, {
      value: 'Toothbrushes & Toothpaste',
      label: 'Toothbrushes & Toothpaste',
    }, {
      value: 'Shampoo & Conditioners',
      label: 'Shampoo & Conditioners',
    }, {
      value: 'Washcloths & Towels',
      label: 'Washcloths & Towels',
    }, {
      value: 'Baby Bath Mats',
      label: 'Baby Bath Mats',
    }]
  }, {
    value: 'Clothing & Accessories',
    label: 'Clothing & Accessories',
    children: [{
      value: 'New Born Unisex (0 - 6 mnths)',
      label: 'New Born Unisex (0 - 6 mnths)',
    }, {
      value: 'New born bodysuits',
      label: 'New born bodysuits',
    }, {
      value: 'New born sets & Packs',
      label: 'New born sets & Packs',
    }, {
      value: 'Girls Clothing',
      label: 'Girls Clothing',
    }, {
      value: 'Boys Clothing',
      label: 'Boys Clothing',
    }]
  }, {
    value: 'Toys & Games',
    label: 'Toys & Games',
    children: [{
      value: 'Action Figures & Collectibles',
      label: 'Action Figures & Collectibles',
    }, {
      value: 'Arts & Craft for Kids',
      label: 'Arts & Craft for Kids',
    }, {
      value: 'Blocks and Building toys',
      label: 'Blocks and Building toys',
    }, {
      value: 'Dolls & Accesssories',
      label: 'Dolls & Accesssories',
    }, {
      value: 'Learning & Education',
      label: 'Learning & Education',
    }, {
      value: 'Puzzle & Board Games',
      label: 'Puzzle & Board Games',
    }, {
      value: 'Slime',
      label: 'Slime & Squishy Toys',
    }, {
      value: 'Stuffed',
      label: 'Stuffed Toys',
    }, {
      value: 'Pretend',
      label: 'Pretend Play',
    }]
  }]
}, {
  value: 'Groceries',
  label: 'Groceries & Pets',
  children: [{
    value: 'Fresh Produce',
    label: 'Fresh Produce',
    children: [{
      value: 'Fresh',
      label: 'Fresh Vegetables',
    }, {
      value: 'FreshFruits',
      label: 'FreshFruits',
    }]
  }, {
    value: 'Beverages',
    label: 'Beverages',
    children: [{
      value: 'Coffee',
      label: 'Coffee',
    }, {
      value: 'Tea',
      label: 'Tea',
    }, {
      value: 'HotChocolate',
      label: 'Hot Chocolate Drinks',
    }, {
      value: 'UHTMilk',
      label: 'UHT, Milk & Milk Powder',
    }, {
      value: 'PowderedMixes',
      label: 'Powdered Drink Mixes',
    }, {
      value: 'FlavoringSyrups',
      label: 'Flavoring Syrups',
    }, {
      value: 'Water',
      label: 'Water',
    }, {
      value: 'SoftDrinks',
      label: 'Soft Drinks',
    }, {
      value: 'Juices',
      label: 'Juices',
    }]
  }, {
    value: 'Breakfast, Choco & Snacks',
    label: 'Breakfast, Choco & Snacks',
    children: [{
      value: 'Biscuits',
      label: 'Biscuits',
    }, {
      value: 'BreakfastCereals',
      label: 'Breakfast Cereals',
    }, {
      value: 'Chocolate',
      label: 'Chocolate',
    }, {
      value: 'Nuts',
      label: 'Nuts',
    }, {
      value: 'Oatmeals',
      label: 'Oatmeals',
    }, {
      value: 'BreakfastBars',
      label: 'Breakfast Bars',
    }, {
      value: 'Snacks',
      label: 'Snacks',
    }, {
      value: 'InstantBreakfast',
      label: 'Instant Breakfast Drinks',
    }, {
      value: 'JamsHoney',
      label: 'Jams, Honey & Spread',
    }, {
      value: 'PancakeWaffle',
      label: 'Pancake & Waffle Mixes',
    }]
  }, {
    value: 'Food Staples',
    label: 'Food Staples',
    children: [{
      value: 'CannedFood',
      label: 'Canned Food',
    }, {
      value: 'CondimentDressing',
      label: 'Condiment Dressing',
    }, {
      value: 'CookingIngredients',
      label: 'Cooking Ingredients',
    }, {
      value: 'GrainsBeans',
      label: 'Grains, Beans & Pulses',
    }, {
      value: 'HomeBaking',
      label: 'Home Baking & Sugar',
    }, {
      value: 'InstantReady',
      label: 'Instant & Ready-to-Eat',
    }, {
      value: 'JarredFood',
      label: 'Jarred Food',
    }, {
      value: 'Nooddles',
      label: 'Nooddles',
    }, {
      value: 'Rice',
      label: 'Rice',
    }, {
      value: 'Oil',
      label: 'Oil',
    }]
  }, {
    value: 'Dairy & Chilled',
    label: 'Dairy & Chilled',
    children: [{
      value: 'Dairy & Chilled',
      label: 'Dairy & Chilled',

    }]
  }, {
    value: 'Laundary & Household',
    label: 'Laundary & Household',
    children: [{
      value: 'AirCare',
      label: 'AirCare',
    }, {
      value: 'Cleaning',
      label: 'Cleaning',
    }, {
      value: 'Dishwashing',
      label: 'Dishwashing',
    }, {
      value: 'Laundary',
      label: 'Laundary',
    }, {
      value: 'PestControl',
      label: 'Pest Control',
    }, {
      value: 'Paper',
      label: 'Paper',
    }]
  }, {
    value: 'Cat',
    label: 'Cat',
    children: [{
      value: 'Food',
      label: 'Food',
    }, {
      value: 'BedsMats',
      label: 'Beds, Mats & Houses',
    }, {
      value: 'CarriersTravel',
      label: 'Carriers & Travel',
    }, {
      value: 'Grooming',
      label: 'Grooming',
    }, {
      value: 'LitterToilet',
      label: 'Litter & Toilet',
    }, {
      value: 'Toys',
      label: 'Toys',
    }, {
      value: 'CatTreats',
      label: 'Cat Treats',
    }, {
      value: 'TreesCondos',
      label: 'Trees, Condos & Scratches',
    }, {
      value: 'BowlsFeeders',
      label: 'Bowls & Feeders',
    }, {
      value: 'CagesCrates',
      label: 'Cages, Crates & Doors',
    }]
  }, {
    value: 'Dog',
    label: 'Dog',
    children: [{
      value: 'Food',
      label: 'Food',
    }, {
      value: 'BedsMats',
      label: 'Beds, Mats & Houses',
    }, {
      value: 'CarriersTravel',
      label: 'Carriers & Travel',
    }, {
      value: 'Grooming',
      label: 'Grooming',
    }, {
      value: 'LeashesCollars',
      label: 'Leashes, Collars & Muzzles',
    }, {
      value: 'Toys',
      label: 'Toys',
    }, {
      value: 'Treats',
      label: 'Treats',
    }, {
      value: 'FleasTicks',
      label: 'Fleas & Ticks',
    }, {
      value: 'BowlsFeeders',
      label: 'Bowls & Feeders',
    }, {
      value: 'CagesCrates',
      label: 'Cages, Crates & Doors',
    }]
  }, {
    value: 'Fish',
    label: 'Fish',
    children: [{
      value: 'AquariumTemp',
      label: 'Aquarium Temp Control',
    }, {
      value: 'Food',
      label: 'Food',
    }, {
      value: 'Aquariums',
      label: 'Aquariums',
    }, {
      value: 'AquariumCleaning',
      label: 'Aquarium Cleaning Tools',
    }, {
      value: 'AquariumFilters',
      label: 'Aquarium Filters',
    }, {
      value: 'AquariumLighting',
      label: 'Aquarium Lighting',
    }, {
      value: 'AquariumWaterpumps',
      label: 'Aquarium Water Pumps',
    }, {
      value: 'AquariumDecorations',
      label: 'Aquarium Decorations',
    }, {
      value: 'StarterKits',
      label: 'Starter Kits',
    }, {
      value: 'AquariumAir',
      label: 'Aquarium Air Pumps',
    }]
  }, {
    value: 'Frozen',
    label: 'Frozen',
    children: [{
      value: 'BreadBagels',
      label: 'Bread, Bagels & Pancakes',
    }, {
      value: 'ConvenienceFoods',
      label: 'Convenience Foods',
    }, {
      value: 'FrozenDesserts',
      label: 'Frozen Desserts',
    }, {
      value: 'IceCreams',
      label: 'Ice Creams',
    }, {
      value: 'Meat',
      label: 'Meat',
    }, {
      value: 'MockMeat',
      label: 'Mock Meat & Seafood',
    }, {
      value: 'Seafood',
      label: 'Seafood',
    }, {
      value: 'VegetablesFruits',
      label: 'Vegetables & Fruits',
    }]
  }]
}, {
  value: 'Home',
  label: 'Home & Lifestyle',
  children: [{
    value: 'Bath',
    label: 'Bath',
    children: [{
      value: 'BathMats',
      label: 'BathMats',
    }, {
      value: 'Bath Towels',
      label: 'Bath Towels',
    }, {
      value: 'Bathrobes',
      label: 'Bathrobes',
    }, {
      value: 'BathroomScales',
      label: 'Bathroom Scales',
    }, {
      value: 'BathroomShelving',
      label: 'Bathroom Shelving',
    }, {
      value: 'ShowerCaddies',
      label: 'Shower Caddies & Hangers',
    }, {
      value: 'ShowerCurtains',
      label: 'Shower Curtains',
    }, {
      value: 'TowelRails',
      label: 'Towel Rails & Warmers',
    }]
  }, {
    value: 'Bedding',
    label: 'Bedding',
    children: [{
      value: 'BedSheets',
      label: 'Bed Sheets',
    }, {
      value: 'BeddingAccessories',
      label: 'Bedding Accessories',
    }, {
      value: 'BlanketThrows',
      label: 'Blanket & Throws',
    }, {
      value: 'ComfortersDuvets',
      label: 'Comforters, Quilts & Duvets',
    }, {
      value: 'Mattress',
      label: 'Mattress Protectors',
    }, {
      value: 'PillowCases',
      label: 'Pillow Cases',
    }, {
      value: 'PillowsBolsters',
      label: 'Pillows & Bolsters',
    }]
  }, {
    value: 'Decor',
    label: 'Decor',
    children: [{
      value: 'Artificial',
      label: 'Artificial Flowers & Plants',
    }, {
      value: 'Candles',
      label: 'Candles & Candleholders',
    }, {
      value: 'Clocks',
      label: 'Clocks',
    }, {
      value: 'Curtains',
      label: 'Curtains',
    }, {
      value: 'Cushions',
      label: 'Cushion & Covers',
    }, {
      value: 'Mirrors',
      label: 'Mirrors',
    }, {
      value: 'PictureFrame',
      label: 'Picture Frames',
    }, {
      value: 'RugsCarpets',
      label: 'Rugs & Carpets',
    }, {
      value: 'Vases',
      label: 'Vases & Vessels',
    }, {
      value: 'Wall Stickers',
      label: 'Wall Stickers & Decals',
    }]
  }, {
    value: 'Furniture',
    label: 'Furniture',
    children: [{
      value: 'Bedroom',
      label: 'Bedroom',
    }, {
      value: 'GamingFurniture',
      label: 'Gaming Furniture',
    }, {
      value: 'HomeOffice',
      label: 'Home Office',
    }, {
      value: 'KitchenDining',
      label: 'Kitchen & Dining',
    }, {
      value: 'LivingRoom',
      label: 'Living Room',
    }]
  }, {
    value: 'Kitchen & Dining',
    label: 'Kitchen & Dining',
    children: [{
      value: 'Bakeware',
      label: 'Bakeware',
    }, {
      value: 'CoffeTea',
      label: 'Coffee & Tea',
    }, {
      value: 'Cookware',
      label: 'Cookware',
    }, {
      value: 'Dinnerware',
      label: 'Dinnerware',
    }, {
      value: 'Drinkware',
      label: 'Drinkware',
    }, {
      value: 'KitchenTable',
      label: 'Kitchen & Table Linen',
    }, {
      value: 'KitchenStorage',
      label: 'Kitchen Storage & Accessories',
    }, {
      value: 'KitchenUtensils',
      label: 'Kitchen Utensils',
    }, {
      value: 'KnivesAccessories',
      label: 'Knives & Accessories',
    }, {
      value: 'Serveware',
      label: 'Serveware',
    }]
  }, {
    value: 'Lighting',
    label: 'Lighting',
    children: [{
      value: 'CielingLights',
      label: 'Cieling Lights',
    }, {
      value: 'FloorLamps',
      label: 'Floor Lamps',
    }, {
      value: 'LampsShades',
      label: 'Lamps Shades',
    }, {
      value: 'LightBulbs',
      label: 'Light Bulbs',
    }, {
      value: 'LightingFixtures',
      label: 'Lighting Fixtures & Components',
    }, {
      value: 'OutdoorLigthing',
      label: 'Outdoor Ligthing',
    }, {
      value: 'RechargeableFlashlighs',
      label: 'Rechargeable & Flashlighs',
    }, {
      value: 'TableLamps',
      label: 'Table Lamps',
    }, {
      value: 'WallLights',
      label: 'Wall Lights & Sconces',
    }]
  }, {
    value: 'Laundary & Cleaning',
    label: 'Laundary & Cleaning',
    children: [{
      value: 'BrushesSponges',
      label: 'Brushes, Sponges & Wipers',
    }, {
      value: 'BroomsMops',
      label: 'Brooms, Maps & Sweepers',
    }, {
      value: 'LaundaryBasket',
      label: 'Laundary Baskets &hampers',
    }, {
      value: 'ClothesLines',
      label: 'Clothes Line & Drying Racks',
    }, {
      value: 'IroningBoards',
      label: 'Ironing Boards',
    }]
  }, {
    value: 'Tools, DIY & Outdoor',
    label: 'Tools, DIY & Outdoor',
    children: [{
      value: 'FixruresPlumbing',
      label: 'Fixtures & Plumbing',
    }, {
      value: 'Electrical',
      label: 'Electrical',
    }, {
      value: 'HandTools',
      label: 'Hand Tools',
    }, {
      value: 'PowerTools',
      label: 'Power Tools',
    }, {
      value: 'Security',
      label: 'Security',
    }, {
      value: 'LawnGarden',
      label: 'Lawn & Garden',
    }]
  }, {
    value: 'Stationary & Craft',
    label: 'Stationary & Craft',
    children: [{
      value: 'ArtSupplies',
      label: 'Art Supplies',
    }, {
      value: 'GiftWrapping',
      label: 'Gift & Wrapping',
    }, {
      value: 'PackagingCartoons',
      label: 'Packaging & Cartoons',
    }, {
      value: 'PaperProducts',
      label: 'Paper Products',
    }, {
      value: 'SchoolOffice',
      label: 'School & Office Equipment',
    }, {
      value: 'WritingCorrection',
      label: 'Writing & Correction',
    }, {
      value: 'SchoolUniforms',
      label: 'School Uniforms',
    }]
  }, {
    value: 'Media, Music & Books',
    label: 'Media, Music & Books',
    children: [{
      value: 'Books',
      label: 'Books',
    }, {
      value: 'eBooks',
      label: 'eBooks',
    }, {
      value: 'Magazines',
      label: 'Magazines',
    }, {
      value: 'MusicalInstruments',
      label: 'Musical Instruments',
    }]
  }, {
    value: 'Charity & Donation',
    label: 'Charity & Donation',
    children: [{
      value: 'DonateHealthcare',
      label: 'Donate to Healthcare',
    }, {
      value: 'DonateShelter',
      label: 'Donate to Shelter',
    }, {
      value: 'DonateEducate',
      label: 'Donate to Educate',
    }, {
      value: 'Others',
      label: 'Other',
    }, {
      value: 'Zakat',
      label: 'Zakat',
    }]
  }]
}, {
  value: 'Womens',
  label: 'Womens Fashion',
  children: [{
    value: 'Unstitched Fabric',
    label: 'Unstitched Fabric',
    children: [{
      value: 'Branded',
      label: 'Branded Unstitched',
    }]
  }, {
    value: 'Kurtas & Shalwar Kameez',
    label: 'Kurtas & Shalwar Kameez',
    children: [{
      value: 'Kurtis',
      label: 'Kurtis',
    }, {
      value: 'ShalwarKameez',
      label: 'Shalwar Kameez',
    }, {
      value: 'Pret',
      label: 'Branded Pret',
    }]
  }, {
    value: 'Traditional Clothing',
    label: 'Traditional Clothing',
    children: [{
      value: 'Formalwear',
      label: 'Formal Wear',
    }, {
      value: 'Pants,plazzo',
      label: 'Pants, Palazzos & Capris',
    }, {
      value: 'Duppatas',
      label: 'Duppatas, Stoles & Shawls',
    }, {
      value: 'Abaya',
      label: 'Abaya & Hijabs',
    }]
  }, {
    value: 'Tops',
    label: 'Tops',
    children: [{
      value: 'Blouses',
      label: 'Blouses & Shirts',
    }, {
      value: 'Tunics',
      label: 'Tunics',
    }, {
      value: 'T-shirts',
      label: 'T-Shirts',

    }]
  }, {
    value: 'Bras, Panties & Lingerie',
    label: 'Bras, Panties & Lingerie',
    children: [{
      value: 'Bras',
      label: 'Bras',
    }, {
      value: 'Panties',
      label: 'Panties',
    }, {
      value: 'Lingerie',
      label: 'Lingerie Sets',
    }, {
      value: 'Beachwear',
      label: 'Beachwear & Biknis',
    }]
  }, {
    value: 'Sleepwear & Innerwear',
    label: 'Sleepwear & Innerwear',
    children: [{
      value: 'Nightwear',
      label: 'Nightwear',
    }, {
      value: 'Robe',
      label: 'Robe & Gown sets',
    }, {
      value: 'Tanks',
      label: 'Tanks & Camisoles',
    }, {
      value: 'Shapewear',
      label: 'Shapewear',
    }]
  }, {
    value: 'Pants, Jeans & Legging',
    label: 'Pants, Jeans & Legging',
    children: [{
      value: 'Pants',
      label: 'Pants',
    }, {
      value: 'Leggings',
      label: 'Leggings',
    }, {
      value: 'Jeans',
      label: 'Jeans',
    }, {
      value: 'Shorts',
      label: 'Shorts',
    }]
  }, {
    value: 'Dresses & Skirts',
    label: 'Dresses & Skirts',
    children: [{
      value: 'Dresses',
      label: 'Dresses',
    }, {
      value: 'WesternDresses',
      label: 'Western Dresses',
    }, {
      value: 'Skirts',
      label: 'Skirts',
    }]
  }, {
    value: 'Winter Clothing',
    label: 'Winter Clothing',
    children: [{
      value: 'JacketCoats',
      label: 'Jacket & Coats',
    }, {
      value: 'HoodiesSweater',
      label: 'Hoodies & Sweatshirts',
    }, {
      value: 'SweaterCardigans',
      label: 'Sweaters & Cardigans',
    }, {
      value: 'ShawlsandPonchos',
      label: 'Shawls and Ponchos',
    }, {
      value: 'Shrugs',
      label: 'Shrugs',
    }]
  }, {
    value: 'Bags',
    label: 'Bags',
    children: [{
      value: 'Top-handle',
      label: 'Top-Handle Bags',
    }, {
      value: 'Cross-body',
      label: 'Cross Body & Shoulder Bags',
    }, {
      value: 'ToteBags',
      label: 'Tote Bags',
    }, {
      value: 'Clutches',
      label: 'Clutches',
    }, {
      value: 'WalletsAccessories',
      label: 'Wallets and Accessories',
    }, {
      value: 'Wristlets',
      label: 'Wristlets',
    }, {
      value: 'Backpacks',
      label: 'Backpacks',
    }]
  }, {
    value: 'Accessories',
    label: 'Accessories',
    children: [{
      value: 'Scarves',
      label: '',
    }, {
      value: 'Belts',
      label: 'Belts',
    }, {
      value: 'SocksandTights',
      label: 'Socks & Tights',
    }, {
      value: 'Gloves',
      label: 'Gloves',
    }, {
      value: 'HairAccessories',
      label: 'Hair Accessories',
    }, {
      value: 'HatsCaps',
      label: 'Hats & Caps',
    }]
  }, {
    value: 'Shoes',
    label: 'Shoes',
    children: [{
      value: 'Sandles',
      label: 'Sandles',
    }, {
      value: 'FlatShoes',
      label: 'Flat Shoes',
    }, {
      value: 'Heels',
      label: 'Heels',
    }, {
      value: 'Khusakolapuri',
      label: 'Khusa & kolapuri',
    }, {
      value: 'Slides',
      label: 'Slides & Flip Flops',
    }, {
      value: 'Wedges',
      label: 'Wedges',
    }, {
      value: 'Sneakers',
      label: 'Sneakers',
    }, {
      value: 'Boots',
      label: 'Boots',
    }]
  }]
}, {
  value: 'Mens',
  label: 'Mens Fashion',
  children: [{
    value: 'T-Shirts',
    label: 'T-Shirts',
    children: [{
      value: 'T-Shirts',
      label: 'T-Shirts',

    }]
  }, {
    value: 'Shirts',
    label: 'Shirts',
    children: [{
      value: 'CasualShirts',
      label: 'Casual Shirts',
    }, {
      value: 'FormalShirts',
      label: 'Formal Shirts',
    }]
  }, {
    value: 'Polo',
    label: 'Polo',
    children: [{
      value: 'Polo',
      label: 'Polo',

    }]
  }, {
    value: 'Pants & Suits',
    label: 'Pants & Suits',
    children: [{
      value: 'Chinos',
      label: 'Chinos',
    }, {
      value: 'Cargo',
      label: 'Cargo',
    }, {
      value: 'Suits',
      label: 'Suits',
    }]
  }, {
    value: 'Shorts',
    label: 'Shorts',
    children: [{
      value: 'Shorts',
      label: 'Shorts',

    }]
  }, {
    value: 'Kurtas & Shalwar Kameez',
    label: 'Kurtas & Shalwar Kameez',
    children: [{
      value: 'UnstitchedFabrics',
      label: 'Unstitched Fabrics',
    }, {
      value: 'Kurta',
      label: 'Kurta',
    }, {
      value: 'Shalwar',
      label: 'Shalwar',
    }, {
      value: 'Shawls',
      label: 'Shawls',
    }]
  }, {
    value: 'Winter Clothing',
    label: 'Winter Clothing',
    children: [{
      value: 'Jackets',
      label: 'Jackets & Coats',
    }, {
      value: 'Hoodies',
      label: 'Hoodies',
    }, {
      value: 'Sweaters',
      label: 'Sweater & Cardigans',
    }]
  }, {
    value: 'Inner Wear',
    label: 'Inner Wear',
    children: [{
      value: 'Briefs',
      label: 'Briefs',
    }, {
      value: 'Trunks',
      label: 'Trunks & Boxers',
    }, {
      value: 'Nightwear',
      label: 'Nightwear',
    }, {
      value: 'Vest',
      label: 'Vest',
    }, {
      value: 'Socks',
      label: 'Socks',
    }, {
      value: 'Thermal',
      label: 'Thermal',
    }]
  }, {
    value: 'Shoes',
    label: 'Shoes',
    children: [{
      value: 'SlipsOn',
      label: 'Slips-Ons & Loafer ',
    }, {
      value: 'Flip-flop',
      label: 'Flip Flops & Sandals',
    }, {
      value: 'Sneakers',
      label: 'Sneakers',
    }, {
      value: 'FormalShoes',
      label: 'Formal Shoes',
    }, {
      value: 'Boots',
      label: 'Boots',
    }, {
      value: 'Khusa',
      label: 'Khusa & Kolapuri',
    }, {
      value: 'ShoesAccessories',
      label: 'Shoes Accessories',
    }]
  }, {
    value: 'Accessories',
    label: 'Accessories',
    children: [{
      value: 'Belts',
      label: 'Belts',
    }, {
      value: 'Hats',
      label: 'Hats',
    }, {
      value: 'Ties',
      label: 'Ties & Bow Ties',
    }, {
      value: 'Scarves',
      label: 'Scarves',
    }, {
      value: 'Gloves',
      label: 'Gloves',
    }]
  }, {
    value: 'Jeans & Sweatpants',
    label: 'Jeans & Sweatpants',
    children: [{
      value: 'Jeans',
      label: 'Jeans',
    }, {
      value: 'Joggers',
      label: 'Joggers & Sweats',
    }]
  }, {
    value: 'Bags',
    label: 'Bags',
    children: [{
      value: 'Wallets',
      label: 'Wallets & Accessories',
    }, {
      value: 'CardHolder',
      label: 'Card Holder/Key Chains',
    }, {
      value: 'Crossbody',
      label: 'Crossbody Bags',
    }, {
      value: 'Backs',
      label: 'Backs',
    }, {
      value: 'Businessbags',
      label: 'Business Bags',
    }, {
      value: 'Messenger',
      label: 'Messenger Backs',
    }]
  }]
}, {
  value: 'Watches',
  label: 'Watches & Jewellery',
  children: [{
    value: 'Mens Watches',
    label: 'Mens Watches',
    children: [{
      value: 'Chornograph',
      label: 'Chornograph',
    }, {
      value: 'BrandedWatches',
      label: 'Branded Watches',
    }, {
      value: 'Analog',
      label: 'Analog',
    }, {
      value: 'Digital',
      label: 'Digital',
    }, {
      value: 'Accessories',
      label: 'Accessories',
    }]
  }, {
    value: 'Womens Watches',
    label: 'Womens Watches',
    children: [{
      value: 'Chornograph',
      label: 'Chornograph',
    }, {
      value: 'BrandedWatches',
      label: 'Branded Watches',
    }, {
      value: 'Analog',
      label: 'Analog',
    }, {
      value: 'Digital',
      label: 'Digital',
    }, {
      value: 'Accessories',
      label: 'Accessories',
    }]
  }, {
    value: 'Kids Watches',
    label: 'Kids Watches',
    children: [{
      value: 'Boys',
      label: 'Boys',
    }, {
      value: 'Girls',
      label: 'Girls',
    }]
  }, {
    value: 'Mens Jewellery',
    label: 'Mens Jewellery',
    children: [{
      value: 'FashionJewellery',
      label: 'Fashion Jewellery',
    }, {
      value: 'FineJewellery',
      label: 'Fine Jewellery',
    }, {
      value: 'Rings',
      label: 'Rings',
    }, {
      value: 'Chains',
      label: 'Chains',
    }, {
      value: 'Bracelets',
      label: 'Bracelets',
    }, {
      value: 'Studs',
      label: 'Studs',
    }, {
      value: 'Pendants',
      label: 'Pendants',
    }]
  }, {
    value: 'Womens Jewellery',
    label: 'Womens Jewellery',
    children: [{
      value: 'FashionJewellery',
      label: 'Fashion Jewellery',
    }, {
      value: 'FineJewellery',
      label: 'Fine Jewellery',
    }, {
      value: 'Rings',
      label: 'Rings',
    }, {
      value: 'Earrings',
      label: 'Earrings',
    }, {
      value: 'Necklaces',
      label: 'Necklaces',
    }, {
      value: 'Bracelets',
      label: 'Bracelets',
    }, {
      value: 'Ankelets',
      label: 'Ankelets',
    }, {
      value: 'JewellerySets',
      label: 'Jewellery Sets',
    }]
  }, {
    value: 'Sunglasses',
    label: 'Sunglasses',
    children: [{
      value: 'MensSunglasses',
      label: 'Mens Sunglasses',
    }, {
      value: 'WomensSunglasses',
      label: 'Womens Sunglasses',
    }, {
      value: 'UnisexSunglasses',
      label: 'Unisex Sunglasses',
    }, {
      value: 'KidsSunglasses',
      label: 'Kids Sunglasses',
    }]
  }, {
    value: 'Eyeglasses',
    label: 'Eyeglasses',
    children: [{
      value: 'MensEyelasses',
      label: 'Mens Eyeglasses',
    }, {
      value: 'WomensEyeglasses',
      label: 'Womens Eyeglasses',
    }, {
      value: 'Unisex',
      label: 'Unisex ',
    }, {
      value: 'Kids',
      label: 'Kids ',
    }]
  }, {
    value: 'Lenses',
    label: 'Lenses',
    children: [{
      value: 'Lenses',
      label: 'Lenses',

    }]
  }]
}, {
  value: 'Sports',
  label: 'Sports & Outdoor',
  children: [{
    value: 'Exercise & Fitness',
    label: 'Exercise & Fitness',
    children: [{
      value: 'CardioTraining',
      label: 'Cardio Training Equipment',
    }, {
      value: 'StrengthTraining',
      label: 'Strength Training Equipments',
    }, {
      value: 'FitnessAccessories',
      label: 'Fitness Accessories',
    }, {
      value: 'Boxing',
      label: 'Boxing, Martial Arts & MMA',
    }, {
      value: 'Weight',
      label: 'Weight',
    }, {
      value: 'Yoga',
      label: 'Yoga',
    }]
  }, {
    value: 'Supplements, Sports Nutiriton',
    label: 'Supplements, Sports Nutiriton',
    children: [{
      value: 'Proteins',
      label: 'Proteins',
    }, {
      value: 'PostWorkout',
      label: 'Post Workout & Recovery',
    }, {
      value: 'PreWorkout',
      label: 'Pre Workout',
    }, {
      value: 'FatBurners',
      label: 'Fat Burners',
    }]
  }, {
    value: 'Shoes & Clothing',
    label: 'Shoes & Clothing',
    children: [{
      value: 'MensShoes',
      label: 'Mens Shoes',
    }, {
      value: 'MensClothing',
      label: 'Mens Clothing',
    }, {
      value: 'MensAccessories',
      label: 'Mens Accessories',
    }, {
      value: 'MensBags',
      label: 'Mens Bags',
    }, {
      value: 'WomensShoes',
      label: 'Womens Shoes',
    }, {
      value: 'WomensClothing',
      label: 'Womens Clothing',
    }, {
      value: 'WomensAccessories',
      label: 'Womens Accessories',
    }, {
      value: 'WomensBags',
      label: 'Womens Bags',
    }]
  }, {
    value: 'Team Sports',
    label: 'Team Sports',
    children: [{
      value: 'Cricket',
      label: 'Cricket',
    }, {
      value: 'Football',
      label: 'Football',
    }, {
      value: 'Hockey',
      label: 'Hockey',
    }, {
      value: 'BasketBall',
      label: 'Basket Ball',
    }, {
      value: 'VolleyBalls',
      label: 'Volley Balls',
    }, {
      value: 'Baseballs',
      label: 'Baseballs',
    }]
  }, {
    value: 'Packet Sports',
    label: 'Packet Sports',
    children: [{
      value: 'Badminton',
      label: 'Badminton',
    }, {
      value: 'Tennis',
      label: 'Tennis',
    }, {
      value: 'Squash',
      label: 'Squash',
    }]
  }, {
    value: 'Outdoor Sports',
    label: 'Outdoor Sports',
    children: [{
      value: 'Cycling',
      label: 'Cycling',
    }, {
      value: 'Cycle Accessories',
      label: 'Cycle Accessories',
    }, {
      value: 'Camping',
      label: 'Camping / Hiking',
    }, {
      value: 'Other',
      label: 'Other Activities',
    }, {
      value: 'WaterSports',
      label: 'Water Sports',
    }, {
      value: 'Fishing',
      label: 'Fishing',
    }, {
      value: 'Skateboards',
      label: 'Skate Boards',
    }]
  }, {
    value: 'Fitness Gadgets',
    label: 'Fitness Gadgets',
    children: [{
      value: 'Fitnessbands',
      label: 'Fitness Bands',
    }]
  }, {
    value: 'Sports Accessories',
    label: 'Sports Accessories',
    children: [{
      value: 'WaterBottles',
      label: 'Water Bottles',
    }, {
      value: 'HomeGym',
      label: 'Home Gym',
    }]
  }]
}, {
  value: 'Automotive',
  label: 'Automotive & Motorbike',
  children: [{
    value: 'Automotive',
    label: 'Automotive',
    children: [{
      value: 'AutoTires',
      label: 'Auto Tires & Wheels',
    }, {
      value: 'AutoOils',
      label: 'Auto Oils & Fluids',
    }, {
      value: 'Interior',
      label: 'Interior Accessories',
    }, {
      value: 'AutoTools',
      label: 'Auto Tools & Equipment',
    }, {
      value: 'AutoParts',
      label: 'Auto Parts & Spares',
    }, {
      value: 'GPS',
      label: 'GPS',
    }, {
      value: 'FloorMats',
      label: 'Floor Mats & Cargo Liners',
    }, {
      value: 'AirFreshner',
      label: 'Air Freshners',
    }, {
      value: 'ConsoleOrganisers',
      label: 'Console & ORganizers',
    }]
  }, {
    value: 'Services & Intsallation',
    label: 'Services & Intsallation',
    children: [{
      value: 'Brakes',
      label: 'Brakes',
    }]
  }, {
    value: 'Auto Oils & Fluids',
    label: 'Auto Oils & Fluids',
    children: [{
      value: 'Additives',
      label: 'Additives',
    }, {
      value: 'Transmission Fluid',
      label: 'Transmission Fluid',
    }]
  }, {
    value: 'Auto Tires & Wheels',
    label: 'Auto Tires & Wheels',
    children: [{
      value: 'Tires',
      label: 'Tires',
    }, {
      value: 'WheelsAccessories',
      label: 'Wheel Accessories & Parts',
    }]
  }, {
    value: 'Auto Care',
    label: 'Auto Care',
    children: [{
      value: 'PolishesWaxes',
      label: 'Polishes & Waxes',
    }, {
      value: 'Vacuums',
      label: 'Vacuums',
    }]
  }, {
    value: 'Auto Electronics',
    label: 'Auto Electronics',
    children: [{
      value: 'CarVideo',
      label: 'Car Video',
    }, {
      value: 'CarStereo',
      label: 'Car Stereo Recievers',
    }, {
      value: 'AudioVideo',
      label: 'Audio & Video Accessories',
    }, {
      value: 'InDash',
      label: 'In-Dash DVD & Video',
    }, {
      value: 'Speakers',
      label: 'Speakers',
    }]
  }, {
    value: 'Motorcycle',
    label: 'Motorcycle',
    children: [{
      value: 'Scooters',
      label: 'Scooters',
    }, {
      value: 'ElectricBikes',
      label: 'Electric Bikes',
    }, {
      value: 'StandarBikes',
      label: 'Standar Bikes',
    }, {
      value: 'ATVs',
      label: 'ATVs & UTVs',
    }, {
      value: 'Loaders',
      label: 'Loaders',
    }, {
      value: 'AutoRikshaw',
      label: 'Auto Rikshaw',
    }]
  }, {
    value: 'Moto Parts & Accessories',
    label: 'Moto Parts & Accessories',
    children: [{
      value: 'Drivetrain',
      label: 'Drivetrain & Transmission',
    }, {
      value: 'TiresandWheels',
      label: 'Tires & Wheels',
    }, {
      value: 'MotoCovers',
      label: 'Moto Covers',
    }, {
      value: 'Parts',
      label: 'Parts & Spares',
    }]
  }, {
    value: 'Motorcycle Ridding Gear',
    label: 'Motorcycle Ridding Gear',
    children: [{
      value: 'Helmet',
      label: 'Helmet',
    }, {
      value: 'Gloves',
      label: 'Gloves',
    }, {
      value: 'ChestBack',
      label: 'Chest & Back Protector',
    }, {
      value: 'EyeWear',
      label: 'Eyewear',
    }]
  }, {
    value: 'Cars',
    label: 'Cars',
    children: [{
      value: 'AutomaticCars',
      label: 'Automatic Cars',
    }, {
      value: 'ManualCars',
      label: 'Manual Cars',
    }, {
      value: 'ImportedCars',
      label: 'Imported Cars',
    }, {
      value: 'UsedCars',
      label: 'Used Cars',
    }]
  }]
}];


const colors = [
  {
    label: 'Black',
    value: 'Black',
  }, {
    label: 'Blue',
    value: 'Blue',
  }, {
    label: 'Red',
    value: 'Red',
  },
  {
    label: 'Red',
    value: 'Red',
  },
  {
    label: 'Green',
    value: 'Green',
  }, {
    label: 'Yellow',
    value: 'Yellow',
  }, {
    label: 'Orange',
    value: 'Orange',
  },
];

const brands = [
  {
    label: 'Canon',
    value: 'Canon',
  }, {
    label: 'Nikon',
    value: 'Nikon',
  }, {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Dell',
    value: 'Dell',
  },
  {
    label: 'Vaio',
    value: 'Vaio',
  }, {
    label: 'Lenovo',
    value: 'Lenovo',
  }, {
    label: 'Vivo',
    value: 'Vivo',
  },
];



class EcommerceTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterCategoryValue: [],
      dropdownCategoryValue: [],
      color: [],
      brand: [],
      keyOfTab: '',
      valueObj: '',
      redirectToExplore: false
    }
  }



  onChange = (value) => {
    console.log(value, 'e value')
    let searchValue = [];
    searchValue.push(value[2])
    this.setState({
      filterCategoryValue: searchValue,
      dropdownCategoryValue: value
    })
  }

  onChangeColor = (value) => {
    this.setState({
      color: value
    })
  }

  onChangeBrand = (value) => {
    this.setState({
      brand: value
    })
  }
  routeAndSearchTabs = () => {
    const { filterCategoryValue, dropdownCategoryValue, color, brand } = this.state;
    let obj = {
      filterCategoryEcom: filterCategoryValue,
      dropdownCategoryEcom: dropdownCategoryValue,
      colorEcom: color,
      brandEcom: brand,
      keyOfTab: '7',
      homefilter: true
    }
    this.setState({
      valueObj: obj,
      redirectToExplore: true
    })
  }

  render() {
    const { valueObj, redirectToExplore } = this.state;
    if (redirectToExplore) {
      return <Redirect to={{ pathname: `explore`, state: valueObj }} />;
    }
    return (

      <div className="row">
        <div className="col-md-12">
          <h3 className="homeFilterHead">Ecommerce</h3>
        </div>
        <div className="col-md-12">
          <div className="col-md-4 col-sm-6">
            <Cascader
              style={{ width: '100%' }} options={category} onChange={this.onChange.bind(this)}
              placeholder="Please select category"
            />
          </div>
          <div className="col-md-2 col-sm-6 mobMargTopp">
            <Cascader
              style={{ width: '100%' }} options={colors} onChange={this.onChangeColor.bind(this)}
              placeholder="Select color"
            />
          </div>
          <div className="col-md-3 col-sm-6 mobMargTopp">
            <Cascader
              style={{ width: '100%' }} options={brands} onChange={this.onChangeBrand.bind(this)}
              placeholder="Select brand"
            />
          </div>
          <div className="col-md-3 col-sm-6 mobMargTopp">
            <Button className="btn insidebutton submittBtn" onClick={this.routeAndSearchTabs}>
              <span className="fa fa-search">

              </span>
              <span>

                Submit</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default EcommerceTabs;