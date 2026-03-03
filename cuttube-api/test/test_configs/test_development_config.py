from src.configs.default_config import DefaultConfig
from src.configs.development_config import DevelopmentConfig


class TestDevelopmentConfigInheritance:
    def test_inherits_from_default_config(self) -> None:
        assert issubclass(DevelopmentConfig, DefaultConfig)

    def test_inherits_testing_flag(self) -> None:
        assert DevelopmentConfig.TESTING is False

    def test_inherits_timezone(self) -> None:
        assert DevelopmentConfig.TZ == DefaultConfig.TZ

    def test_inherits_work_dir(self) -> None:
        assert DevelopmentConfig.WORK_DIR == DefaultConfig.WORK_DIR

    def test_inherits_host(self) -> None:
        assert DevelopmentConfig.HOST == DefaultConfig.HOST

    def test_inherits_port(self) -> None:
        assert DevelopmentConfig.PORT == DefaultConfig.PORT


class TestDevelopmentConfigOverrides:
    def test_debug_is_true(self) -> None:
        assert DevelopmentConfig.DEBUG is True

    def test_debug_is_bool(self) -> None:
        assert isinstance(DevelopmentConfig.DEBUG, bool)

    def test_debug_overrides_default(self) -> None:
        assert DevelopmentConfig.DEBUG != DefaultConfig.DEBUG


class TestDevelopmentConfigEnv:
    def test_env_is_development(self) -> None:
        assert DevelopmentConfig.ENV == "development"

    def test_env_is_string(self) -> None:
        assert isinstance(DevelopmentConfig.ENV, str)

    def test_env_not_in_default_config(self) -> None:
        assert not hasattr(DefaultConfig, "ENV")
