import { NotificationsRepository } from '@application/repositories/NotificationsRepository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface ICancelNotificationsRequest {
  notificationId: string;
}

type TCancelNotificationsResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepostory: NotificationsRepository) {}

  async execute(
    request: ICancelNotificationsRequest,
  ): Promise<TCancelNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepostory.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepostory.save(notification);
  }
}
