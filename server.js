const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'your_razorpay_key_id';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_key_secret';

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/travel_website', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Jyotirlinga Schema
const jyotirlingaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    stars: { type: String, required: true },
});

const Jyotirlinga = mongoose.model('Jyotirlinga', jyotirlingaSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    jyotirlingaName: { type: String, required: true },
    numberOfPersons: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentId: { type: String },
    orderId: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access token required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// API Routes
// Register User
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('❌ Register error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get All Jyotirlingas
app.get('/api/jyotirlingas', async (req, res) => {
    try {
        const jyotirlingas = await Jyotirlinga.find();
        res.json(jyotirlingas);
    } catch (error) {
        console.error('❌ Fetch jyotirlingas error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get Specific Jyotirlinga by Name
app.get('/api/jyotirlingas/:name', async (req, res) => {
    try {
        const jyotirlinga = await Jyotirlinga.findOne({ name: req.params.name });
        if (!jyotirlinga) {
            return res.status(404).json({ error: 'Jyotirlinga not found' });
        }
        res.json(jyotirlinga);
    } catch (error) {
        console.error('❌ Fetch jyotirlinga error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create Razorpay Order
app.post('/api/bookings/create-order', authenticateToken, async (req, res) => {
    try {
        const { jyotirlingaName, numberOfPersons } = req.body;
        if (!jyotirlingaName || !numberOfPersons || numberOfPersons < 1) {
            return res.status(400).json({ error: 'Jyotirlinga name and number of persons are required' });
        }

        const jyotirlinga = await Jyotirlinga.findOne({ name: jyotirlingaName });
        if (!jyotirlinga) {
            return res.status(404).json({ error: 'Jyotirlinga not found' });
        }

        const basePrice = parseFloat(jyotirlinga.price.match(/₹(\d+)/)[1]);
        const totalPrice = basePrice * numberOfPersons;

        const order = await razorpay.orders.create({
            amount: totalPrice * 100, // Razorpay expects amount in paise
            currency: 'INR',
            receipt: receipt_${Date.now()},
        });

        const booking = new Booking({
            userEmail: req.user.email,
            jyotirlingaName,
            numberOfPersons,
            totalPrice,
            orderId: order.id,
        });
        await booking.save();

        res.json({
            orderId: order.id,
            amount: totalPrice * 100,
            currency: 'INR',
            key: RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('❌ Create order error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Verify Razorpay Payment
app.post('/api/bookings/verify-payment', authenticateToken, async (req, res) => {
    try {
        const { orderId, paymentId, signature } = req.body;
        const crypto = require('crypto');
        const generatedSignature = crypto
            .createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(${orderId}|${paymentId})
            .digest('hex');

        if (generatedSignature === signature) {
            const booking = await Booking.findOneAndUpdate(
                { orderId },
                { paymentId, paymentStatus: 'completed' },
                { new: true }
            );
            res.json({ message: 'Payment verified successfully', booking });
        } else {
            await Booking.findOneAndUpdate(
                { orderId },
                { paymentStatus: 'failed' }
            );
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('❌ Verify payment error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Initialize Jyotirlinga Data (Run once to seed database)
const initializeJyotirlingas = async () => {
    const jyotirlingas = [
        {
            name: 'Somnath',
            description: 'The first and most revered Jyotirlinga, standing majestically on the shores of the Arabian Sea in Gujarat.',
            price: '₹950 <span>₹1200</span>',
            image: '/uploads/images/Somnath.jpg',
            video: '/uploads/videos/Somnath.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Mallikarjuna',
            description: 'Nestled in the hills of Srisailam, Andhra Pradesh, symbolizing divine unity and eternal love.',
            price: '₹980 <span>₹1250</span>',
            image: '/uploads/images/Mallikarjuna.jpg',
            video: '/Uploads/videos/Mallikarjuna.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Mahakaleshwar',
            description: 'Located in Ujjain, Madhya Pradesh, a sacred Jyotirlinga where Lord Shiva is worshipped as the eternal timekeeper.',
            price: '₹960 <span>₹1200</span>',
            image: '/uploads/images/Mahakaleshwar.jpg',
            video: '/uploads/videos/Mahakaleshwar.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Omkareshwar',
            description: 'Located on the sacred island shaped like the Om symbol in Madhya Pradesh.',
            price: '₹920 <span>₹1150</span>',
            image: '/Uploads/images/Omkareshwar.jpg',
            video: '/Uploads/videos/Omkareshwar.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Kedarnath',
            description: 'Perched in the Himalayas of Uttarakhand, drawing pilgrims to its serene altitude.',
            price: '₹1500 <span>₹1800</span>',
            image: '/uploads/images/Kedarnath.jpg',
            video: '/Uploads/videos/Kedarnath.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Bhimashankar',
            description: 'Nestled in the Sahyadri hills of Maharashtra, surrounded by lush forests.',
            price: '₹890 <span>₹1100</span>',
            image: '/Uploads/images/Bhimashankar.jpg',
            video: '/Uploads/videos/Bhimashankar.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Kashi Vishwanath',
            description: 'One of the holiest Shiva shrines in the spiritual heart of Varanasi.',
            price: '₹970 <span>₹1200</span>',
            image: '/uploads/images/kashi.jpg',
            video: '/Uploads/videos/Kashi_Vishwanath.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Trimbakeshwar',
            description: 'Near Nashik in Maharashtra, symbolizing the unity of creation, preservation, and destruction.',
            price: '₹900 <span>₹1200</span>',
            image: '/Uploads/images/Trimbakeshwar.jpg',
            video: '/Uploads/videos/Trimbakeshwar.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Vaidyanath',
            description: 'In Deoghar, Jharkhand, worshipped as the divine healer.',
            price: '₹990 <span>₹1250</span>',
            image: '/Uploads/images/Vaidyanath.jpg',
            video: '/Uploads/videos/Vaidyanath.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Nageshwar',
            description: 'Near Dwarka in Gujarat, symbolizing divine strength and serenity.',
            price: '₹910 <span>₹1100</span>',
            image: '/Uploads/images/Nageshwar.jpg',
            video: '/Uploads/videos/Nageshwar.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Rameshwaram',
            description: 'On the serene island of Tamil Nadu, symbolizing devotion and redemption.',
            price: '₹1050 <span>₹1300</span>',
            image: '/Uploads/images/Rameshwaram.jpg',
            video: '/Uploads/videos/Rameshwaram.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
        {
            name: 'Grishneshwar',
            description: 'Near Ellora Caves in Maharashtra, radiating divine grace.',
            price: '₹880 <span>₹1050</span>',
            image: '/Uploads/images/Grishneshwar.jpg',
            video: '/Uploads/videos/Grishneshwar.webm',
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        },
    ];

    try {
        const count = await Jyotirlinga.countDocuments();
        if (count === 0) {
            await Jyotirlinga.insertMany(jyotirlingas);
            console.log('✅ Jyotirlinga data initialized');
        }
    } catch (error) {
        console.error('❌ Error initializing jyotirlingas:', error);
    }
};

// Run initialization
initializeJyotirlingas();

// Start Server
app.listen(PORT, () => {
    console.log(✅ Server running on port ${PORT});
});