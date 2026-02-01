from src.constants.vars import CLIP_EXTENSION


class TestClipExtension:
    def test_clip_extension_is_string(self) -> None:
        assert isinstance(CLIP_EXTENSION, str)

    def test_clip_extension_is_mp4(self) -> None:
        assert CLIP_EXTENSION == "mp4"

    def test_clip_extension_is_not_empty(self) -> None:
        assert len(CLIP_EXTENSION) > 0

    def test_clip_extension_is_lowercase(self) -> None:
        assert CLIP_EXTENSION == CLIP_EXTENSION.lower()

    def test_clip_extension_has_no_dot(self) -> None:
        assert "." not in CLIP_EXTENSION
