#!/bin/bash

############################ REMOTE ############################

IMAGE_NAME=gcr.io/diesel-thunder-188721/pennez-product

CONTAINER_NAME=pennez-product

gcloud container clusters get-credentials pennez-cluster-1 --zone us-central1-a --project diesel-thunder-188721

# docker login
# fill out your info

# build local docker file
docker build -t ${IMAGE_NAME} .
# push to repo
gcloud docker -- push ${IMAGE_NAME}

# check your google login 
# gcloud auth application-default login

# set namespace
kubectl config use-context diesel-thunder-188721

# load and run docker image .  also creates a container. 
# kubectl run ${CONTAINER_NAME} --image=${IMAGE_NAME} --port=8881
kubectl create -f k8sConfig.json --namespace=default

# deploy LB service (external IP)
kubectl expose deployment ${CONTAINER_NAME} --type="LoadBalancer" --port=80 --target-port=8881 --namespace=default

# get pods 
# kubectl get pod
# kubectl get pod pennez-product-api-3992047838-7esb1

# read remote logs 
# kubectl logs -f pennez-product-api-3992047838-7esb1

# get service .  this will eventually get the show the external ip
# kubectl get service ${CONTAINER_NAME}

#### . remote dev tools
# load the UI . localhost:PORT/ui
# kubectl proxy
 