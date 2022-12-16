import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { CountRecipientNotifications } from './CountRecipientNotifications';

describe('CountRecipientNotifications', () => {
  it('Should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-test-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-test-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-test-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-test-1',
    });

    expect(count).toEqual(2);
  });

  it('Should be able to return 0 without notifications registered', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-test',
    });

    expect(count).toEqual(0);
  });
});
