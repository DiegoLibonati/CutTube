import pytest
from pydantic import ValidationError

from src.models.clip_model import ClipModel


class TestClipModelCreation:
    def test_create_valid_clip(self) -> None:
        clip = ClipModel(
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            start="00:00:10",
            end="00:00:20",
            filename="test_clip",
        )

        assert clip.url == "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        assert clip.start == "00:00:10"
        assert clip.end == "00:00:20"
        assert clip.filename == "test_clip"

    def test_model_dump_returns_dict(self) -> None:
        clip = ClipModel(
            url="https://www.youtube.com/watch?v=test",
            start="00:00:00",
            end="00:01:00",
            filename="clip",
        )

        result = clip.model_dump()

        assert isinstance(result, dict)
        assert result == {
            "url": "https://www.youtube.com/watch?v=test",
            "start": "00:00:00",
            "end": "00:01:00",
            "filename": "clip",
        }


class TestClipModelRequiredFields:
    def test_url_is_required(self) -> None:
        with pytest.raises(ValidationError) as exc_info:
            ClipModel(start="00:00:10", end="00:00:20", filename="test")

        errors = exc_info.value.errors()
        assert any(e["loc"] == ("url",) for e in errors)

    def test_start_is_required(self) -> None:
        with pytest.raises(ValidationError) as exc_info:
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                end="00:00:20",
                filename="test",
            )

        errors = exc_info.value.errors()
        assert any(e["loc"] == ("start",) for e in errors)

    def test_end_is_required(self) -> None:
        with pytest.raises(ValidationError) as exc_info:
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start="00:00:10",
                filename="test",
            )

        errors = exc_info.value.errors()
        assert any(e["loc"] == ("end",) for e in errors)

    def test_filename_is_required(self) -> None:
        with pytest.raises(ValidationError) as exc_info:
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start="00:00:10",
                end="00:00:20",
            )

        errors = exc_info.value.errors()
        assert any(e["loc"] == ("filename",) for e in errors)

    def test_empty_model_fails(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel()


class TestClipModelMinLength:
    def test_url_cannot_be_empty(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(url="", start="00:00:10", end="00:00:20", filename="test")

    def test_start_cannot_be_empty(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start="",
                end="00:00:20",
                filename="test",
            )

    def test_end_cannot_be_empty(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start="00:00:10",
                end="",
                filename="test",
            )

    def test_filename_cannot_be_empty(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start="00:00:10",
                end="00:00:20",
                filename="",
            )

    def test_single_character_is_valid(self) -> None:
        clip = ClipModel(url="A", start="B", end="C", filename="D")

        assert clip.url == "A"
        assert clip.start == "B"
        assert clip.end == "C"
        assert clip.filename == "D"


class TestClipModelStripWhitespace:
    def test_url_strips_whitespace(self) -> None:
        clip = ClipModel(
            url="  https://www.youtube.com/watch?v=test  ",
            start="00:00:10",
            end="00:00:20",
            filename="test",
        )

        assert clip.url == "https://www.youtube.com/watch?v=test"

    def test_start_strips_whitespace(self) -> None:
        clip = ClipModel(
            url="https://www.youtube.com/watch?v=test",
            start="  00:00:10  ",
            end="00:00:20",
            filename="test",
        )

        assert clip.start == "00:00:10"

    def test_end_strips_whitespace(self) -> None:
        clip = ClipModel(
            url="https://www.youtube.com/watch?v=test",
            start="00:00:10",
            end="  00:00:20  ",
            filename="test",
        )

        assert clip.end == "00:00:20"

    def test_filename_strips_whitespace(self) -> None:
        clip = ClipModel(
            url="https://www.youtube.com/watch?v=test",
            start="00:00:10",
            end="00:00:20",
            filename="  test_clip  ",
        )

        assert clip.filename == "test_clip"

    def test_only_whitespace_fails(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(url="   ", start="00:00:10", end="00:00:20", filename="test")


class TestClipModelNoneValues:
    def test_url_none_fails(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(url=None, start="00:00:10", end="00:00:20", filename="test")

    def test_start_none_fails(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start=None,
                end="00:00:20",
                filename="test",
            )

    def test_end_none_fails(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start="00:00:10",
                end=None,
                filename="test",
            )

    def test_filename_none_fails(self) -> None:
        with pytest.raises(ValidationError):
            ClipModel(
                url="https://www.youtube.com/watch?v=test",
                start="00:00:10",
                end="00:00:20",
                filename=None,
            )


class TestClipModelSerialization:
    def test_model_to_json(self) -> None:
        clip = ClipModel(
            url="https://www.youtube.com/watch?v=test",
            start="00:00:10",
            end="00:00:20",
            filename="test_clip",
        )

        json_str = clip.model_dump_json()

        assert "https://www.youtube.com/watch?v=test" in json_str
        assert "00:00:10" in json_str
        assert "00:00:20" in json_str
        assert "test_clip" in json_str

    def test_model_from_dict(self) -> None:
        data = {
            "url": "https://www.youtube.com/watch?v=test",
            "start": "00:00:10",
            "end": "00:00:20",
            "filename": "from_dict",
        }

        clip = ClipModel(**data)

        assert clip.url == "https://www.youtube.com/watch?v=test"
        assert clip.filename == "from_dict"

    def test_model_ignores_extra_fields(self) -> None:
        clip = ClipModel(
            url="https://www.youtube.com/watch?v=test",
            start="00:00:10",
            end="00:00:20",
            filename="test",
            extra_field="ignored",
        )

        assert clip.url == "https://www.youtube.com/watch?v=test"
        assert not hasattr(clip, "extra_field")
