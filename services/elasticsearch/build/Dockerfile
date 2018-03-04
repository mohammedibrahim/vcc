FROM docker.elastic.co/elasticsearch/elasticsearch:6.2.2

RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -

RUN yum update

RUN yum install nodejs yarn gcc-c++ make -y

RUN yarn global add pm2

COPY processes.json /

WORKDIR /

USER elasticsearch

CMD yarn install && pm2 start processes.json && pm2 logs