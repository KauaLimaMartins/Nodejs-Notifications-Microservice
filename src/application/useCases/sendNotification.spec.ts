import { InMemoryNotificationsRepository } from '../../../test/repositories/InMemoryNotificationsRepository';
import { SendNotification } from './SendNotification';

describe('SendNotification', () => {
  it('Should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'conteudo de teste',
      recipientId: 'test-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
