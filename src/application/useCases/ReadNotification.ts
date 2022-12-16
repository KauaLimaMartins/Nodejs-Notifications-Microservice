import { NotificationsRepository } from '@application/repositories/NotificationsRepository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface IReadNotificationRequest {
  notificationId: string;
}

type TReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IReadNotificationRequest,
  ): Promise<TReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
