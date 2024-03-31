import flask
import os

from blueprints.v1.cut_bp import cut_bp


app = flask.Flask(__name__)


def on_init() -> None:
    app.logger.error("Init CutTube API")
    # Load Routes
    app.register_blueprint(
        cut_bp,
        url_prefix = "/v1/cut"
    )

    # Configs
    app.run(
        host = "0.0.0.0",
        port = os.getenv("API_PORT"),
        debug = True
    )

    return


if __name__ == "__main__":
    on_init()