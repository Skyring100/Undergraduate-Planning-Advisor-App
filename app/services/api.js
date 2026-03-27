const IP = process.env.EXPO_PUBLIC_BACKEND_IP;
const PORT = process.env.EXPO_PUBLIC_BACKEND_PORT;


export const API_BASE_URL = `http://${IP}:${PORT}/api`;
console.log(`Backend IP:${IP} Backend Port: ${PORT} URL: ${API_BASE_URL}`);
