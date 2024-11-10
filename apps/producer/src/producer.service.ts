import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProducerService {
  constructor(private readonly sqsService: SqsService) {}

  public async dispatchMessage() {
    const id = uuidv4();

    console.log('sended');

    await this.sqsService.send(process.env.AWS_SQS_QUEUE_NAME, {
      id,
      body: {
        id,
        text: 'Here is a number: ' + new Date().getTime(),
      },
      messageAttributes: {},
      delaySeconds: 0,
    });
  }
}
