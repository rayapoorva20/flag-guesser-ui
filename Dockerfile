# Build stage: Vite -> dist/
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage: serve via Nginx
FROM nginx:1.27-alpine
# your proxy config (to backend) goes here
COPY ./nginx.conf /etc/nginx/nginx.conf
# Vite outputs to dist/
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx","-g","daemon off;"]
