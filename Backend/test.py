import requests
from moviepy.editor import *
from transformers import  WhisperProcessor
from transformers import WhisperFeatureExtractor, WhisperTokenizer
import soundfile as sf
import librosa
import numpy as np
import base64


# url = "https://3b25-34-32-245-56.ngrok.io/predict"
url = "http://127.0.0.1:8000/predict"

arr = np.load("Backend/saved_input.npy")

# Convert the numpy array to bytes
arr_bytes = arr.tobytes()

# Encode the bytes to a base64 string
arr_base64 = base64.b64encode(arr_bytes)

files = {'file': arr_base64}
response = requests.post(url, files=files)
print(response.content)