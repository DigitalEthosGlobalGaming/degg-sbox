FROM node:alpine

# Create app directory
WORKDIR /opt/app-root


# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/


# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 80 443 8080
CMD [ "npm", "run", "start" ]