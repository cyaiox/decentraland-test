# Build Environment
FROM node:lts-alpine3.15 as build
ARG REACT_APP_TOKEN_ADDRESS
ENV REACT_APP_TOKEN_ADDRESS=$REACT_APP_TOKEN_ADDRESS

RUN apk add --no-cache \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python3

WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# Production Environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]