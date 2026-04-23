import Domurify from 'dompurify';

export const sanitizeHTML = (html, opts = {}) => {
  return Domurify.sanitize(html, { FORBID_TAGS: ['style'], ...opts });
};
