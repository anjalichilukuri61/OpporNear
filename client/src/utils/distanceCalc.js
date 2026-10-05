export const cityCoordinates = {
  "New Delhi": { lat: 28.6139, lon: 77.2090 },
  "Delhi": { lat: 28.6139, lon: 77.2090 },
  "Bangalore": { lat: 12.9716, lon: 77.5946 },
  "Bengaluru": { lat: 12.9716, lon: 77.5946 },
  "Hyderabad": { lat: 17.3850, lon: 78.4867 },
  "Mumbai": { lat: 19.0760, lon: 72.8777 },
  "Vijayawada": { lat: 16.5062, lon: 80.6480 },
  "Chennai": { lat: 13.0827, lon: 80.2707 },
  "Kolkata": { lat: 22.5726, lon: 88.3639 },
  "Pune": { lat: 18.5204, lon: 73.8567 },
  "Ahmedabad": { lat: 23.0225, lon: 72.5714 },
  "Jaipur": { lat: 26.9124, lon: 75.7873 },
  "Surat": { lat: 21.1702, lon: 72.8311 },
  "Lucknow": { lat: 26.8467, lon: 80.9462 },
  "Kanpur": { lat: 26.4499, lon: 80.3319 },
  "Nagpur": { lat: 21.1458, lon: 79.0882 },
  "Indore": { lat: 22.7196, lon: 75.8577 },
  "Thane": { lat: 19.2183, lon: 72.9781 },
  "Bhopal": { lat: 23.2599, lon: 77.4126 },
  "Visakhapatnam": { lat: 17.6868, lon: 83.2185 },
  "Guntur": { lat: 16.3067, lon: 80.4365 }
};

// Haversine formula to calculate distance between two coordinates
export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return Math.round(d);
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}
