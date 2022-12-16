import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { ReadNotification } from './ReadNotification';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

describe('ReadNotification', () => {
  it('Should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const newNotification = makeNotification();

    await notificationRepository.create(newNotification);

    await readNotification.execute({
      notificationId: newNotification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should be not able to read a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'asdhjahsjk',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
