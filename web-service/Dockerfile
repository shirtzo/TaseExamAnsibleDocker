# שימוש ב-Node.js כתמונה הבסיסית
FROM node:18

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת קבצי הפרויקט
COPY package*.json ./
RUN npm install
COPY . .

# הפעלת השרת
CMD ["node", "server.js"]
