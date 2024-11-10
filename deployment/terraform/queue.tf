provider "aws" {
  region = "us-east-1"
}

resource "aws_sqs_queue" "queue" {
  name = "PocServerlessQueue01"
}

output "sqs_queue_url" {
  value = aws_sqs_queue.queue.url
}

output "sqs_queue_arn" {
  value = aws_sqs_queue.queue.arn
}
