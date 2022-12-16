import { Module } from '@nestjs/common';
import { SendNotification } from '@application/useCases/SendNotification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/useCases/CancelNotification';
import { CountRecipientNotifications } from '@application/useCases/CountRecipientNotifications';
import { GetRecipientNotifications } from '@application/useCases/GetRecipientNotifications';
import { ReadNotification } from '@application/useCases/ReadNotification';
import { UnreadNotification } from '@application/useCases/UnreadNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
