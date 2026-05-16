FROM nginx:alpine

# Copy the portal index
COPY index.html /usr/share/nginx/html/

# Copy the GAIN Platform
COPY gain-platform /usr/share/nginx/html/gain-platform

# Copy the EcoLink Matching Engine
COPY ecolink-matching /usr/share/nginx/html/ecolink-matching

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
