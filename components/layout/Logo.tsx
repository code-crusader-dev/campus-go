'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', animated = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const LogoIcon = animated ? motion.div : 'div';

  return (
    <div className="flex items-center gap-2">
      <LogoIcon
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
        {...(animated && {
          initial: { scale: 0, rotate: -180 },
          animate: { scale: 1, rotate: 0 },
          transition: { 
            duration: 0.8, 
            ease: [0.6, 0.01, -0.05, 0.95],
            delay: 0.2 
          },
        })}
      >
        {/* Futuristic location pin design */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary-500"
            {...(animated && {
              initial: { pathLength: 0, opacity: 0 },
              animate: { pathLength: 1, opacity: 1 },
              transition: { duration: 1, delay: 0.5 },
            })}
          />
          
          {/* Navigation arrows */}
          <motion.path
            d="M50 20 L50 35 M50 80 L50 65"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary-600"
            {...(animated && {
              initial: { pathLength: 0, opacity: 0 },
              animate: { pathLength: 1, opacity: 1 },
              transition: { duration: 0.6, delay: 0.8 },
            })}
          />
          <motion.path
            d="M20 50 L35 50 M80 50 L65 50"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary-600"
            {...(animated && {
              initial: { pathLength: 0, opacity: 0 },
              animate: { pathLength: 1, opacity: 1 },
              transition: { duration: 0.6, delay: 0.9 },
            })}
          />
          
          {/* Center location pin */}
          <motion.circle
            cx="50"
            cy="50"
            r="15"
            fill="currentColor"
            className="text-primary-500"
            {...(animated && {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { duration: 0.4, delay: 1.2 },
            })}
          />
          
          {/* Inner core */}
          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="white"
            {...(animated && {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { duration: 0.3, delay: 1.4 },
            })}
          />
        </svg>
      </LogoIcon>
      
      <motion.span
        className={`font-bold ${textSizes[size]} bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent`}
        {...(animated && {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 1.0 },
        })}
      >
        Campus Go
      </motion.span>
    </div>
  );
};
