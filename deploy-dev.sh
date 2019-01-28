#!/bin/bash

IMAGE_NAME=pennez/pennez-product
# docker rmi ${IMAGE_NAME} 

# build local docker file
docker build -t ${IMAGE_NAME} .

CONTAINER_NAME=pennez-product
docker stop ${CONTAINER_NAME}  
docker rm ${CONTAINER_NAME}

docker run -it -p 8881:8881 --name ${CONTAINER_NAME} -v /Users/chadcompton/dev/www/pennez/ms-pennez-product:/usr/src/apps/pennez/ -d pennez/pennez-product


# auto login
# sudo docker exec -i -t ${CONTAINER_NAME} /bin/bash

# auto follow logs 
# docker logs -f ${CONTAINER_NAME} 



###### remove all 
# Delete all containers
# docker rm $(docker ps -a -q)
# Delete all images
# docker rmi $(docker images -q)