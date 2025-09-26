# Serve React build via Nginx
FROM nginx:1.27-alpine

# Copy build output (run `npm run build` before deploy)
COPY ./build /usr/share/nginx/html

# Custom Nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["nginx","-g","daemon off;"]
