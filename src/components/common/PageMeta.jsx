import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';

/**
 * Reusable SEO PageMeta component
 */
export function PageMeta({ title, description }) {
  usePageMeta(title, description);
  return null;
}
