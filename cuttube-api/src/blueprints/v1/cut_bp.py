from typing import Any

import flask

from src.controllers import cut_controller


cut_bp = flask.Blueprint("cut_bp", __name__)


@cut_bp.route("/alive", methods = ["GET"])
def alive() -> dict[str, Any]:
    return cut_controller.alive()


@cut_bp.route("/clip_video", methods = ["POST"])
def clip_video() -> dict[str, Any]:
    return cut_controller.clip_video()


@cut_bp.route("/download/<filename>", methods = ["GET"])
def download_clip(filename: str) -> dict[str, Any]:
    return cut_controller.download_clip(filename=filename)


@cut_bp.route("/remove/<filename>", methods = ["DELETE"])
def remove_clip(filename: str) -> dict[str, Any]:
    return cut_controller.remove_clip(filename=filename)