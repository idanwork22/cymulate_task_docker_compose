import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScrapeController } from './scrape.controller';
import { ScrapeService } from './scrape.service';

@Module({
  imports: [HttpModule],
  controllers: [ScrapeController],
  providers: [ScrapeService],
})
export class ScrapeModule {}