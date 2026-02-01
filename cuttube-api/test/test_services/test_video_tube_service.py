import os
import tempfile
from unittest.mock import MagicMock, patch

import pytest

from src.services.video_tube_service import VideoTubeService


class TestVideoTubeServiceInit:
    @patch("src.services.video_tube_service.FileService")
    def test_init_sets_url(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        assert service.url == "https://www.youtube.com/watch?v=test"

    @patch("src.services.video_tube_service.FileService")
    def test_init_sets_filename(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        assert service.filename == "test_file"

    @patch("src.services.video_tube_service.FileService")
    def test_init_name_is_none(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        assert service.name is None

    @patch("src.services.video_tube_service.FileService")
    def test_init_duration_is_zero(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        assert service.duration == 0

    @patch("src.services.video_tube_service.FileService")
    def test_init_generates_folders(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = False

        VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        assert mock_file_service.make_dirs.called

    @patch("src.services.video_tube_service.FileService")
    def test_init_does_not_create_existing_folders(
        self, mock_file_service: MagicMock
    ) -> None:
        mock_file_service.path_exists.return_value = True

        VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        mock_file_service.make_dirs.assert_not_called()


class TestVideoTubeServiceGetVideoFromYoutube:
    @patch("src.services.video_tube_service.FileService")
    def test_invalid_url_returns_false(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://invalid-url.com/video", filename="test_file"
        )

        message, status = service.get_video_from_youtube()

        assert status is False
        assert "unavailable" in message.lower()

    @patch("src.services.video_tube_service.FileService")
    def test_invalid_url_without_watch_returns_false(
        self, mock_file_service: MagicMock
    ) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/shorts/abc123", filename="test_file"
        )

        message, status = service.get_video_from_youtube()

        assert status is False

    @patch("src.services.video_tube_service.YouTube")
    @patch("src.services.video_tube_service.FileService")
    def test_valid_url_returns_true(
        self, mock_file_service: MagicMock, mock_youtube: MagicMock
    ) -> None:
        mock_file_service.path_exists.return_value = True

        mock_video = MagicMock()
        mock_video.length = 120
        mock_stream = MagicMock()
        mock_video.streams.filter.return_value.order_by.return_value.desc.return_value.first.return_value = (
            mock_stream
        )
        mock_youtube.return_value = mock_video

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test123", filename="test_file"
        )

        message, status = service.get_video_from_youtube()

        assert status is True
        assert "correct" in message.lower()

    @patch("src.services.video_tube_service.YouTube")
    @patch("src.services.video_tube_service.FileService")
    def test_sets_duration_from_video(
        self, mock_file_service: MagicMock, mock_youtube: MagicMock
    ) -> None:
        mock_file_service.path_exists.return_value = True

        mock_video = MagicMock()
        mock_video.length = 300
        mock_stream = MagicMock()
        mock_video.streams.filter.return_value.order_by.return_value.desc.return_value.first.return_value = (
            mock_stream
        )
        mock_youtube.return_value = mock_video

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test123", filename="test_file"
        )

        service.get_video_from_youtube()

        assert service.duration == 300


class TestVideoTubeServiceGetBetterStream:
    @patch("src.services.video_tube_service.FileService")
    def test_raises_error_for_no_streams(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        with pytest.raises(ValueError) as exc_info:
            service.get_better_stream(streams=None)

        assert "must enter streams" in str(exc_info.value).lower()

    @patch("src.services.video_tube_service.FileService")
    def test_raises_error_for_empty_streams(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        with pytest.raises(ValueError):
            service.get_better_stream(streams=[])

    @patch("src.services.video_tube_service.FileService")
    def test_filters_progressive_streams(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        mock_streams = MagicMock()
        mock_stream = MagicMock()
        mock_streams.filter.return_value.order_by.return_value.desc.return_value.first.return_value = (
            mock_stream
        )

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        result = service.get_better_stream(streams=mock_streams)

        mock_streams.filter.assert_called_once_with(
            progressive=True, file_extension="mp4"
        )
        assert result == mock_stream


class TestVideoTubeServiceDownloadStream:
    @patch("src.services.video_tube_service.FileService")
    def test_raises_error_without_filename(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename=""
        )

        with pytest.raises(ValueError) as exc_info:
            service.download_stream()

        assert "valid file name" in str(exc_info.value).lower()

    @patch("src.services.video_tube_service.FileService")
    def test_raises_error_without_stream(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        with pytest.raises(ValueError) as exc_info:
            service.download_stream()

        assert "no valid stream" in str(exc_info.value).lower()


class TestVideoTubeServiceGenerateClip:
    @patch("src.services.video_tube_service.FileService")
    def test_raises_error_without_can_clip(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test_file"
        )

        service._VideoTubeService__stream = MagicMock()

        with pytest.raises(AssertionError) as exc_info:
            service.generate_clip(start_time="00:00:10", end_time="00:00:20")

        assert "cannot be generated" in str(exc_info.value).lower()


class TestVideoTubeServiceProperties:
    @patch("src.services.video_tube_service.FileService")
    def test_url_property(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        url = "https://www.youtube.com/watch?v=abc123"
        service = VideoTubeService(url=url, filename="test")

        assert service.url == url

    @patch("src.services.video_tube_service.FileService")
    def test_filename_property(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="my_filename"
        )

        assert service.filename == "my_filename"

    @patch("src.services.video_tube_service.FileService")
    def test_name_property_initially_none(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test"
        )

        assert service.name is None

    @patch("src.services.video_tube_service.FileService")
    def test_duration_property_initially_zero(
        self, mock_file_service: MagicMock
    ) -> None:
        mock_file_service.path_exists.return_value = True

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test", filename="test"
        )

        assert service.duration == 0


class TestVideoTubeServiceCustomFolders:
    @patch("src.services.video_tube_service.FileService")
    def test_custom_folder_download(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = False

        with tempfile.TemporaryDirectory() as tmp_dir:
            custom_download = os.path.join(tmp_dir, "custom_download")

            VideoTubeService(
                url="https://www.youtube.com/watch?v=test",
                filename="test",
                folder_download=custom_download,
            )

            call_args = [
                call[0][0] for call in mock_file_service.make_dirs.call_args_list
            ]
            assert custom_download in call_args

    @patch("src.services.video_tube_service.FileService")
    def test_custom_folder_clips(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = False

        with tempfile.TemporaryDirectory() as tmp_dir:
            custom_clips = os.path.join(tmp_dir, "custom_clips")

            VideoTubeService(
                url="https://www.youtube.com/watch?v=test",
                filename="test",
                folder_clips=custom_clips,
            )

            call_args = [
                call[0][0] for call in mock_file_service.make_dirs.call_args_list
            ]
            assert custom_clips in call_args

    @patch("src.services.video_tube_service.FileService")
    def test_custom_extension(self, mock_file_service: MagicMock) -> None:
        mock_file_service.path_exists.return_value = True

        mock_streams = MagicMock()
        mock_streams.filter.return_value.order_by.return_value.desc.return_value.first.return_value = (
            MagicMock()
        )

        service = VideoTubeService(
            url="https://www.youtube.com/watch?v=test",
            filename="test",
            extension="webm",
        )

        service.get_better_stream(streams=mock_streams)

        mock_streams.filter.assert_called_once_with(
            progressive=True, file_extension="webm"
        )
