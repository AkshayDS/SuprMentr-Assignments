import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const dummyProducts = [
  {
    name: "Yonex GR-303i Badminton Racket",
    description: "Lightweight, durable aluminum frame racket perfect for beginners and intermediate players.",
    price: 35.99,
    category: "Rackets",
    imageUrl: "https://images.unsplash.com/photo-1622279457486-69d73ce187ef?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    name: "Li-Ning G-Force Superlite 3600",
    description: "Head-heavy design for powerful smashes. Great for aggressive players.",
    price: 85.50,
    category: "Rackets",
    imageUrl: "https://images.unsplash.com/photo-1610886193798-f2b3b7e7a884?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    name: "Yonex Mavis 350 Nylon Shuttlecocks",
    description: "Highly durable nylon shuttlecocks providing flight performance close to feather shuttlecocks. Tube of 6.",
    price: 15.00,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1611077544837-14e4b47eb224?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    name: "Ashaway Super Grip 3-Pack",
    description: "Extra tacky and comfortable overgrips to prevent racket slipping.",
    price: 8.99,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1549417855-6b583f7a1195?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    name: "Men's Dry Fit Sports Running T-Shirt",
    description: "Breathable and sweat-wicking t-shirt ideal for intense matches.",
    price: 25.00,
    category: "Apparel",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    name: "Women's Sports Skort",
    description: "Comfortable athletic skort with built-in compression shorts.",
    price: 30.00,
    category: "Apparel",
    imageUrl: "https://plus.unsplash.com/premium_photo-1675129486749-9fdff7f12e2c?q=80&w=600&auto=format&fit=crop",
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-mini', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding...');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products.');

    // Insert dummy data
    await Product.insertMany(dummyProducts);
    console.log('Successfully seeded database with products!');

    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
