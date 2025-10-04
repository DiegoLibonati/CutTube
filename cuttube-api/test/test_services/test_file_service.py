import os
from pathlib import Path

from src.services.file_service import FileService


def test_make_dirs_and_path_exists(tmp_path: Path) -> None:
    dir_path: str = os.path.join(str(tmp_path), "nested_dir")

    assert not FileService.path_exists(dir_path)

    FileService.make_dirs(dir_path)

    assert FileService.path_exists(dir_path)


def test_remove_file(tmp_path: Path) -> None:
    file_path: str = os.path.join(str(tmp_path), "testfile.txt")

    with open(file_path, "w") as f:
        f.write("hello world")

    assert FileService.path_exists(file_path)

    FileService.remove_file(file_path)

    assert not FileService.path_exists(file_path)


def test_path_exists_returns_false(tmp_path: Path) -> None:
    fake_file: str = os.path.join(str(tmp_path), "not_real.txt")

    assert not FileService.path_exists(fake_file)
