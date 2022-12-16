import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { GetRecipientNotifications } from './GetRecipientNotifications';

describe('GetRecipientNotifications', () => {
  it('Should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await countRecipientNotifications.execute({
      recipientId: 'recipient-test-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-test-1' }),
        expect.objectContaining({ recipientId: 'recipient-test-1' }),
      ]),
    );
  });
});
