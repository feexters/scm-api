import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsRepository } from 'src/events/repositories';

@Injectable()
export class EventOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(EventsRepository)
    private readonly eventsRepository: EventsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isOwner = await this.eventsRepository.isEventOwner({
      eventId: request.params.eventId,
      userId: request.user.id,
    });

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
