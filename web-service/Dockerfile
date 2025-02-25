# שימוש ב-Node.js כתמונה הבסיסית
FROM node:18

# העתקת קבצי הפרויקט
COPY package*.json ./
RUN npm install
COPY . .

# הפעלת השרת
CMD ["node", "server.js"]
