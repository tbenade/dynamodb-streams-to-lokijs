

task=$1

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
