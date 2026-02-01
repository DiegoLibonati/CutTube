# CutTube

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Join to `cuttube-app` folder and execute: `npm install` or `yarn install` in the terminal
3. Go to the previous folder and execute: `docker-compose -f dev.docker-compose.yml build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose -f dev.docker-compose.yml up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `dev.docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

### Pre-Commit for Development (Python)

NOTE: Install **pre-commit** inside: `cuttube-api` folder.

1. Once you're inside the virtual environment, let's install the hooks specified in the pre-commit. Execute: `pre-commit install`
2. Now every time you try to commit, the pre-commit lint will run. If you want to do it manually, you can run the command: `pre-commit run --all-files`

## Description

I made a web application that allows to clip youtube videos through a start and end time, passing a custom clip name and a link from video to clip.

## Technologies used

1. React
2. Typescript
3. Tailwind CSS
4. CSS3
5. HTML5
6. Vite

BackEnd:

1. Python -> Flask

Deploy:

1. Docker
2. Nginx
3. Gunicorn

## Libraries used

### Frontend

#### Dependencies

```
"@reduxjs/toolkit": "^2.2.2"
"axios": "^1.6.8"
"react": "^18.2.0"
"react-dom": "^18.2.0"
"react-icons": "^5.0.1"
"react-redux": "^9.1.0"
"react-router-dom": "^6.22.3"
```

#### devDependencies

```
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.2"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^29.5.13"
"@types/node": "^20.10.6"
"@types/react": "^18.3.11"
"@types/react-dom": "^18.3.1"
"@vitejs/plugin-react": "^5.0.2"
"@typescript-eslint/parser": "^7.2.0"
"@typescript-eslint/eslint-plugin": "^7.2.0"
"axios-mock-adapter": "^2.1.0"
"autoprefixer": "^10.4.18"
"eslint": "^8.57.0"
"eslint-plugin-react-hooks": "^4.6.0"
"eslint-plugin-react-refresh": "^0.4.6"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"postcss": "^8.4.37"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.2.5"
"ts-node": "^10.9.2"
"typescript": "^5.2.2"
"vite": "^7.1.7"
```

### Backend

#### Requirements.txt

```
pytubefix==8.8.2
flask==3.1.2
moviepy==2.1.1
pydantic==2.11.9
gunicorn==23.0.0
pre-commit==4.3.0
```

#### Requirements.test.txt

```
pytest==8.4.2
pytest-env==1.1.5
pytest-cov==4.1.0
pytest-timeout==2.3.1
pytest-cov==4.1.0
pytest-xdist==3.5.0

pytest-timeout==2.3.1
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/CutTube`](https://www.diegolibonati.com.ar/#/project/CutTube)

## Video

https://github.com/DiegoLibonati/CutTube/assets/99032604/44d38dd8-bf66-42b0-9240-053b705d2e70

## Testing

### Frontend

1. Join to `cuttube-app` folder
2. Execute: `yarn test` or `npm test`

### Backend

1. Join to the correct path of the clone and join to: `cuttube-api`
2. Execute: `python -m venv venv`
3. Execute in Windows: `venv\Scripts\activate`
4. Execute: `pip install -r requirements.txt`
5. Execute: `pip install -r requirements.test.txt`
6. Execute: `pytest --log-cli-level=INFO`

## Documentation API

### **Version**

```
API VERSION: 0.0.2
README UPDATED: 01/02/2026
AUTHOR: Diego Libonati
```

### **Env Keys**

1. `TZ`: Refers to the timezone setting for the container.
2. `VITE_API_URL`: Refers to the base URL of the backend API the frontend consumes.
3. `HOST`: Refers to the network interface where the backend API listens (e.g., 0.0.0.0 to allow external connections).
4. `PORT`: Refers to the port on which the backend API is exposed.
5. `WORK_DIR`: Refers to the docker working path.

```
# Backend

TZ=America/Argentina/Buenos_Aires

WORK_DIR=/home/app

HOST=0.0.0.0
PORT=5050

# Frontend

VITE_API_URL=http://host.docker.internal:5000
```

### **CutTube Endpoints API**

- **Endpoint Name**: Alive
- **Endpoint Route**: /api/v1/cut/alive
- **Endpoint Method**: GET
- **Endpoint Fn**: This endpoint returns the version, author and name of the api.

---

- **Endpoint Name**: Clip Video
- **Endpoint Route**: /api/v1/cut/<filename>/clip
- **Endpoint Method**: POST
- **Endpoint Fn**: This endpoint downloads the video from youtube, obtains the best stream based on the quality and clips based on the parameters entered through the body.
- **Endpoint Params**: 

```ts
{
  filename: string;
}
```

- **Endpoint Body**:

```ts
{
    url: string;
    start: string;
    end: string;
}
```


---

- **Endpoint Name**: Download Clip
- **Endpoint Route**: /api/v1/cut/<filename>/download
- **Endpoint Method**: GET
- **Endpoint Fn**: This endpoint downloads the clip to the user's browser once the clip has been clicked and exists on the server. The name of the file with the extension .mp4 is entered via the URL.
- **Endpoint Params**: 

```ts
{
  filename: string;
}
```

---

- **Endpoint Name**: Delete Clip
- **Endpoint Route**: /api/v1/cut/<filename>
- **Endpoint Method**: DELETE
- **Endpoint Fn**: This endpoint removes from the server if it exists the clip that is entered via URL based on its name and its .mp4 extension.
- **Endpoint Params**: 

```ts
{
  filename: string;
}
```

## Known Issues