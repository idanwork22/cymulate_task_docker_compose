import datetime

from pydantic import BaseModel, HttpUrl


class ScrapeResponse(BaseModel):
    base_url: HttpUrl
    execution_time: datetime.datetime
    list_of_urls: list
    status: str
    _id: str


