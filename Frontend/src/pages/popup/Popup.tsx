import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";

const Popup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("You have sold your soul to the Devil! ");
    chrome.tabs.create({ url: "src/pages/newtab/index.html" });
  };

  return (
    <div className="App space-y-6">
      <h1 className="font-bold text(center 3xl) pt-3">ASVTS</h1>
      <form className="px-8 pt-3 pb-8">
        <div className="mb-2">
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
        </div>

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
            <span className="mt-2 text-sm leading-normal">Upload a video</span>
            <input type="file" className="hidden" />
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#BBFB00] hover:bg-[#a8e000] text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handleSubmit}
        >
          Generate Transcript
        </button>
      </form>
    </div>
  );
};

export default withSuspense(Popup);
