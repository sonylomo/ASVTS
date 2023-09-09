import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("content view loaded");
    // chrome.browserAction.onClicked.addListener(function (tab) {
      // chrome.tabs.create({ url: "newtab/index.html" });
    // });
    
  }, []);

  return <div className="text-lime-400 ">content view sucker</div>;
}
