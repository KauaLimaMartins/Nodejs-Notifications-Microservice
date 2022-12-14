import { Content } from './Content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('Should be able to create a notification without pass a createdAt', () => {
    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('Voce recebeu um novo pedido de amizade!'),
      category: 'social',
      readAt: undefined,
    });

    expect(notification).toBeTruthy();
  });

  it('Should be able to create a notification passing a createdAt', () => {
    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('Voce recebeu um novo pedido de amizade!'),
      category: 'social',
      readAt: undefined,
      createdAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
