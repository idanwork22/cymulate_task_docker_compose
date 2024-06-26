# Cymulate - Senior Developer Task
## Web Scraping and Data Storage with FastAPI and MongoDB

## Overview

This project implements a web scraping and data storage solution using FastAPI for the backend server, Pydantic for data validation, and MongoDB for storing the results. The application scrapes a given website for all the domains and URLs found on the site, stores the results in a MongoDB database, and handles the scraping process asynchronously.

## Features

- **Web Scraping:** Scrapes a given website and extracts all the domains and URLs found on the site.
- **Asynchronous Processing:** Handles the scraping process in a separate thread to ensure a quick response to the user.
- **Data Storage:** Stores the scraping results in a MongoDB database.
- **FastAPI:** Provides a REST API to trigger the scraping process and fetch results.

## Technologies Used

- **Python:** Core language for the scraping script.
- **FastAPI:** Web framework for building the REST API.
- **Pydantic:** Data validation and settings management using Python type annotations.
- **MongoDB:** NoSQL database for storing the scraping results.
- **Docker:** Containerization to ensure consistent environments.

## Setup Instructions

### Prerequisites

- **Docker:** Ensure Docker is installed and running on your machine.
- **Python:** Ensure Python 3.9+ is installed.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
