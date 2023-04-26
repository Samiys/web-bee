import { Op } from 'sequelize';
import Event from './entities/event.entity';
import Workshop from './entities/workshop.entity';

export class EventsService {

  async getWarmupEvents() {
    return await Event.findAll();
  }

  async getEventsWithWorkshops() {
    return await Event.findAll({
      include: [Workshop]
    });
  }

  async getFutureEventWithWorkshops() {
    return await Event.findAll({
      include: [
        {
          model: Workshop,
          where: {
            start: { [Op.gt]: new Date() }
          }
        } 
      ],
      group: ['event.id'],
      having: {
        start: { [Op.gt]: new Date() }
      }
    });
  }

}