from flask import Flask
from flask.testing import FlaskClient


class TestBlueprintRegistration:
    def test_cut_blueprint_is_registered(self, app: Flask) -> None:
        blueprint_names = [bp.name for bp in app.blueprints.values()]
        assert "cut" in blueprint_names

    def test_routes_have_correct_prefix(self, app: Flask) -> None:
        rules = [rule.rule for rule in app.url_map.iter_rules()]

        cut_routes = [rule for rule in rules if "/api/v1/cut" in rule]
        assert len(cut_routes) > 0

    def test_api_versioning_prefix_exists(self, app: Flask) -> None:
        rules = [rule.rule for rule in app.url_map.iter_rules()]

        versioned_routes = [rule for rule in rules if "/api/v1/" in rule]
        assert len(versioned_routes) > 0


class TestRoutesExist:
    def test_alive_route_exists(self, app: Flask) -> None:
        rules = [rule.rule for rule in app.url_map.iter_rules()]

        assert any("/api/v1/cut/alive" in rule for rule in rules)

    def test_clip_video_route_exists(self, app: Flask) -> None:
        rules = [rule.rule for rule in app.url_map.iter_rules()]

        assert any("/clip" in rule and "/api/v1/cut/" in rule for rule in rules)

    def test_download_clip_route_exists(self, app: Flask) -> None:
        rules = [rule.rule for rule in app.url_map.iter_rules()]

        assert any("/download" in rule and "/api/v1/cut/" in rule for rule in rules)

    def test_remove_clip_route_exists(self, app: Flask) -> None:
        rules = [rule.rule for rule in app.url_map.iter_rules()]

        assert any("/api/v1/cut/<filename>" in rule for rule in rules)


class TestRoutesAccessibility:
    def test_alive_endpoint_is_accessible(self, client: FlaskClient) -> None:
        response = client.get("/api/v1/cut/alive")

        assert response.status_code != 404

    def test_invalid_route_returns_404(self, client: FlaskClient) -> None:
        response = client.get("/api/v1/nonexistent/")

        assert response.status_code == 404

    def test_wrong_api_version_returns_404(self, client: FlaskClient) -> None:
        response = client.get("/api/v2/cut/alive")

        assert response.status_code == 404


class TestRoutesMethods:
    def test_alive_only_accepts_get(self, client: FlaskClient) -> None:
        response_get = client.get("/api/v1/cut/alive")
        response_post = client.post("/api/v1/cut/alive")

        assert response_get.status_code != 405
        assert response_post.status_code == 405

    def test_clip_video_only_accepts_post(self, client: FlaskClient) -> None:
        response_post = client.post("/api/v1/cut/testfile/clip")
        response_get = client.get("/api/v1/cut/testfile/clip")

        assert response_post.status_code != 405
        assert response_get.status_code == 405

    def test_download_clip_only_accepts_get(self, client: FlaskClient) -> None:
        response_get = client.get("/api/v1/cut/testfile/download")
        response_post = client.post("/api/v1/cut/testfile/download")

        assert response_get.status_code != 405
        assert response_post.status_code == 405

    def test_remove_clip_only_accepts_delete(self, client: FlaskClient) -> None:
        response_delete = client.delete("/api/v1/cut/testfile")
        response_get = client.get("/api/v1/cut/testfile")

        assert response_delete.status_code != 405
        assert response_get.status_code == 405
