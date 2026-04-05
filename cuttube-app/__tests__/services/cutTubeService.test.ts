import axios from "axios";

import type { FormClip } from "@/types/forms";

import { apiCutTube } from "@/services/axios";
import cutTubeService from "@/services/cutTubeService";

describe("cutTubeService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("clipVideo", () => {
    const mockForm: FormClip = {
      url: "https://www.youtube.com/watch?v=test",
      filename: "my-clip",
      start: "00:00:10",
      end: "00:00:20",
    };
    const mockResponse = {
      code: "SUCCESS",
      message: "ok",
      data: { name: "my-clip.mp4", filename: "my-clip" },
    };

    it("should call POST to the correct endpoint", async () => {
      jest.spyOn(apiCutTube, "post").mockResolvedValue({ data: mockResponse });
      await cutTubeService.clipVideo(mockForm);
      expect(apiCutTube.post).toHaveBeenCalledWith(
        "/my-clip/clip",
        JSON.stringify({ url: mockForm.url, start: mockForm.start, end: mockForm.end })
      );
    });

    it("should return the response data", async () => {
      jest.spyOn(apiCutTube, "post").mockResolvedValue({ data: mockResponse });
      const result = await cutTubeService.clipVideo(mockForm);
      expect(result).toEqual(mockResponse);
    });

    it("should throw an Error wrapping an AxiosError", async () => {
      const axiosError = new axios.AxiosError("Request failed", "500");
      jest.spyOn(apiCutTube, "post").mockRejectedValue(axiosError);
      await expect(cutTubeService.clipVideo(mockForm)).rejects.toThrow("HTTP error!");
    });

    it("should re-throw non-Axios errors", async () => {
      const genericError = new Error("Generic error");
      jest.spyOn(apiCutTube, "post").mockRejectedValue(genericError);
      await expect(cutTubeService.clipVideo(mockForm)).rejects.toThrow("Generic error");
    });
  });

  describe("removeClip", () => {
    const mockDeleteResponse = { code: "SUCCESS", message: "Deleted" };

    it("should call DELETE to the correct endpoint", async () => {
      jest.spyOn(apiCutTube, "delete").mockResolvedValue({ data: mockDeleteResponse });
      await cutTubeService.removeClip("my-clip");
      expect(apiCutTube.delete).toHaveBeenCalledWith("/my-clip");
    });

    it("should return the response data", async () => {
      jest.spyOn(apiCutTube, "delete").mockResolvedValue({ data: mockDeleteResponse });
      const result = await cutTubeService.removeClip("my-clip");
      expect(result).toEqual(mockDeleteResponse);
    });

    it("should throw an Error wrapping an AxiosError", async () => {
      const axiosError = new axios.AxiosError("Request failed", "404");
      jest.spyOn(apiCutTube, "delete").mockRejectedValue(axiosError);
      await expect(cutTubeService.removeClip("my-clip")).rejects.toThrow("HTTP error!");
    });

    it("should re-throw non-Axios errors", async () => {
      const genericError = new Error("Generic error");
      jest.spyOn(apiCutTube, "delete").mockRejectedValue(genericError);
      await expect(cutTubeService.removeClip("my-clip")).rejects.toThrow("Generic error");
    });
  });
});
