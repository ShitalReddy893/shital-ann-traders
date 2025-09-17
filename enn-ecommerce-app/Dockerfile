# Stage 1: Build Angular app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build --prod

# Stage 2: Nginx to serve Angular build
FROM nginx:alpine
# Copy Angular dist output
COPY --from=build /app/dist/enn-ecommerce-app /usr/share/nginx/html

# Replace default nginx.conf to support Angular SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
