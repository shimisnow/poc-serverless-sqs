import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { v4 as uuidv4 } from 'uuid';
import { MessageBodyDto } from './dtos/message-body.dto';
import { MessageSerializer } from './serializers/message.serializer';

@Injectable()
export class ProducerService {
  constructor(private readonly sqsService: SqsService) {}

  async dispatchMessage(message: MessageBodyDto): Promise<MessageSerializer> {
    const id = uuidv4();

    await this.sqsService.send(process.env.AWS_SQS_QUEUE_NAME, {
      id,
      body: {
        id,
        ...message,
        timestamp: new Date().getTime(),
      },
      messageAttributes: {},
      delaySeconds: 0,
    });

    return {
      id,
    };
  }
}
