#FROM node:alpine
FROM nginx:alpine

COPY ./etc/nginx-vhosts.conf /etc/nginx/nginx-http/vhosts.conf
COPY ./build ./www

#CMD nginx -c /etc/nginx/nginx.conf -g "${NGINX_DIRECTIVES-}"
