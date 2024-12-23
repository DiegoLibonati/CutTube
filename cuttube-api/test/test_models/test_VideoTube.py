import os
import shutil

from pytubefix import Stream

from pytest import raises

from src.models.VideoTube import VideoTube
from test.constants import TEST_STREAMS
from test.constants import ROOT_PATH_VIDEO_TUBE


def test_init_videotube_model(videotube_mock: dict[str, str], videotube_model: VideoTube) -> None:
    url = videotube_mock.get("url")
    filename = videotube_mock.get("filename")

    assert videotube_model.url == url
    assert videotube_model.filename == filename
    assert videotube_model.duration == 0


def test_get_video_from_youtube_invalid_url(videotube_mock: dict[str, str]) -> None:
    video = VideoTube(**{**videotube_mock, "url": "1234"})

    message, status = video.get_video_from_youtube()

    assert not status
    assert message == f"Video {video.url} is unavailable."


def test_get_video_from_youtube(videotube_model: VideoTube) -> None:
    message, status = videotube_model.get_video_from_youtube()

    assert status
    assert message == "Correct URL."

    assert videotube_model.duration


def test_get_better_stream_invalid_streams(videotube_model: VideoTube) -> None:
    with raises(ValueError) as exc_info:
        videotube_model.get_better_stream(streams=[])

    assert str(exc_info.value) == "You must enter streams to get the best one."


def test_get_better_stream(videotube_model: VideoTube) -> None:
    stream = videotube_model.get_better_stream(streams=TEST_STREAMS)

    assert stream
    assert type(stream) == Stream


def test_download_stream_invalid_filename(videotube_mock: dict[str, str]) -> None:
    video = VideoTube(**{**videotube_mock, "filename": ""})

    with raises(ValueError) as exc_info:
        video.download_stream()

    assert str(exc_info.value) == "You must enter a valid file name."


def test_download_stream_invalid_stream(videotube_mock: dict[str, str]) -> None:
    video = VideoTube(**videotube_mock)

    with raises(ValueError) as exc_info:
        video.download_stream()

    assert str(exc_info.value) == "No valid stream found to download."


def test_download_stream(videotube_mock: dict[str, str], videotube_model: VideoTube) -> None:
    video_exists = False
    folder_download = videotube_mock.get("folder_download")

    videotube_model.download_stream()

    for filename in os.listdir(folder_download):
        if videotube_model.filename in filename:
            video_exists = True

    assert video_exists


def test_generate_clip_cant_clip(videotube_mock: dict[str, str]) -> None:
    video = VideoTube(**videotube_mock)

    with raises(AssertionError) as exc_info:
        video.generate_clip(start_time="00:00:10", end_time="00:00:20")

    assert str(exc_info.value) == "A clip still cannot be generated."


def test_generate_clip(videotube_mock: dict[str, str], videotube_model: VideoTube) -> None:
    clip_exists = False

    folder_clips = videotube_mock.get("folder_clips")

    videotube_model.generate_clip(start_time="00:00:10", end_time="00:00:20")

    for filename in os.listdir(folder_clips):
        if videotube_model.filename in filename:
            clip_exists = True

    assert clip_exists


def test_generate_folders(videotube_mock: dict[str, str], videotube_model: VideoTube) -> None:
    folders = [videotube_mock.get("folder_download"), videotube_mock.get("folder_clips")]

    videotube_model._generate_folders()

    for folder in folders:
        assert os.path.exists(folder)


def test_remove_test_folder() -> None:
    shutil.rmtree(ROOT_PATH_VIDEO_TUBE)
        
