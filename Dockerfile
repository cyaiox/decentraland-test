# Build Environment
FROM node:lts-alpine3.15 as build
ARG REACT_APP_TOKEN_ADDRESS
ENV REACT_APP_TOKEN_ADDRESS=$REACT_APP_TOKEN_ADDRESS

WORKDIR /app
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# Production Environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]