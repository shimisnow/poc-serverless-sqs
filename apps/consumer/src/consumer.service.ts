import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Message } from '@aws-sdk/client-sqs';

@Injectable()
export class ConsumerService {
  public async processMessage(message: Message) {
    try {
      console.log('SQS MESSAGE RECEIVED');
      console.log(message);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
