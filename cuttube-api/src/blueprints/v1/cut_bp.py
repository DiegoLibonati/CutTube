import flask

from controllers import cut_controller


cut_bp = flask.Blueprint(
    "cut_bp",
    __name__
)


@cut_bp.route("/alive", methods = ["GET"])
def alive():
    return cut_controller.alive()


@cut_bp.route("/cut_video", methods = ["POST"])
def cut_video():
    return cut_controller.cut_video()


@cut_bp.route("/download/<filename>", methods = ["GET"])
def download_video(
    filename: str
):
    return cut_controller.download_video(filename)


@cut_bp.route("/remove/<filename>", methods = ["DELETE"])
def remove_clip(
    filename: str
):
    return cut_controller.remove_clip(filename)