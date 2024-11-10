import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: process.env.AWS_SQS_QUEUE_NAME,
          queueUrl: process.env.AWS_SQS_QUEUE_URL,
          region: process.env.AWS_REGION || 'us-east-1',
        },
      ],
    }),
  ],
  providers: [ConsumerService],
})
export class ConsumerModule {}
