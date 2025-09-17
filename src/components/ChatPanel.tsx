import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Sparkles, MessageSquare } from 'lucide-react'
import MessageBubble from './MessageBubble'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatPanelProps {
  isChatStarted: boolean
  onChatStart: () => void
  messages: Message[]
  onSendMessage: (message: string) => void
  onFileUpload: (file: File) => void
  isLoading: boolean
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  isChatStarted,
  onChatStart,
  messages,
  onSendMessage,
  onFileUpload,
  isLoading
}) => {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (!isChatStarted) {
      onChatStart()
    }

    onSendMessage(input.trim())
    setInput('')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const panelVariants = {
    center: {
      x: 0,
      width: '100%',
      maxWidth: '600px',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    docked: {
      x: 0,
      width: '400px',
      maxWidth: '400px',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const containerVariants = {
    center: {
      justifyContent: 'center',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    docked: {
      justifyContent: 'flex-start',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      animate={isChatStarted ? 'docked' : 'center'}
      className="flex h-full"
    >
      <motion.div
        variants={panelVariants}
        animate={isChatStarted ? 'docked' : 'center'}
        className="bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-gray-500">
                {isLoading ? 'Thinking...' : 'Ready to help'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {!isChatStarted ? (
            // Welcome State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Welcome to OttoDev
              </h2>
              <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
                Your AI-powered development assistant. Ask me anything about coding, 
                get help with projects, or generate code snippets.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Create a React component",
                  "Debug my code",
                  "Explain this function",
                  "Generate API endpoints"
                ].map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            // Chat Messages
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                ))}
              </AnimatePresence>
              {isLoading && (
                <MessageBubble
                  role="assistant"
                  content=""
                  isTyping={true}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isChatStarted ? "Type your message..." : "Ask me anything..."}
                disabled={isLoading}
                className="input-field pr-12"
              />
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                accept=".txt,.md,.pdf,.zip,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.go,.rs,.php,.rb"
                className="hidden"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </motion.button>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Attach files with the paperclip icon
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ChatPanel