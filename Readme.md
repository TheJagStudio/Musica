
# Musica - Music and Lyrics Generation Platform

Musica is a cutting-edge web application that leverages AI to generate personalized music and lyrics. Built with a robust Django backend and a dynamic ReactJS frontend, Musica offers users the ability to create, manage, and explore a vast library of AI-generated songs. Whether you're a musician seeking inspiration or a casual listener, Musica provides an intuitive platform to bring your musical ideas to life.

## Features

- **AI-Powered Lyrics Generation**: Utilize the Ollama API with Llama 3.1 8B to generate song lyrics based on user prompts.
- **AI-Generated Music**: Create original music tracks using the MusicGen model.
- **User Authentication**: Secure user registration and login system.
- **Song Management**: Create, read, update, and delete songs with detailed metadata.
- **Responsive Frontend**: Interactive and user-friendly interface built with ReactJS.
- **RESTful APIs**: Comprehensive APIs built with Django REST Framework for seamless frontend-backend communication.
- **Streaming Audio**: Real-time audio streaming capabilities for generated music.


## Technologies Used

### Backend

- **Django**: High-level Python web framework.
- **Django REST Framework (DRF)**: Toolkit for building Web APIs.
- **Ollama API**: For lyrics generation using Llama 3.1 8B.
- **MusicGen**: AI model for music generation.
- **PostgreSQL**: Robust relational database.

### Frontend
- **TailwindCSS**: Frontend Design Tool/library
- **ReactJS**: JavaScript library for building user interfaces.
- **Redux**: State management library.
- **Axios**: Promise-based HTTP client for the browser.
- **Material-UI**: React components for faster and easier web development.

### Other Tools

- **Docker**: Containerization platform.
- **Git**: Version control system.
- **GitHub Actions**: CI/CD pipelines.

## Architecture

Musica follows a **client-server** architecture:

- **Frontend (ReactJS)**: Handles the user interface and interacts with backend APIs.
- **Backend (Django)**: Manages business logic, interacts with external APIs (Ollama, MusicGen), and handles data storage.
- **Database (PostgreSQL)**: Stores user data, songs, and related metadata.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **npm or Yarn**
- **Docker & Docker Compose** (optional but recommended)
- **PostgreSQL** (if not using Docker)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/musica.git
   cd musica/backend
   ```

2. **Create a Virtual Environment**

   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory:

   ```env
   DEBUG=True
   SECRET_KEY=your-secret-key
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=postgres://user:password@localhost:5432/musica_db
   OLLAMA_API_KEY=your-ollama-api-key
   OPENAI_API_KEY=your-openai-api-key
   MEDIA_ROOT=/path/to/media
   MEDIA_URL=/media/
   ```

5. **Apply Migrations**

   ```bash
   python manage.py migrate
   ```

6. **Create a Superuser**

   ```bash
   python manage.py createsuperuser
   ```

7. **Run the Development Server**

   ```bash
   python manage.py runserver
   ```

   The backend API will be available at `http://localhost:8000/`.

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Run the Development Server**

   ```bash
   npm start
   # or
   yarn start
   ```

   The frontend will be available at `http://localhost:3000/`.

## Environment Variables

Ensure all necessary environment variables are set for both backend and frontend. Below is a comprehensive list:

### Backend (`backend/.env`)

| Variable          | Description                                      | Example                        |
| ----------------- | ------------------------------------------------ | ------------------------------ |
| `DEBUG`           | Django debug mode (True/False)                   | `True`                         |
| `SECRET_KEY`      | Django secret key                                | `your-secret-key`              |
| `ALLOWED_HOSTS`   | Hosts/domain names allowed (comma separated)     | `localhost,127.0.0.1`          |
| `DATABASE_URL`    | Database connection URL                          | `postgres://user:password@localhost:5432/musica_db` |
| `OLLAMA_API_KEY`  | API key for Ollama service                       | `your-ollama-api-key`          |
| `OPENAI_API_KEY`  | API key for OpenAI service                        | `your-openai-api-key`          |
| `MEDIA_ROOT`      | Path to store uploaded media files               | `/path/to/media`               |
| `MEDIA_URL`       | URL to access media files                         | `/media/`                      |


### Frontend (`frontend/.env`)

| Variable                | Description                            | Example                    |
| ----------------------- | -------------------------------------- | -------------------------- |
| `VITE_BACKEND_URL` | Base URL for backend API                | `http://localhost:8000/api` |

## Database Migration

After setting up your environment variables, apply migrations to set up your database schema.

```bash
python manage.py migrate
```

To create migration files after modifying models:

```bash
python manage.py makemigrations
python manage.py migrate
```

## Usage

### User Registration and Authentication

1. **Register a New Account**

   Navigate to the registration page on the frontend and create a new account.

2. **Login**

   Use your credentials to log in and access authenticated features.

### Creating a New Song

1. **Navigate to the "Create Song" Page**

2. **Fill in Song Details**

   - **Title**
   - **Description**
   - **Style**
   - **Lyrics Prompt**

3. **Generate Lyrics**

   Click the "Generate Lyrics" button to create lyrics based on your prompt.

4. **Generate Music**

   Click the "Generate Music" button to create music based on the generated lyrics and selected style.

5. **Save and Publish**

   Save your song to the library and choose to make it public or private.

### Exploring Songs

1. **Browse Library**

   Navigate through the list of generated songs, filter by style, popularity, or other criteria.

2. **View Song Details**

   Click on a song to view its details, listen to the audio, and read the lyrics.

3. **Interact**

   - **Favorite**: Mark songs you like.
   - **Download**: Download audio files.
   - **Share**: Share songs on social media platforms.


## License

This project is licensed under the [MIT License](https://github.com/your-username/musica/blob/main/LICENSE).

## Contact

For any inquiries or support, please contact:

- **Email**: thejagstudio@gmail.com
- **GitHub**: [TheJagStudio](https://github.com/TheJagStudio/)

---

© 2024 Musica. All rights reserved.

---

## Additional Information

### Docker Compose Configuration

For ease of setup, Docker Compose is configured to orchestrate all services. Below is a sample `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: musica_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    command: bash -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env
    depends_on:
      - db
      - redis

  frontend:
    build: ./frontend
    command: npm start
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_BASE_URL=http://localhost:8000/api
    depends_on:
      - backend

volumes:
  postgres_data:
```


### Continuous Integration

Set up CI/CD pipelines using GitHub Actions or other CI tools to automate testing and deployment.

### Security Considerations

- **Environment Variables**: Never commit sensitive information like API keys or database passwords. Use environment variables or secrets management tools.
- **CORS**: Configure Cross-Origin Resource Sharing (CORS) appropriately to restrict API access.
- **Input Validation**: Always validate and sanitize user inputs to prevent security vulnerabilities.

### Performance Optimization

- **Caching**: Implement caching strategies using Redis to improve response times for frequently accessed data.
- **Lazy Loading**: Use lazy loading for heavy components in the frontend to enhance performance.
- **Database Indexing**: Ensure proper indexing on database fields used in queries to speed up data retrieval.

---

Feel free to customize this README to better fit your project's specifics. If you have any questions or need further assistance, don't hesitate to reach out!