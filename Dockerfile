FROM nginx:alpine

COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./build /www

#RUN mkdir -p /var/log/app_engine

# For AppEngine health checks
RUN mkdir /www/_ah
RUN echo "healthy" > /www/_ah/health

RUN chmod -R a+r /www

# nginx is automatically started by this base image