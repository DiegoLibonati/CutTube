import os
from typing import Any

import flask

from src.models.VideoTube import VideoTube
from src.utils.constants import FOLDER_DOWNLOAD_DOCKER
from src.utils.constants import FOLDER_CLIPS_DOCKER


def alive() -> dict[str, Any]:
    return flask.make_response({
        "author": "Diego Libonati",
        "API": "Cut Tube API",
        "version": "0.0.2"
    }, 200)


def clip_video() -> dict[str, Any]:
    body = flask.request.get_json()

    url = body.get("url")
    start = body.get("start")
    end = body.get("end")
    cut_name = body.get("cut_name")

    video = VideoTube(
        url=url,
        filename=cut_name,
        folder_clips=FOLDER_CLIPS_DOCKER,
        folder_download=FOLDER_DOWNLOAD_DOCKER
    )

    message, load_video = video.get_video_from_youtube()

    if not load_video:
        return flask.make_response({
            "message": str(message),
        }, 400)

    video.download_stream()

    video.generate_clip(
        start_time=start,
        end_time=end,       
    )

    return flask.make_response({
        "message": "Video cutted.",
        "filename": f"{video.filename}.mp4"
    }, 200)


def download_clip(filename: str) -> dict[str, Any]:
    file_path = f"{FOLDER_CLIPS_DOCKER}/{filename}"

    return flask.send_file(file_path, as_attachment=True)


def remove_clip(filename: str) -> dict[str, Any]:
    file_path = f"{FOLDER_CLIPS_DOCKER}/{filename}"

    os.remove(file_path)

    return flask.make_response({
        "message": "Clip removed."
    }, 200)
