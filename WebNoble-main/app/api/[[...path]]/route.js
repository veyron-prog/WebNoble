import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'webnoble';

let client = null;
let db = null;

async function connectDB() {
  if (db) return db;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Helper to get CORS headers
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Simple password hashing (for demo - use bcrypt in production)
function hashPassword(password) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Generate simple token
function generateToken() {
  return uuidv4() + '-' + Date.now();
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const path = resolvedParams?.path?.join('/') || '';
  const { searchParams } = new URL(request.url);
  
  try {
    const database = await connectDB();

    // Health check
    if (path === 'health' || path === '') {
      return NextResponse.json({ 
        status: 'ok', 
        message: 'WebNoble API is running',
        timestamp: new Date().toISOString()
      }, { headers: getCorsHeaders() });
    }

    // Get all leads (admin)
    if (path === 'leads') {
      const leads = await database.collection('leads').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ success: true, leads }, { headers: getCorsHeaders() });
    }

    // Get all orders (admin)
    if (path === 'orders') {
      const orders = await database.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ success: true, orders }, { headers: getCorsHeaders() });
    }

    // Get user orders
    if (path === 'user/orders') {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401, headers: getCorsHeaders() });
      }
      const session = await database.collection('sessions').findOne({ token });
      if (!session) {
        return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401, headers: getCorsHeaders() });
      }
      const orders = await database.collection('orders').find({ userId: session.userId }).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ success: true, orders }, { headers: getCorsHeaders() });
    }

    // Get user profile
    if (path === 'user/profile') {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401, headers: getCorsHeaders() });
      }
      const session = await database.collection('sessions').findOne({ token });
      if (!session) {
        return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401, headers: getCorsHeaders() });
      }
      const user = await database.collection('users').findOne({ id: session.userId });
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404, headers: getCorsHeaders() });
      }
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json({ success: true, user: userWithoutPassword }, { headers: getCorsHeaders() });
    }

    // Get projects/work
    if (path === 'projects') {
      const projects = await database.collection('projects').find({}).toArray();
      return NextResponse.json({ success: true, projects }, { headers: getCorsHeaders() });
    }

    // Get testimonials
    if (path === 'testimonials') {
      const testimonials = await database.collection('testimonials').find({}).toArray();
      return NextResponse.json({ success: true, testimonials }, { headers: getCorsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: getCorsHeaders() });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function POST(request, { params }) {
  const resolvedParams = await params;
  const path = resolvedParams?.path?.join('/') || '';
  
  try {
    const database = await connectDB();
    const body = await request.json();

    // User Registration
    if (path === 'auth/register') {
      const { email, password, name } = body;
      
      if (!email || !password || !name) {
        return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400, headers: getCorsHeaders() });
      }

      const existingUser = await database.collection('users').findOne({ email });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 400, headers: getCorsHeaders() });
      }

      const user = {
        id: uuidv4(),
        email,
        password: hashPassword(password),
        name,
        createdAt: new Date().toISOString(),
      };

      await database.collection('users').insertOne(user);

      const token = generateToken();
      await database.collection('sessions').insertOne({
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });

      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({ success: true, user: userWithoutPassword, token }, { headers: getCorsHeaders() });
    }

    // User Login
    if (path === 'auth/login') {
      const { email, password } = body;
      
      if (!email || !password) {
        return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400, headers: getCorsHeaders() });
      }

      const user = await database.collection('users').findOne({ email, password: hashPassword(password) });
      if (!user) {
        return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401, headers: getCorsHeaders() });
      }

      const token = generateToken();
      await database.collection('sessions').insertOne({
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });

      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({ success: true, user: userWithoutPassword, token }, { headers: getCorsHeaders() });
    }

    // Logout
    if (path === 'auth/logout') {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (token) {
        await database.collection('sessions').deleteOne({ token });
      }
      return NextResponse.json({ success: true }, { headers: getCorsHeaders() });
    }

    // Submit contact/lead form
    if (path === 'leads') {
      const { name, email, business, service, message } = body;
      
      if (!name || !email) {
        return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400, headers: getCorsHeaders() });
      }

      const lead = {
        id: uuidv4(),
        name,
        email,
        business: business || '',
        service: service || '',
        message: message || '',
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      await database.collection('leads').insertOne(lead);
      return NextResponse.json({ success: true, lead }, { headers: getCorsHeaders() });
    }

    // Newsletter signup
    if (path === 'newsletter') {
      const { email } = body;
      
      if (!email) {
        return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400, headers: getCorsHeaders() });
      }

      const existing = await database.collection('newsletter').findOne({ email });
      if (existing) {
        return NextResponse.json({ success: false, error: 'Already subscribed' }, { status: 400, headers: getCorsHeaders() });
      }

      await database.collection('newsletter').insertOne({
        id: uuidv4(),
        email,
        createdAt: new Date().toISOString(),
      });

      return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { headers: getCorsHeaders() });
    }

    // Create order (for Stripe integration placeholder)
    if (path === 'orders') {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      const { plan, amount, paymentMethod } = body;

      let userId = null;
      if (token) {
        const session = await database.collection('sessions').findOne({ token });
        if (session) userId = session.userId;
      }

      const order = {
        id: uuidv4(),
        userId,
        plan,
        amount,
        paymentMethod: paymentMethod || 'stripe',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await database.collection('orders').insertOne(order);
      return NextResponse.json({ success: true, order }, { headers: getCorsHeaders() });
    }

    // Stripe webhook placeholder
    if (path === 'webhooks/stripe') {
      // In production, verify the Stripe signature
      const { type, data } = body;
      
      if (type === 'checkout.session.completed') {
        const orderId = data?.object?.metadata?.orderId;
        if (orderId) {
          await database.collection('orders').updateOne(
            { id: orderId },
            { $set: { status: 'completed', paidAt: new Date().toISOString() } }
          );
        }
      }

      return NextResponse.json({ received: true }, { headers: getCorsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: getCorsHeaders() });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function PUT(request, { params }) {
  const resolvedParams = await params;
  const path = resolvedParams?.path?.join('/') || '';
  
  try {
    const database = await connectDB();
    const body = await request.json();

    // Update order status (admin)
    if (path.startsWith('orders/')) {
      const orderId = path.split('/')[1];
      const { status } = body;

      await database.collection('orders').updateOne(
        { id: orderId },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      return NextResponse.json({ success: true }, { headers: getCorsHeaders() });
    }

    // Update lead status (admin)
    if (path.startsWith('leads/')) {
      const leadId = path.split('/')[1];
      const { status } = body;

      await database.collection('leads').updateOne(
        { id: leadId },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      return NextResponse.json({ success: true }, { headers: getCorsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: getCorsHeaders() });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const path = resolvedParams?.path?.join('/') || '';
  
  try {
    const database = await connectDB();

    // Delete order (admin)
    if (path.startsWith('orders/')) {
      const orderId = path.split('/')[1];
      await database.collection('orders').deleteOne({ id: orderId });
      return NextResponse.json({ success: true }, { headers: getCorsHeaders() });
    }

    // Delete lead (admin)
    if (path.startsWith('leads/')) {
      const leadId = path.split('/')[1];
      await database.collection('leads').deleteOne({ id: leadId });
      return NextResponse.json({ success: true }, { headers: getCorsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: getCorsHeaders() });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: getCorsHeaders() });
  }
}