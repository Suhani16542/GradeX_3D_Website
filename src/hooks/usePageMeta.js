import { useEffect } from 'react';
import { brandConfig } from '../data/brandConfig';

/**
 * Custom hook to dynamically update page title and meta description for SEO.
 * @param {string} title - Page title
 * @param {string} description - Meta description
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | ${brandConfig.companyName}`
      : brandConfig.meta.defaultTitle;
    
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || brandConfig.meta.defaultDescription);
    }
  }, [title, description]);
}
