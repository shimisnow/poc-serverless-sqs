import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.register({
      producers: [
        {
          name: process.env.AWS_SQS_QUEUE_NAME,
          queueUrl: process.env.AWS_SQS_QUEUE_URL,
          region: process.env.AWS_REGION || 'us-east-1',
        },
      ],
    }),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
