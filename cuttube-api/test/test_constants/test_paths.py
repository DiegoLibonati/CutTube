import os

from src.constants.paths import (
    ASSETS_DIR,
    BASE_DIR,
    FOLDER_CLIPS,
    FOLDER_CLIPS_DOCKER,
    FOLDER_DOWNLOAD,
    FOLDER_DOWNLOAD_DOCKER,
)


class TestBasePaths:
    def test_base_dir_is_path(self) -> None:
        assert BASE_DIR is not None

    def test_base_dir_exists(self) -> None:
        assert os.path.exists(BASE_DIR)

    def test_assets_dir_contains_assets(self) -> None:
        assert "assets" in ASSETS_DIR


class TestLocalPaths:
    def test_folder_download_contains_download(self) -> None:
        assert "download" in FOLDER_DOWNLOAD

    def test_folder_clips_contains_clips(self) -> None:
        assert "clips" in FOLDER_CLIPS

    def test_folder_download_is_inside_assets(self) -> None:
        assert ASSETS_DIR in FOLDER_DOWNLOAD

    def test_folder_clips_is_inside_assets(self) -> None:
        assert ASSETS_DIR in FOLDER_CLIPS


class TestDockerPaths:
    def test_folder_download_docker_contains_download(self) -> None:
        assert "download" in FOLDER_DOWNLOAD_DOCKER

    def test_folder_clips_docker_contains_clips(self) -> None:
        assert "clips" in FOLDER_CLIPS_DOCKER

    def test_folder_download_docker_contains_assets(self) -> None:
        assert "assets" in FOLDER_DOWNLOAD_DOCKER

    def test_folder_clips_docker_contains_assets(self) -> None:
        assert "assets" in FOLDER_CLIPS_DOCKER


class TestPathsAreStrings:
    def test_assets_dir_is_string(self) -> None:
        assert isinstance(ASSETS_DIR, str)

    def test_folder_download_is_string(self) -> None:
        assert isinstance(FOLDER_DOWNLOAD, str)

    def test_folder_clips_is_string(self) -> None:
        assert isinstance(FOLDER_CLIPS, str)

    def test_folder_download_docker_is_string(self) -> None:
        assert isinstance(FOLDER_DOWNLOAD_DOCKER, str)

    def test_folder_clips_docker_is_string(self) -> None:
        assert isinstance(FOLDER_CLIPS_DOCKER, str)
