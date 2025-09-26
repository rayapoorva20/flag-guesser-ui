# Build stage: compile React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage: serve via Nginx
FROM nginx:1.27-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx","-g","daemon off;"]