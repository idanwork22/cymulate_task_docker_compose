import uvicorn

from src.initializer import get_app

if __name__ == '__main__':
    app, host, port = get_app()
    uvicorn.run(app, host=host, port=port)
