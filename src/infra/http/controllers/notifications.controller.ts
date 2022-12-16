import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';

import { CancelNotification } from '@application/useCases/CancelNotification';
import { CountRecipientNotifications } from '@application/useCases/CountRecipientNotifications';
import { GetRecipientNotifications } from '@application/useCases/GetRecipientNotifications';
import { ReadNotification } from '@application/useCases/ReadNotification';
import { UnreadNotification } from '@application/useCases/UnreadNotification';
import { SendNotification } from 'src/application/useCases/SendNotification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../viewModels/NotificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationViewModel[] }> {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHTTP(notification),
      ),
    };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Post()
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<NotificationViewModel> {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    return this.cancelNotification.execute({ notificationId: id });
  }
}
