import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.register({
      producers: [
        {
          name: 'PocServerlessQueue',
          queueUrl:
            'https://sqs.us-east-1.amazonaws.com/xxxxx/PocServerlessQueue',
          region: 'us-east-1',
        },
      ],
    }),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
