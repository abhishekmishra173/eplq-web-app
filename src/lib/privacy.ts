import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET || 'dev_secret_key';

// Interface for Point of Interest
export interface POI {
  id: string;
  name: string; // Will be encrypted
  lat: number;  // Will be encrypted
  lng: number;  // Will be encrypted
  category: string; // Visible for indexing (or encrypt if strict)
  description: string; // Encrypted
}

/**
 * Encrypts data before sending to Firebase.
 * This ensures the Cloud Provider (Firebase) cannot see the actual locations.
 */
export const encryptPOI = (data: Omit<POI, 'id'>) => {
  return {
    name: CryptoJS.AES.encrypt(data.name, SECRET_KEY).toString(),
    // We store lat/lng as encrypted strings, not numbers
    lat: CryptoJS.AES.encrypt(data.lat.toString(), SECRET_KEY).toString(),
    lng: CryptoJS.AES.encrypt(data.lng.toString(), SECRET_KEY).toString(),
    category: data.category, // Kept plaintext for basic filtering (Trade-off)
    description: CryptoJS.AES.encrypt(data.description, SECRET_KEY).toString(),
    timestamp: new Date().toISOString()
  };
};

/**
 * Decrypts data on the CLIENT side.
 */
export const decryptPOI = (encryptedData: any): POI | null => {
  try {
    const bytesName = CryptoJS.AES.decrypt(encryptedData.name, SECRET_KEY);
    const bytesLat = CryptoJS.AES.decrypt(encryptedData.lat, SECRET_KEY);
    const bytesLng = CryptoJS.AES.decrypt(encryptedData.lng, SECRET_KEY);
    const bytesDesc = CryptoJS.AES.decrypt(encryptedData.description, SECRET_KEY);

    return {
      id: encryptedData.id,
      name: bytesName.toString(CryptoJS.enc.Utf8),
      lat: parseFloat(bytesLat.toString(CryptoJS.enc.Utf8)),
      lng: parseFloat(bytesLng.toString(CryptoJS.enc.Utf8)),
      category: encryptedData.category,
      description: bytesDesc.toString(CryptoJS.enc.Utf8),
    };
  } catch (error) {
    console.error("Decryption Integrity Check Failed", error);
    return null;
  }
};

/**
 * Haversine Formula for distance calculation
 * Performed locally after decryption to maintain privacy.
 */
export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}