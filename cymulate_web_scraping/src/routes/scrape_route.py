import threading
from datetime import datetime

from src.base import LoguruLogger, Config

from fastapi import APIRouter, HTTPException

from src.classes import Scraper
from src.core.validation import ScrapeRequest

logger = LoguruLogger(__name__).get_logger()
scrape_api_config = Config().get_value('APIRoutes', 'Scrape')

router = APIRouter(prefix=scrape_api_config['prefix'],
                   tags=[scrape_api_config['tag']])

scraper = Scraper()


@router.post(scrape_api_config['routes']['Post']['StartScraping'], status_code=200)
async def start_scraping(request: ScrapeRequest):
    url = str(request.url)
    scrape_id = scraper.save_initial_record(url)
    threading.Thread(target=scraper.scrape_website, args=(url,scrape_id)).start()
    return True


@router.get(scrape_api_config['routes']['Get']['GetAllScrapes'])
async def get_all_scrapes():
    return scraper.get_all_scrapers_from_db()
