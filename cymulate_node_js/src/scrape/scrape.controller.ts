import { Controller, Post, Body, Get } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('start_scraping')
  startScraping(@Body('url') url: string) {
    return this.scrapeService.startScraping(url);
  }

  @Get('all')
  getAllScrapes() {
    return this.scrapeService.getAllScrapes();
  }
}