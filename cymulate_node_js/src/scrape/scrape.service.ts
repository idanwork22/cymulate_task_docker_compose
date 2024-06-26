import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';

@Injectable()
export class ScrapeService {
  private readonly pythonBackendUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.pythonBackendUrl = this.configService.get<string>('PYTHON_BACKEND_URL');
  }

  startScraping(url: string): Observable<any> {
    return this.httpService.post(`${this.pythonBackendUrl}/scrape/start_scraping`, { url })
      .pipe(
        map(response => response.data)
      );
  }

  getAllScrapes(): Observable<any> {
    return this.httpService.get(`${this.pythonBackendUrl}/scrape/all`)
      .pipe(
        map(response => response.data)
      );
  }
}