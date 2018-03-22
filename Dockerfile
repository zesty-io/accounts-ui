FROM nginx:alpine

COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./build /www

RUN chmod -R a+r /www

# nginx is automatically started by this base image