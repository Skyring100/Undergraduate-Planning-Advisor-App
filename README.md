To run mobile app:
- cd .\app\
- npm install
- npx expo start

To run backend:
- cd .\backend\
- npm install
- npm run dev

Note: In order for app to communicate with backend, the API URL in /app/services/api.js must have the backend's IP address
- If running both app and backend on same machine, simply user your local IP address
- This can be found by opening command prompt and running 'ipconfig' and using the address associated with 'IPv4 Address'