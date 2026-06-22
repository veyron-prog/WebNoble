'use client';

import { motion } from 'framer-motion';
import { XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Logo Component
const Logo = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L6 12V28L20 36L34 28V12L20 4Z" stroke="#7C5CFF" strokeWidth="2" fill="none"/>
      <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" fill="#7C5CFF" fillOpacity="0.3"/>
      <path d="M20 12L14 16V24L20 28L26 24V16L20 12Z" fill="#7C5CFF"/>
      <path d="M16 6L20 4L24 6" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 7L20 4L26 7" stroke="#7C5CFF" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span className="text-2xl font-bold">
      <span className="text-white">Web</span>
      <span className="text-[#7C5CFF]">Noble</span>
    </span>
  </div>
);

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500 opacity-10 blur-[100px] rounded-full"></div>
      
      <div className="w-full max-w-md text-center">
        <Link href="/">
          <Logo className="justify-center mb-8" />
        </Link>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111114] border border-red-500/30 rounded-2xl p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="w-10 h-10 text-red-500" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-gray-400 mb-6">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          <div className="space-y-3">
            <Link
              href="/#pricing"
              className="w-full py-3 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              Try Again
              <ArrowRight size={20} />
            </Link>
            
            <Link
              href="/"
              className="w-full py-3 border border-gray-700 hover:border-gray-600 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>Need help with your purchase?</p>
          <p className="mt-2">
            <a href="/#contact" className="text-[#7C5CFF] hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}