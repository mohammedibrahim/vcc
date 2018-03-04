#!/bin/sh

docker-compose stop
docker stop $(docker ps -a -q)
docker ps -a -q | xargs docker stop
docker ps -a -q | xargs docker rm

echo "
  ========= [[[[[[ CLEANING NETWORKS ]]]]]] =============
"
docker network ls 
docker network ls | grep "bridge"  
docker network rm $(docker network ls | grep "bridge" | awk '/ / { print $1 }')

echo "
  ========= [[[[[[ CLEANING IMAGES ]]]]]] =============
"
docker images
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
docker images | grep "none"
docker rmi $(docker images | grep "none" | awk '/ / { print $3 }')

echo "
  ========= [[[[[[ CLEANING CONTAINERS ]]]]]] =============
"
docker ps
docker ps -a
docker rm $(docker ps -qa --no-trunc --filter "status=exited")

echo "--------------------------------------------------"
echo "---------------       OK      --------------------"
echo "--------------------------------------------------"
