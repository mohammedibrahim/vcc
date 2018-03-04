FROM nginx:1.13

# update sources
RUN apt-get update
RUN apt-get upgrade -y

# unzip, wget, git
RUN apt-get install --fix-missing
# RUN apt-get install -y rsyslog lsof

RUN rm -v /etc/nginx/nginx.conf
ADD build/nginx.conf /etc/nginx/

# Append "daemon off;" to the end of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# SET run script
COPY build/run-nginx /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# leave us in /root
WORKDIR /root

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Use phusion-baseimage's init script
CMD ["/etc/service/nginx/run"]