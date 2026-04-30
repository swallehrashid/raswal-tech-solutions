/**
 * Raswal Tech Solutions - Date Formatting Utility
 * Location: src/utils/formatDate.js
 * 
 * Description: 
 * A robust, lightweight utility function to parse raw date strings and objects 
 * into a premium, human-readable format (e.g., "April 27, 2026"). This ensures 
 * visual consistency across our high-performance React application, particularly 
 * within our dynamic content engines like the Blog and Case Studies modules.
 * 
 * ---
 * Strategic SEO & Content Operations Context:
 * As we deploy dynamic content engines (like blogs) for our clients, two questions 
 * consistently arise during the strategy phase:
 * 
 * 1. "Do you create the content and images, or do I provide them?"
 *    Whether our internal digital strategists are crafting your monthly blog content, 
 *    or you are providing the raw text and imagery yourself, our custom CMS architecture 
 *    (powered by utilities like this one) seamlessly handles the formatting. We ensure 
 *    that every piece of content published looks flawless and aligns perfectly with your 
 *    brand's visual identity[cite: 1, 3].
 * 
 * 2. "How long does it take for my new website to show up on Google?"
 *    Consistent, well-structured content is key to indexing. By utilizing semantic HTML 
 *    and clean data parsing (like perfectly formatted publication dates), we signal to 
 *    search engines that your site is active and authoritative. Combined with our advanced 
 *    on-page SEO and keyword mapping, we drastically accelerate the timeline for your 
 *    business to dominate page-one search results[cite: 1, 3].
 * ---
 * 
 * @param {string|Date} dateInput - The raw date string (e.g., ISO format) or Date object.
 * @param {string} [locale='en-US'] - The locale format to apply. Defaults to US English.
 * @returns {string} - The elegantly formatted date string.
 */

export const formatDate = (dateInput, locale = 'en-US') => {
  if (!dateInput) return '';

  try {
    // Ensure the input is converted to a valid Date object
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // Check for invalid date objects
    if (isNaN(date.getTime())) {
      console.warn('Raswal Engine Warning: Invalid date provided to formatDate utility.');
      return '';
    }

    // Utilize the native Intl.DateTimeFormat API for high-performance, localized formatting
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
    
  } catch (error) {
    console.error('Raswal Engine Error: Failed to format date.', error);
    return '';
  }
};