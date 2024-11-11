# How to test locally

## Producer

The producer is a lambda function that exposes a REST API endpoint.

Create a `.env` with the SQS configuration:

```sh
AWS_SQS_QUEUE_NAME=PocServerlessQueue01
AWS_SQS_ARN=arn:aws:sqs:us-east-1:841162612345:PocServerlessQueue01
AWS_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/841162612345/PocServerlessQueue01
```

Run the command to start the local REST API

```sh
npm run start:dev:producer
```

Send a request to the endpoint

```sh
curl --location 'http://localhost:3000/message' \
--header 'Content-Type: application/json' \
--data '{
    "text": "my message 001"
}'
```

## Consumer

The consumer is a lambda function that is invoked by a SQS message. The way to test it is to simulate the function call passing the event body to it.

```sh
serverless invoke local --function consumer --path deployment/local-test/consumer.data.json
```
