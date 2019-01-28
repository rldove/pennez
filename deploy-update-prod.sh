#!/bin/bash

############################ REMOTE ############################

IMAGE_NAME=gcr.io/diesel-thunder-188721/pennez-product
DEPLOYMENT_NAME=pennez-product
CONTAINER_NAME=pennez-product

gcloud container clusters get-credentials pennez-cluster-1 --zone us-central1-a --project diesel-thunder-188721
kubectl config use-context diesel-thunder-188721


# build local docker file
docker build -t ${IMAGE_NAME} .
# push to repo
gcloud docker -- push ${IMAGE_NAME}
# gcloud docker -- pull gcr.io/diesel-thunder-188721/pennez-product:latest
# fake out Kube to force a deploy without creating a real tag. for now....
kubectl set image deployment/${DEPLOYMENT_NAME} ${CONTAINER_NAME}=${IMAGE_NAME}:NA  --namespace=default
kubectl set image deployment/${DEPLOYMENT_NAME} ${CONTAINER_NAME}=${IMAGE_NAME}:latest  --namespace=default
 