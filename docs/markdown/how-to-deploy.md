# How to deploy

`THIS IS A PROJECT FOR LEARNING PURPOSES, SO THERE IS HARDCODED SIMULATED SENSITIVE INFORMATION`

## Generate AWS Lambda layer with node_modules

As AWS Lambda runtime executes with Amazon Linux, all node_modules libraries need to be for Linux. To avoid using the node_modules from local project, this project ensures the use of a node_modules for Linux using Docker.

The following command generates the node_modules with a major NodeJS official Docker image and create a zip file already with the required structure to be used as an AWS Lambda Layer.

```sh
docker compose aws-lambda-layer
```

The following command copies the generated zip file inside the Docker image and put it at the path that Serverless Framework sets as artifact (/aws-lambda-layer/aws-lambda-layer.zip).

```sh
docker create --name aws_lambda_layer_tmp aws-lambda-layer:latest
docker cp aws_lambda_layer_tmp:/home/aws-lambda-layer.zip ./aws-lambda-layer/aws-lambda-layer.zip
docker rm aws_lambda_layer_tmp
```
