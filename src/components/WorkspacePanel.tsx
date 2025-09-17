import React from 'react'
import { motion } from 'framer-motion'
import { Code2, FileText, Folder, Settings, Play, Save } from 'lucide-react'

interface WorkspacePanelProps {
  isVisible: boolean
}

const WorkspacePanel: React.FC<WorkspacePanelProps> = ({ isVisible }) => {
  const panelVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.2
      }
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-xl ml-6 overflow-hidden"
    >
      {/* Workspace Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Workspace</h3>
              <p className="text-xs text-gray-500">Project Editor & Preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-xs"
            >
              <Save className="w-3 h-3" />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-xs"
            >
              <Play className="w-3 h-3" />
              Run
            </motion.button>
          </div>
        </div>
      </div>

      {/* Workspace Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-100 bg-gray-50/50">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Project Files</h4>
            <div className="space-y-1">
              {[
                { name: 'src/', type: 'folder', icon: Folder },
                { name: 'components/', type: 'folder', icon: Folder },
                { name: 'App.tsx', type: 'file', icon: FileText },
                { name: 'index.html', type: 'file', icon: FileText },
                { name: 'package.json', type: 'file', icon: FileText },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm">
              <FileText className="w-3 h-3 text-gray-500" />
              <span className="text-gray-700">App.tsx</span>
            </div>
          </div>

          {/* Editor Placeholder */}
          <div className="flex-1 flex items-center justify-center bg-gray-50/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Code2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Code Editor Coming Soon
              </h3>
              <p className="text-gray-500 max-w-sm">
                This workspace will soon feature a full code editor, file browser, 
                and live preview capabilities.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">In Development</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-6 py-2 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Ready</span>
          </div>
          <span>TypeScript React</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default WorkspacePanel