import os
from pathlib import Path
from typing import Generator

import pytest
from flask import Flask
from flask.testing import FlaskClient
from pytubefix import Stream, YouTube

from app import create_app

ROOT_PATH_TEST = Path(__file__).resolve().parent
ROOT_PATH_YT_FOLDERS = os.path.join(ROOT_PATH_TEST, "yt_folders")
CLIPS_FOLDER = os.path.join(ROOT_PATH_YT_FOLDERS, "clips")


@pytest.fixture(scope="function")
def app() -> Generator[Flask, None, None]:
    application = create_app("testing")
    application.config["TESTING"] = True

    with application.app_context():
        yield application


@pytest.fixture(scope="function")
def client(app: Flask) -> FlaskClient:
    return app.test_client()


# ============================================================================
# Test data fixtures
# ============================================================================


@pytest.fixture
def sample_clip_filename() -> str:
    return "test_filename"


@pytest.fixture
def sample_videotube(sample_clip_filename: str) -> dict[str, str]:
    return {
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "filename": sample_clip_filename,
        "folder_download": f"{ROOT_PATH_YT_FOLDERS}/download",
        "folder_clips": f"{ROOT_PATH_YT_FOLDERS}/clips",
    }


@pytest.fixture
def sample_body_clip() -> dict[str, str]:
    return {
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "start": "00:00:10",
        "end": "00:00:20",
    }


@pytest.fixture
def sample_streams(sample_videotube: dict[str, str]) -> list[Stream]:
    return YouTube(sample_videotube.get("url")).streams
