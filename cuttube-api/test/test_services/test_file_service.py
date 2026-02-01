import os
import tempfile

import pytest

from src.services.file_service import FileService


class TestFileServiceRemoveFile:
    def test_remove_file_deletes_existing_file(self) -> None:
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp_path = tmp.name

        assert os.path.exists(tmp_path)

        FileService.remove_file(tmp_path)

        assert not os.path.exists(tmp_path)

    def test_remove_file_raises_error_for_nonexistent_file(self) -> None:
        with pytest.raises(FileNotFoundError):
            FileService.remove_file("/nonexistent/path/file.txt")

    def test_remove_file_raises_error_for_directory(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            with pytest.raises((IsADirectoryError, PermissionError, OSError)):
                FileService.remove_file(tmp_dir)


class TestFileServicePathExists:
    def test_path_exists_returns_true_for_existing_file(self) -> None:
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp_path = tmp.name

        try:
            result = FileService.path_exists(tmp_path)
            assert result is True
        finally:
            os.remove(tmp_path)

    def test_path_exists_returns_false_for_nonexistent_file(self) -> None:
        result = FileService.path_exists("/nonexistent/path/file.txt")

        assert result is False

    def test_path_exists_returns_true_for_existing_directory(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            result = FileService.path_exists(tmp_dir)

            assert result is True

    def test_path_exists_returns_false_for_nonexistent_directory(self) -> None:
        result = FileService.path_exists("/nonexistent/directory/path")

        assert result is False


class TestFileServiceMakeDirs:
    def test_make_dirs_creates_directory(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            new_dir = os.path.join(tmp_dir, "new_directory")

            assert not os.path.exists(new_dir)

            FileService.make_dirs(new_dir)

            assert os.path.exists(new_dir)
            assert os.path.isdir(new_dir)

    def test_make_dirs_creates_nested_directories(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            nested_dir = os.path.join(tmp_dir, "level1", "level2", "level3")

            assert not os.path.exists(nested_dir)

            FileService.make_dirs(nested_dir)

            assert os.path.exists(nested_dir)
            assert os.path.isdir(nested_dir)

    def test_make_dirs_with_exist_ok_true_does_not_raise(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            FileService.make_dirs(tmp_dir, exist_ok=True)

            assert os.path.exists(tmp_dir)

    def test_make_dirs_with_exist_ok_false_raises_for_existing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            with pytest.raises(FileExistsError):
                FileService.make_dirs(tmp_dir, exist_ok=False)

    def test_make_dirs_default_exist_ok_is_true(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            FileService.make_dirs(tmp_dir)

            assert os.path.exists(tmp_dir)


class TestFileServiceIntegration:
    def test_create_and_remove_file_workflow(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            new_dir = os.path.join(tmp_dir, "test_dir")
            file_path = os.path.join(new_dir, "test_file.txt")

            FileService.make_dirs(new_dir)
            assert FileService.path_exists(new_dir)

            with open(file_path, "w") as f:
                f.write("test content")

            assert FileService.path_exists(file_path)

            FileService.remove_file(file_path)

            assert not FileService.path_exists(file_path)
            assert FileService.path_exists(new_dir)

    def test_path_exists_after_make_dirs(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            new_dir = os.path.join(tmp_dir, "created_dir")

            assert not FileService.path_exists(new_dir)

            FileService.make_dirs(new_dir)

            assert FileService.path_exists(new_dir)
