import logging

from flask import Flask
from flask import Response

from test.constants import BLUEPRINTS


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def test_alive_cut(flask_client: Flask) -> None:
    response: Response = flask_client.get(f"{BLUEPRINTS['cut']}/alive")
    result = response.json
    status_code = response.status_code

    author = result.get("author")
    api = result.get("API")
    version = result.get("version")

    assert status_code == 200
    assert author == "Diego Libonati"
    assert api == "Cut Tube API"
    assert version == "0.0.2"


def test_clip_and_download(flask_client: Flask, body_clip: dict[str, str]) -> None:
    # Clip
    clip_name = body_clip.get("cut_name")

    response: Response = flask_client.post(f"{BLUEPRINTS['cut']}/clip_video", json=body_clip)

    result = response.json
    status_code = response.status_code

    message = result.get("message")
    filename = result.get("filename")

    assert status_code == 200
    assert message == "Video cutted."
    assert clip_name in filename

    # Download
    response: Response = flask_client.get(f"{BLUEPRINTS['cut']}/download/{filename}")

    status_code = response.status_code

    assert status_code == 200
    assert response.headers["Content-Disposition"].startswith("attachment")

