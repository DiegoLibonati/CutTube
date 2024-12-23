import os
import uuid
import logging

from pytubefix import YouTube
from pytubefix import streams
from pytubefix import Stream
from pytubefix import exceptions
from moviepy import VideoFileClip

from src.utils.utils import get_portion_seconds
from src.utils.constants import FOLDER_DOWNLOAD
from src.utils.constants import FOLDER_CLIPS


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class VideoTube:
    def __init__(self, url: str, filename: str, folder_download: str = FOLDER_DOWNLOAD, folder_clips: str = FOLDER_CLIPS) -> None:
        self.__url = url
        self.__filename: str = filename
        
        self.__folder_download: str = folder_download
        self.__folder_clips: str = folder_clips

        self.__duration: int = 0
        self.__stream: Stream = None
        self.__can_clip: bool = False

        self._generate_folders()


    @property
    def url(self) -> str:
        return self.__url


    @property
    def filename(self) -> str:
        return self.__filename
    

    @property
    def duration(self) -> int:
        return self.__duration


    def get_video_from_youtube(self) -> tuple:
        try:
            if not self.url.startswith("https://www.youtube.com/watch?"):
                return f"Video {self.url} is unavailable.", False

            video = YouTube(
                url=self.url,
                on_progress_callback=self.__on_progress
            )

            if not video:
                return f"You need a pytube.YouTube object before getting the best stream.", False

            self.__stream = self.get_better_stream(streams=video.streams)
            self.__duration = video.length

            return "Correct URL.", True 
        except exceptions.VideoUnavailable:
            return f"Video {self.url} is unavaialable", False
        except Exception as e:
            return e, False


    def get_better_stream(self, streams: streams) -> Stream:
        if not streams: 
            raise ValueError("You must enter streams to get the best one.")

        return streams.filter(
            progressive=True, 
            file_extension='mp4'
        ).order_by(
            'resolution'
        ).desc().first()
    

    def download_stream(self) -> None:
        if not self.filename:
            raise ValueError("You must enter a valid file name.")
        
        self.__filename = f"{self.filename}_{uuid.uuid4()}"

        if not self.__stream:
            raise ValueError("No valid stream found to download.")

        self.__stream.download(
            output_path=self.__folder_download,
            filename=f"{self.filename}.mp4"
        )


    def generate_clip(self, start_time: str, end_time: str) -> None:
        if not self.__can_clip:
            raise AssertionError("A clip still cannot be generated.")

        if not self.filename:
            raise ValueError("You must enter a valid file name.")
        
        video = VideoFileClip(f"{self.__folder_download}/{self.filename}.mp4")

        clip = video.subclipped(get_portion_seconds(self.duration, start_time), get_portion_seconds(self.duration, end_time))
        clip.write_videofile(f"{self.__folder_clips}/{self.filename}.mp4")

        clip.close()
        video.close()

        os.remove(f"{self.__folder_download}/{self.filename}.mp4")

        self.__can_clip = False


    def __on_progress(self, stream: streams.Stream, chunk: bytes, bytes_remaining: int) -> None: 
        if not bytes_remaining:
            self.__can_clip = True


    def _generate_folders(self) -> None:
        folders = [self.__folder_download, self.__folder_clips]

        for folder in folders:
            if not os.path.exists(folder):
                os.makedirs(folder)

        logging.info("FOLDERS GENERATED")


def init() -> None:
    filename_clip = "pepe"
    start_clip = "00:00:10"
    end_clip = "00:00:20"
    link_clip = "https://www.youtube.com/watch?v=joHCGlzxi8U&ab_channel=FeidVEVO"

    video = VideoTube(url=link_clip, filename=filename_clip)

    _, status = video.get_video_from_youtube()
    
    if not status: return logging.info("Error 1")

    video.download_stream()

    video.generate_clip(start_time=start_clip, end_time=end_clip)


if __name__ == "__main__":
    init()



