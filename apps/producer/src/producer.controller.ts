import { Body, Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { MessageBodyDto } from './dtos/message-body.dto';
import { MessageSerializer } from './serializers/message.serializer';

@Controller('message')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async emitMessage(@Body() body: MessageBodyDto): Promise<MessageSerializer> {
    return await this.producerService.dispatchMessage(body);
  }
}
