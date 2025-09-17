import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Code2, Sparkles } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 rounded-xl blur-sm opacity-20"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OttoDev</h1>
              <p className="text-xs text-gray-500 -mt-1">AI Developer Studio</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">Projects</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Templates</span>
            </motion.button>
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">AI Ready</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header