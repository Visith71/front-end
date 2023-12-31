# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY node_modules ./
RUN npm run build
#COPY dist ./
COPY . .
# RUN npm run serve

# production stage
FROM nginx:stable-alpine as production-stage
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
