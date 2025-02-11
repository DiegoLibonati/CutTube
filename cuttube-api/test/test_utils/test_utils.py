from src.utils.utils import time_to_seconds
from src.utils.utils import get_portion_seconds


def test_time_to_seconds() -> None:
    assert time_to_seconds("01:30:15") == 5415  # 1 hour, 30 minutes, 15 seconds = 5415 seconds
    assert time_to_seconds("00:00:00") == 0  # Edge case: "00:00:00" should return 0
    assert time_to_seconds("12:00:00") == 43200  # 12 hours = 43200 seconds
    assert time_to_seconds("00:59:59") == 3599  # 59 minutes, 59 seconds = 3599 seconds


def test_get_portion_seconds() -> None:
    assert get_portion_seconds(1200, "01:00:00") == 3600  # 1 hour portion of a 1200-second video
    assert get_portion_seconds(600, "00:10:00") == 600  # 10 minutes portion of a 600-second video
    assert get_portion_seconds(1000, "00:25:00") == 1500  # 25 minutes portion of a 1000-second video
    assert get_portion_seconds(2000, "00:40:00") == 2400  # 40 minutes portion of a 2000-second video
