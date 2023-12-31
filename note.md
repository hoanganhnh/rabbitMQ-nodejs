# rabbitMQ

> docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management

## Interview

- tại sao sử dụng rabbitmq ?
  - tách nhỏ các service
  - xây dựng các service không đồng bộ
  - giảm lưu lượng request cao điểm
- ưu điểm và nhược điểm của message queue ?
  - nhược điểm: tăng độ phức tạp của hệ thống, miss tin nhắn, tính nhất quán của hệ thống
- khi nào thì nên dùng kafka, rabbitmq, rocketMQ, activeMQ ?
  - thông lượng: rabbitmq (10K) < kafka, tính khả dụng: rabbitmq rất cao, có kiến trúc hệ thống phân tán, kafka rất rất cao, ít mất dữ liệu, rabbitmq, độ trễ: rabbitmq < kafka

## Message Queue

- khái niệm: producer, consumer, connection, channel, broker, exchange

- chế độ ngang hàng
- pub/sub

- Giải quyết vấn đề độ tin cậy trong queue (noAck, ttl, durable, persistent) phía Backend:
  - Khi RabbitMQ reStart hay crash thì làm thế nào để không mất những message trong queue? --> durable
  - Làm thế nào set một message hết hạn? --> TTL
  - Làm thế nào để xác định message đã được xử lý thành công? --> noAck
  - Một message sẽ được lấy ở cache hay disk trên RabbitMQ? --> persistent, disk
  - !Important: TTL, durable, persistent

## Triển khai một mô hình Publish Subscribe sử dụng RabbitMQ

- producer, exchange, consumer

## Mô hình topic exchange

- client nào quan tâm đến topic nào thì sử dụng những cú pháp đăng ký thông qua hai ký tự đại diện "\*" và "#"
- "\*" : phù hợp với bất kì kí tự nào, vd: producer: dev.test, new.test --> consumer: \*.test
- "#" : khớp với một hoặc hiều kí tự bất kì, vd: producer: dev.test.lead, test.lead --> consumer: #.lead
