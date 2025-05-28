const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Post = require('../models/Post');
const Event = require('../models/Event');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Event.deleteMany({});
    
    console.log('Cleared existing data...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@sportsera.com',
      password: adminPassword,
      role: 'admin',
      gender: 'male',
      primarySport: 'Cricket',
      skillLevel: 'Advanced',
      favoriteSports: ['Cricket', 'Football', 'Tennis'],
      activeDays: ['Monday', 'Wednesday', 'Friday'],
      isEmailVerified: true,
      isActive: true,
      bio: 'System administrator for SportsEra platform.'
    });

    // Create sample users
    const userPassword = await bcrypt.hash('user123', 12);
    const users = await User.create([
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: userPassword,
        role: 'user',
        gender: 'male',
        primarySport: 'Cricket',
        skillLevel: 'Intermediate',
        favoriteSports: ['Cricket', 'Football'],
        activeDays: ['Monday', 'Wednesday', 'Friday'],
        isEmailVerified: true,
        isActive: true,
        bio: 'Cricket enthusiast and weekend warrior.'
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        password: userPassword,
        role: 'user',
        gender: 'female',
        primarySport: 'Badminton',
        skillLevel: 'Advanced',
        favoriteSports: ['Badminton', 'Tennis'],
        activeDays: ['Tuesday', 'Thursday', 'Saturday'],
        isEmailVerified: true,
        isActive: true,
        bio: 'Professional badminton player and coach.'
      },
      {
        fullName: 'Mike Johnson',
        email: 'mike@example.com',
        password: userPassword,
        role: 'user',
        gender: 'male',
        primarySport: 'Football',
        skillLevel: 'Beginner',
        favoriteSports: ['Football', 'Basketball'],
        activeDays: ['Saturday', 'Sunday'],
        isEmailVerified: true,
        isActive: true,
        bio: 'New to sports, looking to improve my football skills.'
      }
    ]);

    console.log('Created users...');

    // Create sample posts
    const posts = await Post.create([
      {
        title: 'Best Cricket Techniques for Beginners',
        content: 'Here are some essential cricket techniques every beginner should master. First, focus on your stance and grip. A proper stance provides balance and allows for quick movement in any direction. The grip should be firm but not too tight, with the V formed by your thumb and index finger pointing towards your back shoulder.',
        sportCategory: 'Cricket',
        author: users[0]._id,
        likes: [users[1]._id, users[2]._id],
        isActive: true
      },
      {
        title: 'Badminton Footwork Drills',
        content: 'Footwork is crucial in badminton. Here are some drills to improve your court movement: 1. Shadow badminton - practice movements without a shuttlecock. 2. Ladder drills for agility. 3. Multi-directional lunges. 4. Split-step practice. Remember, good footwork is the foundation of all badminton shots.',
        sportCategory: 'Badminton',
        author: users[1]._id,
        likes: [users[0]._id],
        isActive: true
      },
      {
        title: 'Football Training Tips for Beginners',
        content: 'Starting your football journey? Here are some tips: 1. Master the basics - passing, dribbling, and shooting. 2. Work on your fitness - football requires endurance. 3. Practice ball control daily. 4. Watch professional games to understand positioning. 5. Join a local club or team for regular practice.',
        sportCategory: 'Football',
        author: users[2]._id,
        likes: [users[0]._id, users[1]._id],
        isActive: true
      },
      {
        title: 'Tennis Serve Techniques',
        content: 'A good serve is essential in tennis. Key points: 1. Proper ball toss - consistent height and placement. 2. Continental grip for power and spin. 3. Fluid motion from legs to arm. 4. Follow through towards your target. 5. Practice different serve types - flat, slice, and kick serves.',
        sportCategory: 'Tennis',
        author: admin._id,
        likes: [users[1]._id],
        isActive: true
      }
    ]);

    console.log('Created posts...');

    // Create sample events
    const events = await Event.create([
      {
        title: 'Weekend Cricket Tournament',
        description: 'Join us for an exciting weekend cricket tournament! Open to all skill levels. Teams will be formed on the day. Prizes for winners and runners-up. Refreshments provided.',
        sportCategory: 'Cricket',
        location: 'Central Sports Ground, Mumbai',
        dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        maxParticipants: 50,
        entryFee: 500,
        prizeMoney: 10000,
        participants: [users[0]._id, users[2]._id],
        isActive: true
      },
      {
        title: 'Badminton Championship 2024',
        description: 'Annual badminton championship featuring singles and doubles categories. Professional referees and quality shuttlecocks provided. Registration includes tournament t-shirt.',
        sportCategory: 'Badminton',
        location: 'Sports Complex, Delhi',
        dateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        maxParticipants: 32,
        entryFee: 800,
        prizeMoney: 25000,
        participants: [users[1]._id],
        isActive: true
      },
      {
        title: 'Football Skills Workshop',
        description: 'Learn from professional coaches in this intensive football skills workshop. Covers dribbling, passing, shooting, and tactical awareness. Suitable for beginners to intermediate players.',
        sportCategory: 'Football',
        location: 'Football Academy, Bangalore',
        dateTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        maxParticipants: 25,
        entryFee: 1200,
        participants: [users[2]._id],
        isActive: true
      },
      {
        title: 'Tennis Coaching Camp',
        description: 'Intensive 3-day tennis coaching camp with certified coaches. Focus on technique improvement, match play, and mental preparation. All equipment provided.',
        sportCategory: 'Tennis',
        location: 'Tennis Club, Chennai',
        dateTime: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
        maxParticipants: 20,
        entryFee: 2500,
        participants: [],
        isActive: true
      }
    ]);

    console.log('Created events...');

    console.log('✅ Seed data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`👤 Users: ${users.length + 1} (including 1 admin)`);
    console.log(`📝 Posts: ${posts.length}`);
    console.log(`🏆 Events: ${events.length}`);
    console.log('\n🔐 Login Credentials:');
    console.log('Admin: admin@sportsera.com / admin123');
    console.log('User 1: john@example.com / user123');
    console.log('User 2: jane@example.com / user123');
    console.log('User 3: mike@example.com / user123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();