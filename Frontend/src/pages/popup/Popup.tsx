import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import * as np from "numjs";

// {"data":{"summary":[{"summary_text":"Mfanyabiashara wa mafuta ya dizela nchini Marekani anjo Rogge ameshtakiwa katika makao makuu ya upelelezi."}]},"status":200,"statusText":"","headers":{"content-length":"139","content-type":"application/json","date":"Wed, 29 Nov 2023 11:44:28 GMT","link":"<https://huggingface.co/spaces/Jayem-11/swahili>; rel=\"canonical\"","server":"uvicorn","x-proxied-host":"http://10.19.106.158:7860","x-proxied-path":"/predict","x-request-id":"1f910007-74a6-4b80-8f65-704372d94d55"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"adapter":["xhr","http"],"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{},"headers":{"Accept":"application/json, text/plain, */*"},"method":"post","url":"https://jayem-11-swahili.hf.space/predict","data":{}},"request":{}}

// import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";

// interface LoadingProps {
//   postsLoaded: number;
// }

// const LoadingView = ({ postsLoaded }: LoadingProps) => {
//   return (
//     <div className="center-view">
//       <CircularProgress />
//       <Typography mt={4} mb={2} fontSize={14}>
//         Processed {postsLoaded} posts already.
//       </Typography>
//       <Alert severity="info">
//         <AlertTitle>
//           We don't know how many posts are posted by author in total, until we
//           load them all.
//         </AlertTitle>
//       </Alert>
//     </div>
//   );
// };

const Popup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [FileName, setFileName] = useState("");

  // const url = "http://127.0.0.1:8000/predict";
  const url = "https://jayem-11-swahili.hf.space/predict";

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const onFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    // console.log("form data: ", formData.get("file"));
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: url,
        data: formData,
      });

      // alert(JSON.stringify(response.data.summary[0].summary_text));
      localStorage.setItem(
        "summary",
        JSON.stringify(response.data.summary[0].summary_text)
      );
      chrome.storage.local
        .set({ summary: JSON.stringify(response.data.summary[0].summary_text) })
        .then(() => {
          console.log("Value is set");
          // alert(JSON.stringify(response.data.summary[0].summary_text));
        });

      chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
          );
        }
        chrome.tabs.create({ url: "src/pages/newtab/index.html" });
      });

      console.log("gotcha");
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("You have sold your soul to the Devil! ");
    // chrome.tabs.create({ url: "src/pages/newtab/index.html" });
  };

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(url, formData);
  //     console.log(response.data);
  //     console.log("gotcha");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div className="App space-y-6">
      <h1 className="font-bold text(center 3xl) pt-3">ASVTS</h1>
      <form className="px-8 pt-3 pb-8">
        {/* <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="videoURL"
          >
            Paste in Video URL:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#BBFB00]"
            id="videoURL"
            type="text"
            placeholder="https://example.com/"
          />
        </div> */}

        <div className="flex w-full h-[40vh] items-center justify-center mb-2">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:text-[#a8e000] hover:ring-2 hover:ring-[#BBFB00]">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-sm leading-normal">
              {FileName != "" ? FileName : "Upload a video"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={onFileChange}
              // value={VideoUpload}
              // onChange={(e) => setVideoUpload(e.target.value)}
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#BBFB00] hover:bg-[#a8e000] text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:bg-gray-400"
          disabled={Loading} // onClick={handleSubmit}
          onClick={onFileUpload}
        >
          {Loading ? "Loading..." : "Generate Transcript"}
        </button>
      </form>
    </div>
  );
};

export default withSuspense(Popup);
