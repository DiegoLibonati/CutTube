import logging
import shutil
from test.constants import (
    ROOT_PATH_YT_FOLDERS,
    TEST_BODY_CLIP,
    TEST_STREAMS,
    TEST_VIDEOTUBE_MOCK,
)

import pytest
from flask import Blueprint, Flask, Response, jsonify
from flask.testing import FlaskClient
from pydantic import BaseModel
from pytubefix import Stream

from app import create_app
from src.services.file_service import FileService
from src.utils.error_handler import handle_exceptions
from src.utils.exceptions import ValidationAPIError

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


@pytest.fixture(scope="session")
def flask_app() -> Flask:
    app = create_app()
    return app


@pytest.fixture(scope="session")
def flask_client(flask_app: Flask) -> FlaskClient:
    return flask_app.test_client()


@pytest.fixture
def error_app() -> FlaskClient:
    app = Flask(__name__)
    bp = Blueprint("test_errors", __name__)

    @bp.route("/base-api-error")
    @handle_exceptions
    def raise_base_api_error() -> None:
        raise ValidationAPIError(message="Custom API error")

    @bp.route("/pydantic-error")
    @handle_exceptions
    def raise_pydantic_error() -> Response:
        class Model(BaseModel):
            x: int

        Model(x="not-an-int")
        return jsonify({"ok": True})

    @bp.route("/generic-error")
    @handle_exceptions
    def raise_generic_error() -> None:
        raise RuntimeError("Unexpected failure")

    @bp.route("/no-error")
    @handle_exceptions
    def no_error() -> Response:
        return jsonify({"ok": True})

    app.register_blueprint(bp)
    return app.test_client()


@pytest.fixture(scope="session")
def videotube_mock() -> dict[str, str]:
    return TEST_VIDEOTUBE_MOCK


@pytest.fixture(scope="session")
def streams_mock() -> list[Stream]:
    return TEST_STREAMS


@pytest.fixture(scope="session")
def body_clip() -> dict[str, str]:
    return TEST_BODY_CLIP


@pytest.fixture(scope="session", autouse=True)
def cleanup_dir_after_tests():
    yield

    if FileService.path_exists(ROOT_PATH_YT_FOLDERS):
        shutil.rmtree(ROOT_PATH_YT_FOLDERS, ignore_errors=True)
