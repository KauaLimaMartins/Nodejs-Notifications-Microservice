import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { UnreadNotification } from './UnreadNotification';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

describe('UnreadNotification', () => {
  it('Should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const newNotification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(newNotification);

    await unreadNotification.execute({
      notificationId: newNotification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('Should be not able to unread a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'asdhjahsjk',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
