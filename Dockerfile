FROM node:12-alpine as builder
WORKDIR /assignment-app
COPY package.json /assignment-app/package.json
RUN npm install --only=prod
COPY . /assignment-app
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /assignment-app/build /usr/share/nginx/html
EXPOSE 80:8080
CMD ["nginx", "-g", "daemon off;"]