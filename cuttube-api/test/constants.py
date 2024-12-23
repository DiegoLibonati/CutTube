from pytubefix import YouTube

ROOT_PATH = "D:/Programacion/Proyectos propios/CutTube/CutTube/cuttube-api"
ROOT_PATH_VIDEO_TUBE = f"{ROOT_PATH}/test/videotube_folders"

TEST_VIDEOTUBE_MOCK = {
    "url": "https://www.youtube.com/watch?v=joHCGlzxi8U&ab_channel=FeidVEVO",
    "filename": "filecito",
    "folder_download": f"{ROOT_PATH_VIDEO_TUBE}/download",
    "folder_clips": f"{ROOT_PATH_VIDEO_TUBE}/clips",
}

TEST_STREAMS = YouTube(TEST_VIDEOTUBE_MOCK.get("url")).streams

TEST_BODY_CLIP = {
    "url": "https://www.youtube.com/watch?v=joHCGlzxi8U&ab_channel=FeidVEVO",
    "start": "00:00:10",
    "end": "00:00:20",
    "cut_name": "file",
}

BLUEPRINTS = {
    "cut": "/v1/cut"
}