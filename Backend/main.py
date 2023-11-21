from typing import Union
from fastapi import FastAPI
from pytube import YouTube
from moviepy.editor import *
from huggingface_hub import login
from transformers import AutoTokenizer , AutoModelForSeq2SeqLM , pipeline, AutoModel
from transformers import WhisperForConditionalGeneration, WhisperProcessor
from transformers import WhisperFeatureExtractor, WhisperTokenizer
from fastapi import FastAPI, UploadFile
from starlette.responses import JSONResponse
import soundfile as sf
import librosa
import numpy as np
import io
import tempfile

# secret_value = "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"
# login(token=secret_value)

app = FastAPI()

feature_extractor = WhisperFeatureExtractor.from_pretrained("openai/whisper-small")
tokenizer = WhisperTokenizer.from_pretrained("openai/whisper-small", language="Swahili", task="transcribe")
processor = WhisperProcessor.from_pretrained("Jayem-11/whisper-small-swahili-3")
asr_model = AutoModel.from_pretrained('../SpeechToText/model')
forced_decoder_ids = processor.get_decoder_prompt_ids(language="sw", task="transcribe")

t5_tokenizer = AutoTokenizer.from_pretrained("google/mt5-small")
summary_model = (AutoModelForSeq2SeqLM.from_pretrained("../TextSummarization/model")) 


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/download")
def download_YTvideo(video_url: str):
    YouTube(video_url).streams.first().download()
    return {"Successful"}

    # yt = YouTube('http://youtube.com/watch?v=2lAe1cqCOXo')
    # yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()


def extract_and_resample_audio(file):

    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    temp_file.write(file)
    temp_file.close()

    # Load the video file from the uploaded file
    video = VideoFileClip(temp_file.name)

    # Extract audio from the video
    audio = video.audio

    # Save the audio to a temporary file
    audio.write_audiofile("temp_audio.wav")

    # Load the temporary audio file
    audio_data, sr = sf.read("temp_audio.wav")

    # Resample the audio to 16000Hz
    audio_resampled = librosa.resample(audio_data, orig_sr = sr, target_sr=16000)
    print("Done resampling")

    return audio_resampled

@app.post("/predict")
async def predict(file: UploadFile):
    audio_resampled = extract_and_resample_audio(await file.read())

    input_feats = feature_extractor(audio_resampled, sampling_rate = 16000).input_features[0]
    input_feats = np.expand_dims(input_feats, axis=0)

    output = asr_model.generate(input_feats)

    sample_text = tokenizer.batch_decode(output, skip_special_tokens=True)


    summarizer = pipeline("summarization", model=summary_model, tokenizer=t5_tokenizer)

    summary = summarizer(
        sample_text,
        max_length=215,
    )

    return {'summary': summary,}
