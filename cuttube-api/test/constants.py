import os
from pathlib import Path

from pytubefix import YouTube

ROOT_PATH_TEST = Path(__file__).resolve().parent
ROOT_PATH_YT_FOLDERS = os.path.join(ROOT_PATH_TEST, "yt_folders")

TEST_VIDEOTUBE_MOCK = {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "filename": "filecito",
    "folder_download": f"{ROOT_PATH_YT_FOLDERS}/download",
    "folder_clips": f"{ROOT_PATH_YT_FOLDERS}/clips",
}

TEST_STREAMS = YouTube(TEST_VIDEOTUBE_MOCK.get("url")).streams

TEST_BODY_CLIP = {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "start": "00:00:10",
    "end": "00:00:20",
}

BLUEPRINTS = {"cut": "/api/v1/cut"}

CLIP_FILENAME = "test_filename"
