import { NotificationsRepository } from '@application/repositories/NotificationsRepository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface IUnreadNotificationRequest {
  notificationId: string;
}

type TUnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IUnreadNotificationRequest,
  ): Promise<TUnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
