import { Notification } from '../entities/notification/Notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
