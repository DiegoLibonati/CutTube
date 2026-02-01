from unittest.mock import MagicMock, patch

from flask.testing import FlaskClient

from src.constants.codes import (
    CODE_ERROR_VIDEO_TUBE_SERVICE,
    CODE_NOT_FOUND_PATH,
    CODE_SUCCESS_CUT_VIDEO,
    CODE_SUCCESS_DELETE_CLIP,
)


class TestAliveEndpoint:
    def test_alive_returns_200(self, client: FlaskClient) -> None:
        response = client.get("/api/v1/cut/alive")

        assert response.status_code == 200

    def test_alive_returns_correct_structure(self, client: FlaskClient) -> None:
        response = client.get("/api/v1/cut/alive")
        data = response.get_json()

        assert "message" in data
        assert "version_bp" in data
        assert "author" in data
        assert "name_bp" in data

    def test_alive_returns_correct_values(self, client: FlaskClient) -> None:
        response = client.get("/api/v1/cut/alive")
        data = response.get_json()

        assert data["message"] == "I am Alive!"
        assert data["version_bp"] == "2.0.0"
        assert data["author"] == "Diego Libonati"
        assert data["name_bp"] == "Cut"

    def test_alive_returns_json_content_type(self, client: FlaskClient) -> None:
        response = client.get("/api/v1/cut/alive")

        assert response.content_type == "application/json"


class TestClipVideoEndpoint:
    @patch("src.controllers.cut_controller.VideoTubeService")
    def test_clip_video_returns_200_on_success(
        self, mock_video_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_instance = MagicMock()
        mock_instance.get_video_from_youtube.return_value = ("Success", True)
        mock_instance.name = "Test Video"
        mock_instance.filename = "test_filename"
        mock_video_service.return_value = mock_instance

        response = client.post(
            "/api/v1/cut/test_filename/clip",
            json={
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "start": "00:00:10",
                "end": "00:00:20",
            },
        )

        assert response.status_code == 200

    @patch("src.controllers.cut_controller.VideoTubeService")
    def test_clip_video_returns_correct_structure(
        self, mock_video_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_instance = MagicMock()
        mock_instance.get_video_from_youtube.return_value = ("Success", True)
        mock_instance.name = "Test Video"
        mock_instance.filename = "test_filename"
        mock_video_service.return_value = mock_instance

        response = client.post(
            "/api/v1/cut/test_filename/clip",
            json={
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "start": "00:00:10",
                "end": "00:00:20",
            },
        )
        data = response.get_json()

        assert "code" in data
        assert "message" in data
        assert "data" in data
        assert "name" in data["data"]
        assert "filename" in data["data"]

    @patch("src.controllers.cut_controller.VideoTubeService")
    def test_clip_video_returns_correct_code(
        self, mock_video_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_instance = MagicMock()
        mock_instance.get_video_from_youtube.return_value = ("Success", True)
        mock_instance.name = "Test Video"
        mock_instance.filename = "test_filename"
        mock_video_service.return_value = mock_instance

        response = client.post(
            "/api/v1/cut/test_filename/clip",
            json={
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "start": "00:00:10",
                "end": "00:00:20",
            },
        )
        data = response.get_json()

        assert data["code"] == CODE_SUCCESS_CUT_VIDEO

    @patch("src.controllers.cut_controller.VideoTubeService")
    def test_clip_video_returns_409_when_video_load_fails(
        self, mock_video_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_instance = MagicMock()
        mock_instance.get_video_from_youtube.return_value = (
            "Error loading video",
            False,
        )
        mock_video_service.return_value = mock_instance

        response = client.post(
            "/api/v1/cut/test_filename/clip",
            json={
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "start": "00:00:10",
                "end": "00:00:20",
            },
        )

        assert response.status_code == 409

    @patch("src.controllers.cut_controller.VideoTubeService")
    def test_clip_video_returns_conflict_code_when_fails(
        self, mock_video_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_instance = MagicMock()
        mock_instance.get_video_from_youtube.return_value = (
            "Error loading video",
            False,
        )
        mock_video_service.return_value = mock_instance

        response = client.post(
            "/api/v1/cut/test_filename/clip",
            json={
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "start": "00:00:10",
                "end": "00:00:20",
            },
        )
        data = response.get_json()

        assert data["code"] == CODE_ERROR_VIDEO_TUBE_SERVICE

    def test_clip_video_returns_400_with_invalid_body(
        self, client: FlaskClient
    ) -> None:
        response = client.post(
            "/api/v1/cut/test_filename/clip",
            json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
        )

        assert response.status_code == 400

    def test_clip_video_returns_400_with_empty_body(self, client: FlaskClient) -> None:
        response = client.post("/api/v1/cut/test_filename/clip", json={})

        assert response.status_code == 400

    @patch("src.controllers.cut_controller.VideoTubeService")
    def test_clip_video_calls_generate_clip(
        self, mock_video_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_instance = MagicMock()
        mock_instance.get_video_from_youtube.return_value = ("Success", True)
        mock_instance.name = "Test Video"
        mock_instance.filename = "test_filename"
        mock_video_service.return_value = mock_instance

        client.post(
            "/api/v1/cut/test_filename/clip",
            json={
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "start": "00:00:10",
                "end": "00:00:20",
            },
        )

        mock_instance.generate_clip.assert_called_once_with(
            start_time="00:00:10",
            end_time="00:00:20",
        )


class TestDownloadClipEndpoint:
    @patch("src.controllers.cut_controller.FileService")
    @patch("src.controllers.cut_controller.send_file")
    def test_download_clip_returns_file_on_success(
        self,
        mock_send_file: MagicMock,
        mock_file_service: MagicMock,
        client: FlaskClient,
    ) -> None:
        mock_file_service.path_exists.return_value = True
        mock_send_file.return_value = MagicMock(status_code=200)

        client.get("/api/v1/cut/test_filename/download")

        assert mock_send_file.called

    @patch("src.controllers.cut_controller.FileService")
    def test_download_clip_returns_404_when_file_not_found(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = False

        response = client.get("/api/v1/cut/test_filename/download")

        assert response.status_code == 404

    @patch("src.controllers.cut_controller.FileService")
    def test_download_clip_returns_not_found_code(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = False

        response = client.get("/api/v1/cut/test_filename/download")
        data = response.get_json()

        assert data["code"] == CODE_NOT_FOUND_PATH


class TestRemoveClipEndpoint:
    @patch("src.controllers.cut_controller.FileService")
    def test_remove_clip_returns_200_on_success(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = True
        mock_file_service.remove_file.return_value = None

        response = client.delete("/api/v1/cut/test_filename")

        assert response.status_code == 200

    @patch("src.controllers.cut_controller.FileService")
    def test_remove_clip_returns_correct_structure(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = True
        mock_file_service.remove_file.return_value = None

        response = client.delete("/api/v1/cut/test_filename")
        data = response.get_json()

        assert "code" in data
        assert "message" in data

    @patch("src.controllers.cut_controller.FileService")
    def test_remove_clip_returns_correct_code(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = True
        mock_file_service.remove_file.return_value = None

        response = client.delete("/api/v1/cut/test_filename")
        data = response.get_json()

        assert data["code"] == CODE_SUCCESS_DELETE_CLIP

    @patch("src.controllers.cut_controller.FileService")
    def test_remove_clip_returns_404_when_file_not_found(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = False

        response = client.delete("/api/v1/cut/test_filename")

        assert response.status_code == 404

    @patch("src.controllers.cut_controller.FileService")
    def test_remove_clip_returns_not_found_code(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = False

        response = client.delete("/api/v1/cut/test_filename")
        data = response.get_json()

        assert data["code"] == CODE_NOT_FOUND_PATH

    @patch("src.controllers.cut_controller.FileService")
    def test_remove_clip_calls_remove_file(
        self, mock_file_service: MagicMock, client: FlaskClient
    ) -> None:
        mock_file_service.path_exists.return_value = True
        mock_file_service.remove_file.return_value = None

        client.delete("/api/v1/cut/test_filename")

        mock_file_service.remove_file.assert_called_once()
