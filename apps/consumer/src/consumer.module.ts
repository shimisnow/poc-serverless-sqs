import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'PocServerlessQueue',
          queueUrl:
            'https://sqs.us-east-1.amazonaws.com/xxxx/PocServerlessQueue',
          region: 'us-east-1',
        },
      ],
    }),
  ],
  providers: [ConsumerService],
})
export class ConsumerModule {}
