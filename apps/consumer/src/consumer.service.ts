import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';

@Injectable()
export class ConsumerService {
  @SqsMessageHandler(
    /** name: */ process.env.AWS_SQS_QUEUE_NAME,
    /** batch: */ false,
  )
  public async handleMessage(message: Message) {
    try {
      console.log('Received SQS message:', message);
    } catch (error) {
      console.log('consumer error', JSON.stringify(error));
      throw new InternalServerErrorException(error);
    }
  }

  @SqsConsumerEventHandler(
    /** name: */ process.env.AWS_SQS_QUEUE_NAME,
    /** eventName: */ 'processing_error',
  )
  public onProcessingError(error: Error, message: Message) {
    console.log(message);
    console.log(error);
  }

  @SqsConsumerEventHandler(
    /** name: */ process.env.AWS_SQS_QUEUE_NAME,
    /** eventName: */ 'timeout_error',
  )
  async onTimeoutError(error: Error, message: Message) {
    console.log(message);
    console.log(error);
  }
}
