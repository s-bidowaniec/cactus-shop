export const API_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}`
    : 'http://localhost:8000';
export const IMGS_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/api/public/`
    : 'http://localhost:8000/api/public/';
