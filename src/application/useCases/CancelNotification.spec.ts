import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { CancelNotification } from './CancelNotification';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

describe('CancelNotification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const newNotification = makeNotification();

    await notificationRepository.create(newNotification);

    await cancelNotification.execute({
      notificationId: newNotification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should be not able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'asdhjahsjk',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
