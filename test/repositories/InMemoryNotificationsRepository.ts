import { Notification } from '../../src/application/entities/notification/Notification';
import { NotificationsRepository } from '../../src/application/repositories/NotificationsRepository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
