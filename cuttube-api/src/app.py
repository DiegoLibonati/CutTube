import flask

from src.blueprints.v1.cut_bp import cut_bp


app = flask.Flask(__name__)


def load_blueprints() -> None:
   app.register_blueprint(cut_bp, url_prefix = "/v1/cut")


def init() -> None:
    app.logger.error("Init CutTube API")

    # Load Routes
    load_blueprints()


if __name__ == "__main__":
    init()
    app.run(debug=True, host="0.0.0.0", port=5000)
    