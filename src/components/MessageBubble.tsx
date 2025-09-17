import React from 'react'
import { motion } from 'framer-motion'
import { User, Bot, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
  isTyping?: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  role, 
  content, 
  timestamp, 
  isTyping = false 
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  }

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.8
      }
    }
  }

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex gap-3 mb-6 ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        role === 'user' 
          ? 'bg-primary-500 text-white' 
          : 'bg-gray-100 text-gray-600 border border-gray-200'
      }`}>
        {role === 'user' ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col gap-1 max-w-md ${role === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`group relative ${
          role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
        }`}>
          {isTyping ? (
            <motion.div
              variants={typingVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-1"
            >
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
            </motion.div>
          ) : (
            <>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
              
              {/* Copy button for assistant messages */}
              {role === 'assistant' && content && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-500" />
                  )}
                </motion.button>
              )}
            </>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && !isTyping && (
          <span className={`text-xs text-gray-400 px-2 ${
            role === 'user' ? 'text-right' : 'text-left'
          }`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default MessageBubble