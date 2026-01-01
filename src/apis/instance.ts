import ky from 'ky';

export const fetchInstance = ky.create({ prefixUrl: import.meta.env.VITE_BACKEND_URL });
