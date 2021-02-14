#!/bin/bash

echo "Enter you username"
read USERNAME
echo "Enter you password"
read -s PASSWORD

BUILD_GUI=false
BUILD_NGINX=false
BUILD_BACKEND=false
START_CONTAINERS=false
STOP_CONTAINERS=false
PUSH_TO_GIT=false
PUSH_TO_DOCKER=false

if [[ "$USERNAME" != "marko" && "$PASSWORD" != "admin123" ]]; then
  echo "You did not provide right username and password"
  exit 1;
fi


while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in
    --build|-b)
     BUILD_GUI=true
     BUILD_NGINX=true
     BUILD_BACKEND=true
     echo "Build gui and backend set to: $BUILD_GUI"
     ;;
    --stop)
     STOP_CONTAINERS=true
     echo "Stopping containers: $STOP_CONTAINERS"
     ;;
    --start|-s)
     START_CONTAINERS=true
     echo "Start application set to: $START_CONTAINERS"
     ;;
    --git|-g)
     PUSH_TO_GIT=true
     echo "Push changes to git repo: $PUSH_TO_GIT"
     ;;
    --docker|-d)
     PUSH_TO_DOCKER=true
     echo "Push image to docker repo: $PUSH_TO_DOCKER"
     ;;
    *)
     echo "Invalid key: $key"
     exit 1;
     ;;
   esac
   shift
 done

 echo
 echo

 function buildGui() {
 
   docker-compose up -d db #first start db

   cd ../gui
   docker build -t agile_gui .
 }

 function buildNginx() {

   cd ../deployment/nginx
   docker build -t nginx-root .
 }
 
 function buildBackend() {
 
    cd ../../backend/administrator-service
    
    mvn spring-boot:build-image -Dspring-boot.build-image.imageName=agile/administrator-service:latest
    
    cd ../central-service
    
    mvn spring-boot:build-image -Dspring-boot.build-image.imageName=agile/central-service:latest
 }

 function startContainers() {
 
   docker-compose up -d #start db,gui and nginx
 }

 function stopContainers() {
 
   cd ../../deployment

   docker-compose down #stop db,gui and nginx
 }

 function gitPush() {

   git add .

   echo "Enter commit message:"
   READ MESSAGE

   git commit -m "$MESSAGE"
   git push
 }

 start=`date +%s`

 if [ $STOP_CONTAINERS == true ]; then
   stopContainers
 fi

 if [ $BUILD_GUI == true ]; then
   buildGui
 fi

 if [ $BUILD_NGINX == true ]; then
   buildNginx
 fi
 
 if [ $BUILD_BACKEND == true ]; then
   buildBackend
 fi

 if [ $START_CONTAINERS == true ]; then
   stopContainers
   startContainers
 fi

end=`date +%s`

runtime=$((end-start))

echo
echo "Total time to start infrastructure: $runtime sec"

exit 0;
