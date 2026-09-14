'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  index?: number
  className?: string
}

/**
 * Wraps a grid item (a card) so it fades and slides into place the first
 * time it scrolls into view. `index` staggers cards in the same grid so
 * they animate in one after another instead of all at once.
 */
export const Reveal: React.FC<RevealProps> = ({ children, index = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.08, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)
