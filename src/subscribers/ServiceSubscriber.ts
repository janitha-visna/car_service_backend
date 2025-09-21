import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";
import { Service } from "../entities/Services"
import { RevenueSummaryMonthly } from "../entities/RevenueSummaryMonthly";

@EventSubscriber()
export class ServiceSubscriber implements EntitySubscriberInterface<Service> {
  listenTo() {
    return Service;
  }

  async afterInsert(event: InsertEvent<Service>): Promise<void> {
    const service = event.entity;
    const year = service.service_datetime.getFullYear();
    const month = service.service_datetime.getMonth() + 1;

    const summaryRepo = event.manager.getRepository(RevenueSummaryMonthly);

    const existing = await summaryRepo.findOneBy({ year, month });

    if (existing) {
      existing.revenue = +existing.revenue + +service.amount;
      await summaryRepo.save(existing);
    } else {
      const newSummary = summaryRepo.create({
        year,
        month,
        revenue: service.amount,
      });
      await summaryRepo.save(newSummary);
    }
  }
}
