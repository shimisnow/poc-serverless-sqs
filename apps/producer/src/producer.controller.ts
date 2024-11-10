import { Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('message')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  emitMessage() {
    return this.producerService.dispatchMessage();
  }
}
