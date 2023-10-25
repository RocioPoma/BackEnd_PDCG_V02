FROM node:18

# Create app directory
WORKDIR /app/

COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npm install -g pm2
CMD ["npm", "run", "start"]