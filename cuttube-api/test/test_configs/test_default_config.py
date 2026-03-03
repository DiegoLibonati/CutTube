import os

from src.configs.default_config import DefaultConfig


class TestDefaultConfigGeneral:
    def test_tz_is_string(self) -> None:
        assert isinstance(DefaultConfig.TZ, str)

    def test_tz_default_value(self) -> None:
        if "TZ" not in os.environ:
            assert DefaultConfig.TZ == "America/Argentina/Buenos_Aires"

    def test_work_dir_is_string(self) -> None:
        assert isinstance(DefaultConfig.WORK_DIR, str)

    def test_work_dir_default_value(self) -> None:
        if "WORK_DIR" not in os.environ:
            assert DefaultConfig.WORK_DIR == "/home/app"

    def test_debug_is_false(self) -> None:
        assert DefaultConfig.DEBUG is False

    def test_debug_is_bool(self) -> None:
        assert isinstance(DefaultConfig.DEBUG, bool)

    def test_testing_is_false(self) -> None:
        assert DefaultConfig.TESTING is False

    def test_testing_is_bool(self) -> None:
        assert isinstance(DefaultConfig.TESTING, bool)


class TestDefaultConfigFlask:
    def test_host_is_string(self) -> None:
        assert isinstance(DefaultConfig.HOST, str)

    def test_host_default_value(self) -> None:
        if "HOST" not in os.environ:
            assert DefaultConfig.HOST == "0.0.0.0"

    def test_port_default_value(self) -> None:
        if "PORT" not in os.environ:
            assert DefaultConfig.PORT == 5000
