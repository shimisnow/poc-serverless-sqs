# How to test locally

## Producer

## Consumer

The consumer is a lambda function that is invoked by a SQS message. The way to test it is to simulate the function call passing the event body to it.

```sh
serverless invoke local --function consumer --path deployment/local-test/consumer.data.json
```
