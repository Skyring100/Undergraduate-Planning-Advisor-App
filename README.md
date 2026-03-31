To run mobile app:
- cd .\app\
- npm install
- npx expo start

To run backend:
- cd .\backend\
- npm install
- npm run dev

Note: In order for app to communicate with backend, the file in /app/.env must have EXPO_PUBLIC_BACKEND_IP and EXPO_PUBLIC_BACKEND_PORT values for the backend process
- If running both app and backend on same machine, simply user your local IP address
- This can be found by opening command prompt and running 'ipconfig' and using the address associated with 'IPv4 Address'


Backend Flow:
- server.js -> directs API request to a route in routes/xxx.js depending on resource (ex. /sections, /users)
- routes/xxx.js -> offers various functions for resource xxx and returns a response object with both data and success codes
- db_manager/xxxStorage -> calls SQL queries to return JSON representation of the query. Used by routes/xxx.js

Overall Flow:
app/services/xxxService.js -> backend/server.js -> -> backend/routes/xxx.js -> backend/db_manager/xxxStorage