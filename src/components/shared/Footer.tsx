'use client'

import {
  MapPin, Phone, Mail, Facebook, Twitter, Instagram,
  Linkedin, Youtube, ArrowRight, Heart, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Youtube, label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-300 mt-auto relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/50"
              >
                <MapPin className="w-7 h-7 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                LocalServe
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Connecting you with trusted local service providers in your area. Quality service, verified professionals, quick bookings.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className={`w-10 h-10 bg-slate-800 ${social.color} rounded-xl flex items-center justify-center transition-all hover:shadow-xl`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Company
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Our Team', 'Careers', 'Press & Media', 'Blog'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1, x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                    </motion.div>
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              For Users
            </h3>
            <ul className="space-y-3">
              {['How It Works', 'Find Services', 'Become a Provider', 'Safety & Trust', 'Help Center'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1, x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 text-pink-400" />
                    </motion.div>
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 4 }}
                className="flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Head Office</p>
                  <p className="text-sm leading-relaxed">
                    123 Service Street, Suite 400<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </motion.li>
              <motion.li
                whileHover={{ x: 4 }}
                className="flex items-start gap-3"
              >
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Phone</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-xs text-slate-500 mt-1">Mon-Fri: 9AM - 6PM EST</p>
                </div>
              </motion.li>
              <motion.li
                whileHover={{ x: 4 }}
                className="flex items-start gap-3"
              >
                <Mail className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>
                  <p className="text-sm">support@localserve.com</p>
                  <p className="text-sm">info@localserve.com</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-slate-800"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Stay Updated
              </h3>
              <p className="text-slate-400 mb-4">
                Subscribe to our newsletter for the latest updates, tips, and special offers.
              </p>
              <form className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/30 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {[
                { icon: '✓', label: 'Verified Providers', color: 'from-purple-500 to-purple-600' },
                { icon: '🔒', label: 'Secure Payments', color: 'from-green-500 to-green-600' },
                { icon: '24/7', label: 'Support', color: 'from-pink-500 to-pink-600' },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="flex flex-col items-center gap-2 px-4 py-3 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 hover:border-purple-500 transition-all"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${badge.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{badge.icon}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-500 text-sm text-center md:text-left"
            >
              © {currentYear} LocalServe. All rights reserved. Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >
                <Heart className="w-4 h-4 inline text-pink-500 fill-pink-500" />
              </motion.span>{' '}
              in New York
            </motion.p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((link, index) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <Link href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
