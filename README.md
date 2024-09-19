# CutTube

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Go to the folder where you cloned your repository
3. Run `docker-compose build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose up`
5. You have to be standing in the folder containing the: `docker-compose.yml`

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

1. Pytube
2. Moviepy
3. Axios
4. React redux - Redux toolkit
5. React router dom

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/CutTube`](https://www.diegolibonati.com.ar/#/project/CutTube)

## Video

https://github.com/DiegoLibonati/CutTube/assets/99032604/44d38dd8-bf66-42b0-9240-053b705d2e70

## Documentation API
 
### **Version**

```
API VERSION: 0.0.1
README UPDATED: 31/03/2024
AUTHOR: Diego Libonati
```

### **Env Keys**

```
API_PORT=5000 -> A number representing the API Port
```
 
## **Cut Blueprint**

- **Endpoint Name**: Alive
- **Endpoint Route**: /v1/cut/alive
- **Endpoint Method**: GET
- **Endpoint Fn**: This endpoint returns the version, author and name of the api.

-----

- **Endpoint Name**: Cut Video
- **Endpoint Route**: /v1/cut/cut_video
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
