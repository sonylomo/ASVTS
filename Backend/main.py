from typing import Union
from fastapi import FastAPI
from pytube import YouTube
from moviepy.editor import *

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/download")
def download_YTvideo(video_url: str):
    YouTube(video_url).streams.first().download()
    return {"Successful"}

    # yt = YouTube('http://youtube.com/watch?v=2lAe1cqCOXo')
    # yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()


@app.post("/extract_audio")
def extract_audio():
    video = VideoFileClip("myHolidays.mp4").subclip(50, 60)

    # Make the text. Many more options are available.
    txt_clip = (TextClip("My Holidays 2013", fontsize=70, color='white')
                .set_position('center')
                .set_duration(10))

    result = CompositeVideoClip([video, txt_clip])  # Overlay text on video
    result.write_videofile("myHolidays_edited.webm", fps=25)  # Many options...
