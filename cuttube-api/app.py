import importlib

from flask import Flask

from config.logger_config import setup_logger
from src.blueprints.routes import register_routes

logger = setup_logger()


def create_app(config_name="development") -> None:
    app = Flask(__name__)

    config_module = importlib.import_module(f"config.{config_name}_config")
    app.config.from_object(config_module.__dict__[f"{config_name.capitalize()}Config"])

    register_routes(app)
    logger.info("Routes initialized successfully.")

    return app


if __name__ == "__main__":
    app = create_app("development")

    logger.info("Starting Flask application.")
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug=app.config["DEBUG"])
