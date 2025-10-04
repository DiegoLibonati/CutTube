import os
from test.constants import BLUEPRINTS, CLIP_FILENAME, ROOT_PATH_YT_FOLDERS
from typing import Any
from unittest.mock import MagicMock, patch

from flask import Response
from flask.testing import FlaskClient

from src.constants.codes import (
    CODE_NOT_FOUND_PATH,
    CODE_SUCCESS_CUT_VIDEO,
    CODE_SUCCESS_DELETE_CLIP,
)
from src.constants.messages import (
    MESSAGE_NOT_FOUND_PATH,
    MESSAGE_SUCCESS_CUT_VIDEO,
    MESSAGE_SUCCESS_DELETE_CLIP,
)
from src.constants.vars import CLIP_EXTENSION
from src.services.file_service import FileService


def test_alive(flask_client: FlaskClient) -> None:
    response: Response = flask_client.get(f"{BLUEPRINTS['cut']}/alive")

    assert response.status_code == 200

    data: dict[str, Any] = response.get_json()

    assert data["message"] == "I am Alive!"
    assert data["author"] == "Diego Libonati"
    assert data["version_bp"] == "2.0.0"
    assert data["name_bp"] == "Cut"


@patch("src.controllers.cut_controller.VideoTubeService")
def test_clip_video_success(
    mock_service: MagicMock, flask_client: FlaskClient, body_clip: dict[str, str]
) -> None:
    instance: MagicMock = MagicMock()
    instance.get_video_from_youtube.return_value = ("ok", True)
    instance.generate_clip.return_value = None
    instance.filename = CLIP_FILENAME
    instance.name = f"{CLIP_FILENAME}.{CLIP_EXTENSION}"
    mock_service.return_value = instance

    response: Response = flask_client.post(
        f"{BLUEPRINTS['cut']}/{CLIP_FILENAME}/clip", json=body_clip
    )

    assert response.status_code == 200

    data: dict[str, Any] = response.get_json()

    assert data["message"] == MESSAGE_SUCCESS_CUT_VIDEO
    assert data["code"] == CODE_SUCCESS_CUT_VIDEO
    assert data["data"]["filename"] == CLIP_FILENAME


@patch("src.controllers.cut_controller.VideoTubeService")
def test_clip_video_failure(
    mock_service: MagicMock, flask_client: FlaskClient, body_clip: dict[str, str]
) -> None:
    instance: MagicMock = MagicMock()
    instance.get_video_from_youtube.return_value = ("error", False)
    mock_service.return_value = instance

    response: Response = flask_client.post(
        f"{BLUEPRINTS['cut']}/{CLIP_FILENAME}/clip", json=body_clip
    )

    assert response.status_code == 409

    data: dict[str, Any] = response.get_json()

    assert "error" in str(data)


def test_download_clip_in_fs(monkeypatch, flask_client: FlaskClient) -> None:
    monkeypatch.setattr(
        "src.controllers.cut_controller.FOLDER_CLIPS", ROOT_PATH_YT_FOLDERS
    )

    file_path: str = os.path.join(
        ROOT_PATH_YT_FOLDERS, f"{CLIP_FILENAME}.{CLIP_EXTENSION}"
    )
    FileService.make_dirs(ROOT_PATH_YT_FOLDERS)

    with open(file_path, "wb") as f:
        f.write(b"test-content")

    response: Response = flask_client.get(
        f"{BLUEPRINTS['cut']}/{CLIP_FILENAME}/download"
    )

    content = response.data

    assert response.status_code == 200
    assert content == b"test-content"

    response.close()
    FileService.remove_file(file_path)


def test_download_clip_not_found(monkeypatch, flask_client: FlaskClient) -> None:
    monkeypatch.setattr(
        "src.controllers.cut_controller.FOLDER_CLIPS", ROOT_PATH_YT_FOLDERS
    )

    filename: str = "non_existent"
    response: Response = flask_client.get(f"{BLUEPRINTS['cut']}/{filename}/download")

    assert response.status_code == 404
    data: dict[str, Any] = response.get_json()

    assert data["code"] == CODE_NOT_FOUND_PATH
    assert data["message"] == MESSAGE_NOT_FOUND_PATH


@patch("src.controllers.cut_controller.FileService.remove_file")
def test_remove_clip_in_fs(
    mock_remove: MagicMock, monkeypatch, flask_client: FlaskClient
) -> None:
    monkeypatch.setattr(
        "src.controllers.cut_controller.FOLDER_CLIPS", ROOT_PATH_YT_FOLDERS
    )

    file_path: str = os.path.join(
        ROOT_PATH_YT_FOLDERS, f"{CLIP_FILENAME}.{CLIP_EXTENSION}"
    )
    FileService.make_dirs(ROOT_PATH_YT_FOLDERS, exist_ok=True)

    with open(file_path, "wb") as f:
        f.write(b"delete-me")

    response: Response = flask_client.delete(f"{BLUEPRINTS['cut']}/{CLIP_FILENAME}")

    assert response.status_code == 200
    data: dict[str, Any] = response.get_json()

    assert data["code"] == CODE_SUCCESS_DELETE_CLIP
    assert data["message"] == MESSAGE_SUCCESS_DELETE_CLIP

    mock_remove.assert_called_once_with(file_path)


def test_remove_clip_not_found(monkeypatch, flask_client: FlaskClient) -> None:
    monkeypatch.setattr(
        "src.controllers.cut_controller.FOLDER_CLIPS", ROOT_PATH_YT_FOLDERS
    )

    filename: str = "non_existent"
    response: Response = flask_client.delete(f"{BLUEPRINTS['cut']}/{filename}")

    assert response.status_code == 404
    data: dict[str, Any] = response.get_json()

    assert data["code"] == CODE_NOT_FOUND_PATH
    assert data["message"] == MESSAGE_NOT_FOUND_PATH
