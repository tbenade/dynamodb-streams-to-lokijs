#!/bin/bash -e

task=$1
IMAGE_NAME="dockerregistry.seekinfra.com/rolerequirements/role-questions-service-api"

if [ "$task" = "deploy" ]; then
  aws cloudformation create-stack --stack-name role-questions-service \
  --template-body file://build/resources/cfn-template.json --parameters \
  ParameterKey=SubnetID,ParameterValue=subnet-00c76665 \
  ParameterKey=KeyName,ParameterValue=rr-sandbox-dev \
  ParameterKey=Owner,ParameterValue=rolereqs@seek.com.au \
  ParameterKey=Stream,ParameterValue='Role Requirements' \
  ParameterKey=Project,ParameterValue=Core \
  ParameterKey=QuestionsTableName,ParameterValue=role-questions-terry \
  ParameterKey=QuestionClassificationTableName,ParameterValue=role-questions-classification-terry \
  --capabilities CAPABILITY_IAM --tags Key=Stream,Value=RoleRequirements \
  Key=Owner,Value=rolereqs@seek.com.au
fi

if [ "$task" = "delete" ]; then
  aws cloudformation delete-stack --stack-name role-questions-service
fi

if [ "$task" = "buildcontainer" ]; then
  docker build -t $IMAGE_NAME .
fi

if [ "$task" = "pushcontainer" ]; then
  docker push $IMAGE_NAME
fi

if [ "$task" = "runcontainer" ]; then
  docker run --rm -it -p 8080:8080 $IMAGE_NAME bash
fi
