import flask
import os
import sys

from models.video import Video


def alive() -> dict:
    return flask.make_response({
        "author": "Diego Libonati",
        "API": "Cut Tube API",
        "version": "0.0.1"
    }, 200)


def cut_video() -> dict:

    body = flask.request.get_json()

    url = body.get("url")
    start = body.get("start")
    end = body.get("end")
    cut_name = body.get("cut_name")

    video = Video(
        url = url
    )

    message, load_video = video.get_video_from_youtube()

    if not load_video:
        return flask.make_response({
            "message": str(message),
        }, 400)

    message, load_stream = video.get_better_stream()

    if not load_stream:
        return flask.make_response({
            "message": str(message),
        }, 400)

    video.download_stream()

    if video.can_cut:
        video.cut_video(
            new_filename = cut_name,
            start_time = start,
            end_time = end,           
        )

    return flask.make_response({
        "message": "Video cutted",
        "filename": f"{cut_name}.mp4"
    }, 200)


def download_video(
    filename: str
):
    file_path = f"{os.path.dirname(sys.modules['__main__'].__file__)}/{filename}"

    return flask.send_file(
        file_path,
        as_attachment = True
    )


def remove_clip(
    filename: str
):
    file_path = f"{os.path.dirname(sys.modules['__main__'].__file__)}/{filename}"

    os.remove(
        file_path
    )

    return flask.make_response({
        "message": "Clip removed"
    }, 200)
