# Stage 1: Build Angular app
FROM 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Nginx
FROM nginx:alpine

# Copy nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output (take files from /browser/)
COPY --from=build /app/dist/enn-ecommerce-app/browser/* /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
