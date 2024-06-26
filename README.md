# Idan Chen Cymulate Senior python backend
## Web Scraping Application Docker Setup

This README provides instructions on how to configure and run the web scraping application using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

Ensure that both Docker and Docker Compose are installed on your system before proceeding.

## Project Structure

The project consists of four main services:

1. MongoDB
2. Python Backend
3. Node.js Backend
4. React Frontend

## Configuration

Before running the application, you may need to adjust some configuration values in the `docker-compose.yaml` file:

### MongoDB
- Port: 27017 (default)
- Data volume: mongodb_data

### Python Backend
- Context: ./cymulate_web_scraping
- Port: 5003:5005
- Environment variables:
  - MONGO_CONNECTION_URL=mongodb://mongodb:27017
  - MONGO_DB=cymulate_db
  - MONGO_COLLECTION=cymulate_collection
  - HOST=0.0.0.0
  - PORT=5005

### Node.js Backend
- Context: ./cymulate_be_node
- Port: 3005:3005
- Environment variables:
  - PORT=3005
  - PYTHON_BACKEND_URL=http://python-backend:5005/

### React Frontend
- Context: ./cymulate_fe_react
- Port: 3000:80
- Environment variables:
  - REACT_APP_API_HOST=nodejs-backend
  - REACT_APP_API_PORT=3005

## Running the Application

To run the application:

1. Open a terminal and navigate to the directory containing the `docker-compose.yaml` file.

2. Run the following command to build and start all services:

   ```
   docker-compose up --build
   ```

   The `--build` flag ensures that Docker builds fresh images for your services.

3. Wait for all services to start. You should see logs from each service in the terminal.

4. Once all services are running, you can access the React frontend at `http://localhost:3000` in your web browser.

## Stopping the Application

To stop the application:

1. If you started the services in the foreground (without `-d`), press `Ctrl+C` in the terminal.

2. Run the following command to stop and remove all containers:

   ```
   docker-compose down
   ```

## Troubleshooting

- If you encounter any issues with network conflicts, you can remove the existing network and volumes with:

  ```
  docker-compose down --volumes
  ```

- To view logs for a specific service:

  ```
  docker-compose logs [service_name]
  ```

  Replace `[service_name]` with mongodb, python-backend, nodejs-backend, or react-frontend.

- Ensure all required files and directories (Dockerfiles, source code) are present in the locations specified in the `context` fields of the docker-compose.yaml file.

## Note

The current configuration assumes that the services can communicate with each other using the service names as hostnames (e.g., `mongodb`, `python-backend`, `nodejs-backend`). If you need to change these, update the corresponding environment variables in the docker-compose.yaml file.

Idan Chen