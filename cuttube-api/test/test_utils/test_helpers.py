import pytest

from src.utils.helpers import get_portion_seconds, time_to_seconds


class TestTimeToSeconds:
    def test_zero_time(self) -> None:
        result = time_to_seconds("00:00:00")

        assert result == 0

    def test_only_seconds(self) -> None:
        result = time_to_seconds("00:00:30")

        assert result == 30

    def test_only_minutes(self) -> None:
        result = time_to_seconds("00:05:00")

        assert result == 300

    def test_only_hours(self) -> None:
        result = time_to_seconds("02:00:00")

        assert result == 7200

    def test_combined_time(self) -> None:
        result = time_to_seconds("01:30:45")

        assert result == 5445

    def test_max_seconds(self) -> None:
        result = time_to_seconds("00:00:59")

        assert result == 59

    def test_max_minutes(self) -> None:
        result = time_to_seconds("00:59:00")

        assert result == 3540

    def test_full_time(self) -> None:
        result = time_to_seconds("23:59:59")

        assert result == 86399

    def test_invalid_format_raises_error(self) -> None:
        with pytest.raises(ValueError):
            time_to_seconds("invalid")

    def test_wrong_format_raises_error(self) -> None:
        with pytest.raises(ValueError):
            time_to_seconds("00:00")

    def test_negative_time_raises_error(self) -> None:
        with pytest.raises(ValueError):
            time_to_seconds("-01:00:00")


class TestGetPortionSeconds:
    def test_start_of_video(self) -> None:
        result = get_portion_seconds(video_duration=120, portion_time="00:00:00")

        assert result == 0

    def test_middle_of_video(self) -> None:
        result = get_portion_seconds(video_duration=120, portion_time="00:01:00")

        assert result == 60

    def test_end_of_video(self) -> None:
        result = get_portion_seconds(video_duration=120, portion_time="00:02:00")

        assert result == 120

    def test_quarter_of_video(self) -> None:
        result = get_portion_seconds(video_duration=240, portion_time="00:01:00")

        assert result == 60

    def test_returns_integer(self) -> None:
        result = get_portion_seconds(video_duration=100, portion_time="00:00:33")

        assert isinstance(result, int)

    def test_long_video(self) -> None:
        result = get_portion_seconds(video_duration=3600, portion_time="00:30:00")

        assert result == 1800

    def test_short_portion(self) -> None:
        result = get_portion_seconds(video_duration=600, portion_time="00:00:10")

        assert result == 10

    def test_exact_half(self) -> None:
        result = get_portion_seconds(video_duration=200, portion_time="00:01:40")

        assert result == 100


class TestGetPortionSecondsEdgeCases:
    def test_one_second_video(self) -> None:
        result = get_portion_seconds(video_duration=1, portion_time="00:00:01")

        assert result == 1

    def test_portion_equals_duration(self) -> None:
        result = get_portion_seconds(video_duration=300, portion_time="00:05:00")

        assert result == 300

    def test_small_portion_of_long_video(self) -> None:
        result = get_portion_seconds(video_duration=7200, portion_time="00:00:01")

        assert result == 1

    def test_division_results_in_float(self) -> None:
        result = get_portion_seconds(video_duration=100, portion_time="00:00:33")

        assert result == 33
        assert isinstance(result, int)
