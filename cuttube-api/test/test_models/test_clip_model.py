import pytest
from pydantic import ValidationError

from src.models.clip_model import ClipModel


def test_clip_model_valid() -> None:
    clip = ClipModel(
        url="https://youtube.com/watch?v=123",
        start="00:00:10",
        end="00:00:20",
        filename="test_file",
    )

    assert clip.url == "https://youtube.com/watch?v=123"
    assert clip.start == "00:00:10"
    assert clip.end == "00:00:20"
    assert clip.filename == "test_file"


@pytest.mark.parametrize(
    "field, value",
    [
        ("url", ""),
        ("url", "   "),
        ("start", ""),
        ("end", ""),
        ("filename", ""),
    ],
)
def test_clip_model_invalid(field: str, value: str) -> None:
    data = {
        "url": "https://youtube.com/watch?v=123",
        "start": "00:00:10",
        "end": "00:00:20",
        "filename": "test_file",
    }
    data[field] = value

    with pytest.raises(ValidationError):
        ClipModel(**data)
