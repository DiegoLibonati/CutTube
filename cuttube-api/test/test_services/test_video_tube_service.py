from typing import Any
from unittest.mock import MagicMock, patch

import pytest
from pytubefix import exceptions

from src.services.file_service import FileService
from src.services.video_tube_service import VideoTubeService


def test_init_creates_folders(monkeypatch: Any) -> None:
    make_dirs_called: list[str] = []

    monkeypatch.setattr(FileService, "path_exists", lambda _: False)
    monkeypatch.setattr(
        FileService,
        "make_dirs",
        lambda path, exist_ok=True: make_dirs_called.append(path),
    )

    _ = VideoTubeService(url="http://test", filename="file")
    assert make_dirs_called


def test_get_video_from_youtube_invalid_url() -> None:
    service: VideoTubeService = VideoTubeService(url="http://invalid", filename="f")
    msg, status = service.get_video_from_youtube()
    assert status is False
    assert "unavailable" in str(msg).lower()


@patch("src.services.video_tube_service.YouTube")
def test_get_video_from_youtube_success(mock_yt: MagicMock) -> None:
    fake_video: MagicMock = MagicMock()
    fake_video.streams = MagicMock()
    fake_video.length = 120
    mock_yt.return_value = fake_video

    service: VideoTubeService = VideoTubeService(
        url="https://www.youtube.com/watch?v=123", filename="f"
    )
    msg, status = service.get_video_from_youtube()

    assert status is True
    assert msg == "Correct URL."
    assert service.duration == 120
    assert service._VideoTubeService__stream is not None


@patch("src.services.video_tube_service.YouTube")
def test_get_video_from_youtube_unavailable(mock_yt: MagicMock) -> None:
    mock_yt.side_effect = exceptions.VideoUnavailable(video_id="123")

    service: VideoTubeService = VideoTubeService(
        url="https://www.youtube.com/watch?v=123", filename="f"
    )
    msg, status = service.get_video_from_youtube()

    assert status is False
    assert "unavaialable" in str(msg).lower()


def test_get_better_stream_no_streams() -> None:
    service: VideoTubeService = VideoTubeService(url="http://x", filename="f")
    with pytest.raises(ValueError):
        service.get_better_stream(None)


def test_download_stream_no_filename() -> None:
    service: VideoTubeService = VideoTubeService(url="http://x", filename="")
    with pytest.raises(ValueError):
        service.download_stream()


def test_download_stream_no_stream() -> None:
    service: VideoTubeService = VideoTubeService(url="http://x", filename="f")
    with pytest.raises(ValueError):
        service.download_stream()


def test_on_progress_sets_can_clip() -> None:
    service: VideoTubeService = VideoTubeService(url="http://x", filename="f")
    assert not service._VideoTubeService__can_clip
    service._VideoTubeService__on_progress(stream=None, chunk=b"", bytes_remaining=0)
    assert service._VideoTubeService__can_clip is True


@patch("src.services.video_tube_service.VideoFileClip")
@patch.object(VideoTubeService, "download_stream")
@patch.object(FileService, "remove_file")
def test_generate_clip_success(
    mock_remove: MagicMock,
    mock_download: MagicMock,
    mock_videoclip: MagicMock,
) -> None:
    service: VideoTubeService = VideoTubeService(url="http://x", filename="f")
    service._VideoTubeService__stream = MagicMock()
    service._VideoTubeService__can_clip = True
    service._VideoTubeService__duration = 60

    fake_clip: MagicMock = MagicMock()
    fake_clip.subclipped.return_value = fake_clip
    mock_videoclip.return_value = fake_clip

    service.generate_clip("00:00:01", "00:00:02")

    mock_videoclip.assert_called_once()
    fake_clip.subclipped.assert_called_once()
    fake_clip.write_videofile.assert_called_once()
    mock_remove.assert_called_once()


@patch.object(VideoTubeService, "download_stream")
def test_generate_clip_assertion_error(mock_download: MagicMock) -> None:
    service: VideoTubeService = VideoTubeService(url="http://x", filename="f")
    service._VideoTubeService__stream = MagicMock()
    service._VideoTubeService__can_clip = False
    service._VideoTubeService__duration = 60

    with pytest.raises(AssertionError):
        service.generate_clip("00:00:01", "00:00:02")
