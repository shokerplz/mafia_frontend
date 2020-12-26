FROM node:15-alpine as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /mafia-front && mv ./node_modules ./mafia-front

WORKDIR /mafia-front

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /mafia-front/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
