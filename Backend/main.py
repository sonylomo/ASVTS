
from typing import Union
from fastapi import FastAPI
from pytube import YouTube
from moviepy.editor import *
from speechbrain.pretrained import EncoderASR
from huggingface_hub import login
from transformers import AutoTokenizer , AutoModelForSeq2SeqLM , pipeline


secret_value = "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"
login(token=secret_value)

t5_tokenizer = AutoTokenizer.from_pretrained("google/mt5-small")
asr_model = EncoderASR.from_hparams(source="speechbrain/asr-wav2vec2-dvoice-swahili", savedir="pretrained_models/asr-wav2vec2-dvoice-swahili")
model = (AutoModelForSeq2SeqLM.from_pretrained("./model/summary") ) 


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


def extract_audio():
    video = VideoFileClip("myHolidays.mp4").subclip(50, 60)

    # Make the text. Many more options are available.
    txt_clip = (TextClip("My Holidays 2013", fontsize=70, color='white')
                .set_position('center')
                .set_duration(10))

    result = CompositeVideoClip([video, txt_clip])  # Overlay text on video
    result.write_videofile("myHolidays_edited.webm", fps=25)  # Many options...



@app.post("/predict")
def predict():
    audio = extract_audio()
    sample_text = asr_model.transcribe_file(audio)
    summarizer = pipeline("summarization", model=model, tokenizer=t5_tokenizer)

    summarizer(
        sample_text,
        max_length=215,
    )


# from typing import Union
# from fastapi import FastAPI
# from pytube import YouTube
# from moviepy.editor import *

# app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.post("/download")
# def download_YTvideo(video_url: str):
#     YouTube(video_url).streams.first().download()
#     return {"Successful"}

#     # yt = YouTube('http://youtube.com/watch?v=2lAe1cqCOXo')
#     # yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()


# @app.post("/extract_audio")
# def extract_audio():
#     video = VideoFileClip("myHolidays.mp4").subclip(50, 60)

#     # Make the text. Many more options are available.
#     txt_clip = (TextClip("My Holidays 2013", fontsize=70, color='white')
#                 .set_position('center')
#                 .set_duration(10))

#     result = CompositeVideoClip([video, txt_clip])  # Overlay text on video
#     result.write_videofile("myHolidays_edited.webm", fps=25)  # Many options...
