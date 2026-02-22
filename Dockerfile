# Build stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# For development purposes (as you are using runserver for backend)
EXPOSE 3000
CMD ["npm", "start"]