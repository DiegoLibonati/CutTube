import os
from pathlib import Path

from config.config import Config

BASE_DIR = Path(__file__).resolve().parent.parent

ASSETS_DIR = os.path.join(BASE_DIR, "assets")

FOLDER_DOWNLOAD = os.path.join(ASSETS_DIR, "download")
FOLDER_CLIPS = os.path.join(ASSETS_DIR, "clips")

FOLDER_DOWNLOAD_DOCKER = os.path.join(Config.WORK_DIR, "src", "assets", "download")
FOLDER_CLIPS_DOCKER = os.path.join(Config.WORK_DIR, "src", "assets", "clips")
