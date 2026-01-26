'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  onClick,
}) => {
  const Component = hoverable ? motion.div : 'div';

  return (
    <Component
      className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...(hoverable && {
        whileHover: { scale: 1.02, y: -4 },
        transition: { duration: 0.2 },
      })}
    >
      {children}
    </Component>
  );
};
