'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, CreditCard, Settings, LogOut,
  Clock, CheckCircle2, AlertCircle, ArrowRight, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// Logo Component
const Logo = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L6 12V28L20 36L34 28V12L20 4Z" stroke="#7C5CFF" strokeWidth="2" fill="none"/>
      <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" fill="#7C5CFF" fillOpacity="0.3"/>
      <path d="M20 12L14 16V24L20 28L26 24V16L20 12Z" fill="#7C5CFF"/>
    </svg>
    <span className="text-xl font-bold">
      <span className="text-white">Web</span>
      <span className="text-[#7C5CFF]">Noble</span>
    </span>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const icons = {
    pending: Clock,
    in_progress: AlertCircle,
    completed: CheckCircle2,
    cancelled: AlertCircle,
  };

  const Icon = icons[status] || Clock;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border ${styles[status] || styles.pending}`}>
      <Icon size={14} />
      {status?.replace('_', ' ')?.charAt(0).toUpperCase() + status?.replace('_', ' ')?.slice(1) || 'Pending'}
    </span>
  );
};

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      window.location.href = '/auth';
      return;
    }

    setUser(JSON.parse(userData));
    fetchOrders(token);
  }, []);

  const fetchOrders = async (token) => {
    try {
      const response = await fetch('/api/user/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7C5CFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'orders', icon: FileText, label: 'Orders' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111114] border-r border-[#7C5CFF]/20 p-6 flex flex-col">
        <Link href="/">
          <Logo className="mb-8" />
        </Link>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id
                  ? 'bg-[#7C5CFF]/20 text-[#7C5CFF]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
              <p className="text-gray-400">Here's what's happening with your projects.</p>
            </div>
            <Link
              href="/#pricing"
              className="px-6 py-2.5 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-full text-white font-medium transition-all"
            >
              Start New Project
            </Link>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#111114] border border-[#7C5CFF]/20 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm">Total Projects</p>
                  <p className="text-3xl font-bold mt-1">{orders.length}</p>
                </div>
                <div className="bg-[#111114] border border-[#7C5CFF]/20 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm">Active Projects</p>
                  <p className="text-3xl font-bold mt-1">
                    {orders.filter((o) => o.status === 'in_progress').length}
                  </p>
                </div>
                <div className="bg-[#111114] border border-[#7C5CFF]/20 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold mt-1">
                    {orders.filter((o) => o.status === 'completed').length}
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-[#111114] border border-[#7C5CFF]/20 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
                    <Link
                      href="/#pricing"
                      className="inline-flex items-center gap-2 text-[#7C5CFF] hover:underline"
                    >
                      Browse our services <ArrowRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl"
                      >
                        <div>
                          <p className="font-medium">{order.plan}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-[#111114] border border-[#7C5CFF]/20 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-6">All Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">No orders found.</p>
                    <Link
                      href="/#pricing"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#7C5CFF] rounded-full text-white font-medium"
                    >
                      Start Your First Project <ArrowRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Plan</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-800/50">
                            <td className="py-4 px-4 font-mono text-sm">
                              {order.id.slice(0, 8)}...
                            </td>
                            <td className="py-4 px-4">{order.plan}</td>
                            <td className="py-4 px-4 text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <StatusBadge status={order.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-[#111114] border border-[#7C5CFF]/20 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
                <p className="text-gray-400 mb-6">
                  Manage your payment methods and view your billing history.
                </p>
                <div className="bg-[#0A0A0A] rounded-xl p-6 border border-dashed border-gray-700">
                  <p className="text-center text-gray-500">
                    Stripe billing portal will be available after payment integration.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-[#111114] border border-[#7C5CFF]/20 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#7C5CFF]/20 rounded-xl text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#7C5CFF]/20 rounded-xl text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}