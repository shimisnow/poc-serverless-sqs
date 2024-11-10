import { NestFactory } from '@nestjs/core';
import { Handler } from 'aws-lambda';
import { ConsumerModule } from './consumer.module';
import { ConsumerService } from './consumer.service';

let app;

export const handler: Handler = async (event) => {
  app = await NestFactory.createApplicationContext(ConsumerModule);

  const sqsHandle = app.get(ConsumerService);

  for (const record of event.Records) {
    const message = JSON.parse(record.body);

    // Manually trigger the handler
    await sqsHandle.handleMessage(message);
  }

  return {
    statusCode: 200,
    body: 'SQS message processed',
  };
};
