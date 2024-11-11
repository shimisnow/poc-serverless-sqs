import { NestFactory } from '@nestjs/core';
import { Message } from '@aws-sdk/client-sqs';
import { ConsumerModule } from './consumer.module';
import { ConsumerService } from './consumer.service';

export const handler = async (event) => {
  const app = await NestFactory.createApplicationContext(ConsumerModule);
  const sqsHandle = app.get(ConsumerService);

  // for each message sended to the lambda
  for (const message of event.Records) {
    await sqsHandle.processMessage(message as Message);
  }

  return {
    statusCode: 200,
    body: 'SQS message processed',
  };
};
