var IP = process.env.EXPO_PUBLIC_BACKEND_IP
var PORT = process.env.EXPO_PUBLIC_BACKEND_PORT

if(IP == undefined){
    IP = '192.168.1.75';
}
if(PORT == undefined){
    PORT = 3000;
}

export const API_BASE_URL = `http://${IP}:${PORT}/api`;
console.log(`Backend IP:${IP} Backend Port: ${PORT} URL: ${API_BASE_URL}`)