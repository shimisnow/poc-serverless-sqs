![](docs/markdown/project-bar/project-bar.png)

# Serveless Framework and Amazon SQS

## General organization

This project has two functions, each one is an app inside the monorepo and run inside its own lambda function

- **Producer**: exposes a REST API endpoint to receive messages to be send to the queue
- **Consumer**: is trigger by the SQS message and print the message to CloudWatch (via console.log)

```mermaid
stateDiagram-v2
direction LR

state "API Call" as api_call
[*] --> api_call

state "AWS API Gateway" as aws_api_gateway {
    state "API Entrypoint" as api_entrypoint
    state "REST API Producer" as api_producer

    api_entrypoint --> api_producer

    api_producer --> lambda_producer

}

state "AWS Lambda" as aws_lambda {
    state "Function producer" as lambda_producer
    state "Function consumer" as lambda_consumer
}

state "AWS SQS" as aws_sqs {
    state "Queue" as sqs
}

api_call --> api_entrypoint
lambda_producer --> sqs
sqs --> lambda_consumer
lambda_consumer --> [*]
```

## Technology Stack

- **Monorepo**: This is a [monorepo](https://docs.nestjs.com/cli/monorepo#monorepo-mode) containing multiple Lambda functions and shared infrastructure
- **AWS SQS**: The `consumer` function is a standalone NestJS application that receives and process SQS messages
- **REST API**: The `producer` function is built using REST APIs to send SQS messages
- **NestJS**: Uses [NestJS framework](https://docs.nestjs.com/) for building scalable server-side application
- **Cloud-Native Architecture**: Built using cloud-native patterns and best practices to maximize the benefits of the cloud infrastructure, such as scalability and high availability
- **Serverless Framework**: Deployed using the [Serverless Framework](https://www.serverless.com/) for easy management of serverless applications
- **AWS Lambda**: Used for serverless function execution, where business logic is run in response to events
- **AWS API Gateway**: Used to create and manage APIs, providing endpoints for client applications to interact with the functions
- **Infrastructure as Code (IaC)**: Manages shared infrastructure using [Terraform](https://www.terraform.io/)

## Deployment flow

See details as [how to deploy](docs/markdown/how-to-deploy.md) in the deployment documentation.

```mermaid
stateDiagram-v2
direction LR

classDef docker_style fill:#1d63ed
classDef terraform_style fill:#7b42bc
classDef serverless_style fill:#fd5750

state "Docker" as docker_group {
    direction TB
    state "Build node_modules in Linux environment" as node_modules_build
    state "Export layer content to zip file" as layer_zip
    [*] --> node_modules_build
    node_modules_build --> layer_zip
    layer_zip --> [*]
}
docker_group:::docker_style

state "Terraform" as terraform_group {
    state "Amazon SQS Queue" as aws_sqs
    [*] --> aws_sqs
    aws_sqs --> [*]
}
terraform_group:::terraform_style

state start_fork <<fork>>
[*] --> start_fork
start_fork --> docker_group
start_fork --> terraform_group

state start_join <<join>>
docker_group --> start_join
terraform_group --> start_join

state "Build code" as build_code

start_join --> build_code

state "Deploy AWS Lambda Layer" as lambda_layer
state "Deploy AWS Lambda Function - Producer" as lambda_producer
state "Deploy AWS Lambda Function - Consumer" as lambda_consumer
state "Add SQS Queue trigger to AWS Lambda" as lambda_sqs_link
state "Deploy AWS API Gateway" as api_gateway

state "Serverless Framework" as serverless_group {
    lambda_layer --> lambda_producer
    lambda_layer --> lambda_consumer
    lambda_producer --> api_gateway
    lambda_consumer --> lambda_sqs_link

}
serverless_group:::serverless_style

build_code --> lambda_layer
api_gateway --> [*]
lambda_sqs_link --> [*]
```

## Documentation about

- [How to contribute](./CONTRIBUTING.md)
- [How to deploy](docs/markdown/how-to-deploy.md)
- [How to test locally](docs/markdown/how-to-test.md)
