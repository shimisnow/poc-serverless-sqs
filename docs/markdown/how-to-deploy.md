# How to deploy

## Generate AWS Lambda layer with node_modules

As AWS Lambda runtime executes with Amazon Linux, all node_modules libraries need to be for Linux. To avoid using the node_modules from local project, this project ensures the use of a node_modules for Linux using Docker.

The following command generates the node_modules with a major NodeJS official Docker image and create a zip file already with the required structure to be used as an AWS Lambda Layer.

```sh
docker compose build lambda-layer
```

The following command copies the generated zip file inside the Docker image and put it at the path that Serverless Framework sets as artifact (/aws-lambda-layer/poc-serverless-sqs-layer.zip).

```sh
docker create --name poc_serverless_sqs_layer_tmp poc-serverless-sqs-layer:latest
docker cp poc_serverless_sqs_layer_tmp:/home/aws-lambda-layer.zip ./aws-lambda-layer/poc-serverless-sqs-layer.zip
docker rm poc_serverless_sqs_layer_tmp
```

## Create the infrastructure

The required infrastructure (one AWS SQS) can be created at Amazon AWS using terraform. All commands should be executed inside the directory `deployment/terraform`

```sh
terraform init
terraform plan
terraform apply
```

After the infrastructure creation, the `arn` and `url` for the created SQS Queue will be show at the console.

```sh
Outputs:
sqs_queue_arn = "arn:aws:sqs:us-east-1:1234567890:PocServerlessQueue"
sqs_queue_url = "https://sqs.us-east-1.amazonaws.com/1234567890/PocServerlessQueue"
```

## Setup .env.json file

Copy the file `model.env.json` at the project root to `.env.json` and change the values to real ones.

## Build the code

```sh
nest build producer
nest build consumer
```

## Deploy

```sh
serverless deploy
```

```sh
✔ Service deployed to stack poc-serverless-sqs-dev (293s)

endpoint: POST - https://kef0l2abcd.execute-api.us-east-1.amazonaws.com/dev/message
functions:
  producer: poc-serverless-sqs-dev-producer (2.9 kB)
  consumer: poc-serverless-sqs-dev-consumer (2.3 kB)
layers:
  node: arn:aws:lambda:us-east-1:1234567890:layer:node:18
```
