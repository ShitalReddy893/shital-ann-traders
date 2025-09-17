# ===============================
# Stage 1: Build Angular app
# ===============================
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build Angular app for production
RUN npm run build -- --configuration production

# ===============================
# Stage 2: Serve app with Nginx
# ===============================
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output (Angular 17 puts it inside /browser)
COPY --from=build /app/dist/enn-ecommerce-app/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
