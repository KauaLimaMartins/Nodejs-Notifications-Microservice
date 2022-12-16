import { Content } from '@application/entities/notification/Content';
import {
  Notification,
  INotificationProps,
} from '@application/entities/notification/Notification';

type Override = Partial<INotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('notificação de teste 1'),
    recipientId: 'recipient-test-1',
    ...override,
  });
}
