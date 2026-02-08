'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home, X } from 'lucide-react';
import { Node, Direction } from '@/types';
import { Button } from '@/components/ui/Button';

interface NodeViewerProps {
  nodes: Node[];
  startNodeId: string;
  onClose?: () => void;
}

export const NodeViewer: React.FC<NodeViewerProps> = ({ nodes, startNodeId, onClose }) => {
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentNode = nodes.find(n => n.id === currentNodeId);

  useEffect(() => {
    setCurrentNodeId(startNodeId);
  }, [startNodeId]);

  const navigate = (dir: Direction) => {
    if (!currentNode || isTransitioning) return;

    const targetNodeId = currentNode.connections[dir];
    if (!targetNodeId) return;

    setDirection(dir);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentNodeId(targetNodeId);
      setIsTransitioning(false);
      setDirection(null);
    }, 500);
  };

  const resetToStart = () => {
    if (currentNodeId !== startNodeId && !isTransitioning) {
      setDirection(null);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentNodeId(startNodeId);
        setIsTransitioning(false);
      }, 500);
    }
  };

  if (!currentNode) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p className="text-white text-xl">Node not found</p>
      </div>
    );
  }

  const directionButtons = [
    { dir: 'up' as Direction, Icon: ArrowUp, className: 'top-4 left-1/2 -translate-x-1/2' },
    { dir: 'down' as Direction, Icon: ArrowDown, className: 'bottom-4 left-1/2 -translate-x-1/2' },
    { dir: 'left' as Direction, Icon: ArrowLeft, className: 'left-4 top-1/2 -translate-y-1/2' },
    { dir: 'right' as Direction, Icon: ArrowRight, className: 'right-4 top-1/2 -translate-y-1/2' },
  ];

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Background image with transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: direction ? 1.1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: direction ? 0.9 : 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={currentNode.image}
            alt={currentNode.title || 'Node view'}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better button visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {directionButtons.map(({ dir, Icon, className }) => {
        const hasConnection = !!currentNode.connections[dir];
        
        return (
          <motion.div
            key={dir}
            className={`absolute ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => navigate(dir)}
              disabled={!hasConnection || isTransitioning}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                hasConnection
                  ? 'bg-white/90 hover:bg-white hover:scale-110 shadow-lg'
                  : 'bg-gray-500/30 cursor-not-allowed'
              }`}
              title={hasConnection ? `Navigate ${dir}` : `No connection ${dir}`}
            >
              <Icon className={`w-8 h-8 ${hasConnection ? 'text-gray-900' : 'text-gray-500'}`} />
            </button>
          </motion.div>
        );
      })}

      {/* Top controls */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        {/* Title */}
        {currentNode.title && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg"
          >
            <h2 className="text-white font-semibold text-lg">
              {currentNode.title}
            </h2>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2"
        >
          <button
            onClick={resetToStart}
            disabled={currentNodeId === startNodeId || isTransitioning}
            className="p-3 bg-black/60 backdrop-blur-md hover:bg-black/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Return to start"
          >
            <Home className="w-5 h-5 text-white" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-3 bg-black/60 backdrop-blur-md hover:bg-black/80 rounded-lg transition-colors"
              title="Close viewer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Loading indicator */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-lg">
            <p className="text-white font-medium">Loading...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
