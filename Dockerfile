FROM node:19 AS build
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install
COPY . .
RUN npm run build

#Stage_2:_Runtime_stage
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx","-g","daemon off;"]
