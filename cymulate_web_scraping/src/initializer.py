import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes import *
from src.base import Config

def get_app():
    app = FastAPI()
    app_config = Config().get_value('app')
    load_dotenv()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # include all the routes
    app.include_router(scrape_router)
    return app, os.getenv("HOST",app_config['host']), os.getenv("PORT",app_config['port'])
