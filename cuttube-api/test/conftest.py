import logging

import pytest

from flask import Flask
from flask.testing import FlaskClient
from pytubefix import Stream

from src.app import app as api_app
from src.app import init
from src.models.VideoTube import VideoTube

from test.constants import TEST_VIDEOTUBE_MOCK
from test.constants import TEST_STREAMS
from test.constants import TEST_BODY_CLIP


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


# FLAKS FIXTURES
@pytest.fixture(scope="session")
def flask_app() -> Flask:
    app = api_app
    init()
    return app


@pytest.fixture(scope="session")
def flask_client(flask_app: Flask) -> FlaskClient:
    return flask_app.test_client()

# Mocks
@pytest.fixture(scope="session")
def videotube_mock() -> dict[str, str]:
    return TEST_VIDEOTUBE_MOCK


@pytest.fixture(scope="session")
def streams_mock() -> list[Stream]:
    return TEST_STREAMS


# Bodys
@pytest.fixture(scope="session")
def body_clip() -> dict[str, str]:
    return TEST_BODY_CLIP


# Class
@pytest.fixture(scope="session")
def videotube_model(videotube_mock: dict[str, str]) -> VideoTube:
    return VideoTube(**videotube_mock)