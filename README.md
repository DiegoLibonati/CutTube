# CutTube

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Join to `cuttube-app` folder and execute: `npm install` or `yarn install` in the terminal
3. Go to the previous folder and execute: `docker-compose build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

## Description

I made a web application that allows to clip youtube videos through a start and end time, passing a custom clip name and a link from video to clip.

## Technologies used

1. React JS
2. Flask
3. Python
4. Typescript
5. Tailwind CSS
6. Docker

## Libraries used

### Frontend

#### Dependencies

```
"@types/jest": "^29.5.13"
"@types/node": "^20.10.6"
"@types/react": "^18.3.11"
"@types/react-dom": "^18.3.1"
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
"@vitejs/plugin-react": "^4.2.1"
"@typescript-eslint/parser": "^7.2.0"
"@typescript-eslint/eslint-plugin": "^7.2.0"
"eslint": "^8.57.0"
"eslint-plugin-react-hooks": "^4.6.0"
"eslint-plugin-react-refresh": "^0.4.6"
"typescript": "^5.2.2"
"vite": "^5.2.0"
"autoprefixer": "^10.4.18"
"postcss": "^8.4.37"
"tailwindcss": "^3.4.1"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"ts-jest": "^29.2.5"
"axios-mock-adapter": "^2.1.0"
```

### Backend

#### Requirements.txt

```
pytubefix==8.8.2
flask==3.1.0
moviepy==2.1.1
```

#### Requirements.test.txt

```
pytest
pytest-env
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
README UPDATED: 22/12/2024
AUTHOR: Diego Libonati
```

### **Env Keys**

```
THERE IS NOT ENV KEYS.
```
 
## **Cut Blueprint**

- **Endpoint Name**: Alive
- **Endpoint Route**: /v1/cut/alive
- **Endpoint Method**: GET
- **Endpoint Fn**: This endpoint returns the version, author and name of the api.

-----

- **Endpoint Name**: Clip Video
- **Endpoint Route**: /v1/cut/clip_video
- **Endpoint Method**: POST
- **Endpoint Fn**: This endpoint downloads the video from youtube, obtains the best stream based on the quality and clips based on the parameters entered through the body.

-----

- **Endpoint Name**: Download Video
- **Endpoint Route**: /v1/cut/download/<-filename->
- **Endpoint Method**: GET
- **Endpoint Fn**: This endpoint downloads the clip to the user's browser once the clip has been clicked and exists on the server. The name of the file with the extension .mp4 is entered via the URL.

-----

- **Endpoint Name**: Alive
- **Endpoint Route**: /v1/cut/remove/<-filename->
- **Endpoint Method**: DELETE
- **Endpoint Fn**: This endpoint removes from the server if it exists the clip that is entered via URL based on its name and its .mp4 extension.
