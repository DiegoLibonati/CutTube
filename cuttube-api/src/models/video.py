import pytube
import os
import sys
import uuid

from moviepy.editor import VideoFileClip

from utils import utils


class Video:
    def __init__(
        self, url: str, youtube: pytube.YouTube = None,
        stream: pytube.Stream = None, filename: str = "", folder_download: str = f"{os.path.dirname(sys.modules['__main__'].__file__)}/download",
        can_cut: bool = False, duration: int = 0
    ):
        self.url = url
        self.youtube = youtube
        self.stream = stream
        self.filename = filename
        self.folder_download = folder_download
        self.can_cut = can_cut
        self.duration = duration


    def get_video_from_youtube(
        self
    ) -> tuple:
        try:
            video = pytube.YouTube(
                self.url,
                on_progress_callback = self.on_progress
            )

            self.video = video
            self.duration = video.length

            if not self.url.startswith("https://www.youtube.com/watch?"):
                raise Exception(f"Video {self.url} is unavaialable")

            return "Correct URL", True 
        except pytube.exceptions.VideoUnavailable:
            return f"Video {self.url} is unavaialable", False
        except Exception as e:
            return e, False


    def get_better_stream(
        self
    ) -> tuple:
        if not self.video:
            return "You need a pytube.YouTube object before getting the best stream", False
        
        self.stream = self.video.streams.filter(
            progressive=True, 
            file_extension='mp4'
        ).order_by(
            'resolution'
        ).desc().first()
        return "Correct Stream", True
    

    def on_progress(
        self, stream: pytube.streams.Stream, chunk: bytes, 
        bytes_remaining: int
    ): 

        if not bytes_remaining:
            self.can_cut = True

        return
    

    def download_stream(
        self
    ) -> None:
        self.filename = uuid.uuid4()

        self.stream.download(
            self.folder_download,
            filename = f"{self.filename}.mp4"
        )

        return
    

    def cut_video(
        self, start_time: int, end_time: int,
        new_filename: str
    ) -> bool:
        video = VideoFileClip(f"{self.folder_download}/{self.filename}.mp4")

        clip = video.subclip(utils.get_portion_seconds(self.duration, start_time), utils.get_portion_seconds(self.duration, end_time))
        clip.write_videofile(f"{new_filename}.mp4")

        os.remove(f"{self.folder_download}/{self.filename}.mp4")
        self.can_cut = False
        
        return