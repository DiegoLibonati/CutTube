from src.utils.helpers import get_portion_seconds, time_to_seconds


def test_time_to_seconds() -> None:
    assert time_to_seconds("00:00:10") == 10
    assert time_to_seconds("00:01:00") == 60
    assert time_to_seconds("01:00:00") == 3600
    assert time_to_seconds("02:30:10") == (2 * 3600) + (30 * 60) + 10


def test_get_portion_seconds_valid() -> None:
    video_duration: int = 1000
    assert get_portion_seconds(video_duration, "00:01:40") == 100
    assert get_portion_seconds(video_duration, "00:08:20") == 500
