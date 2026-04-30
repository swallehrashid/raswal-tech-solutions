/**
 * Raswal Tech Solutions - Text Truncation Utility
 * Location: src/utils/truncateText.js
 * 
 * Description: 
 * A high-performance utility designed to shorten long text strings for card previews, 
 * ensuring our premium grid layouts remain uniform and visually flawless. This function 
 * intelligently slices text to a maximum length while appending an elegant ellipsis.
 * 
 * ---
 * Strategic SEO & Content Operations Context:
 * At Raswal Tech Solutions, every line of code serves the broader digital strategy. 
 * Clients entering the discovery phase frequently ask two critical questions:
 * 
 * 1. "What do I need to prepare or provide before starting a web design project?"
 *    The answer is simple: your vision and your raw knowledge[cite: 3]. You do not need to 
 *    worry about perfectly formatting your content for the web. Our digital strategists and 
 *    automated layout systems (using utilities exactly like this one) will take your raw 
 *    information and seamlessly parse it into bite-sized, conversion-optimized previews 
 *    and detailed full-page reads[cite: 1, 3].
 * 
 * 2. "Will my website look good and function properly on mobile phones?"
 *    Absolutely. We emphasize responsive layouts across all screen sizes[cite: 1, 3]. 
 *    This truncate utility is a core part of that promise. By dynamically shortening text 
 *    excerpts, we ensure that paragraphs never break out of their containers or cause 
 *    horizontal scrolling on smaller screens, guaranteeing a luxurious, fluid experience 
 *    on every device[cite: 1, 3].
 * ---
 * 
 * @param {string} text - The raw, potentially long text string to be evaluated.
 * @param {number} [maxLength=100] - The maximum number of characters allowed before truncation.
 * @returns {string} - The safely truncated string with an appended ellipsis if shortened.
 */

export const truncateText = (text, maxLength = 100) => {
  // Guard clause against null, undefined, or non-string inputs
  if (!text || typeof text !== 'string') {
    return '';
  }

  // If the text is already within the limit, return it unmodified
  if (text.length <= maxLength) {
    return text;
  }

  // Intelligently slice the text. 
  // We trim the result before adding the ellipsis to avoid floating punctuation spaces.
  const truncatedString = text.slice(0, maxLength).trim();

  // Return the formatted preview string
  return `${truncatedString}...`;
};