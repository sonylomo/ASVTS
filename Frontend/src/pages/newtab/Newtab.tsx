import { useState, useEffect } from "react";
import "@pages/newtab/Newtab.css";
import withSuspense from "@src/shared/hoc/withSuspense";

const Newtab = () => {
  const [Result, setResult] = useState(
    "Irure ex eu sit dolor magna do dolor reprehenderit dolore proident. Amet commodo non elit sit deserunt cillum mollit excepteur deserunt voluptate anim pariatur magna. Irure incididunt exercitation ad est qui ullamco mollit ipsum magna esse. In consequat eu Lorem minim ea. Sit voluptate eu eu est velit labore nostrud mollit consectetur enim. Voluptate ullamco ex veniam laboris in minim velit fugiat sunt cillum in nisi exercitation. Sunt officia minim qui aliquip qui. Et fugiat cupidatat enim nisi sint aliqua eu do ullamco eu fugiat excepteur consequat. Proident dolor excepteur dolore Lorem laboris nisi dolor anim dolore sit veniam ipsum id veniam. Pariatur amet enim Lorem adipisicing aute ex do nisi qui in est ex. Ipsum duis non labore aliqua reprehenderit aute ex nostrud aliqua eiusmod duis id dolore quis. Officia id consequat adipisicing labore commodo. Voluptate laborum ea officia laborum. Commodo et dolore ex duis dolore consectetur mollit eu adipisicing deserunt laborum et quis. Ad aute amet occaecat eiusmod ea ut elit commodo labore sit anim. Voluptate ut ea sunt officia Lorem ad ipsum."
  );
  useEffect(() => {
    setResult(localStorage.getItem("summary"));
    console.log("LoalStoragge: ", localStorage.getItem("summary"));
  }, []);

  // chrome.storage.onChanged.addListener((changes, namespace) => {
  //   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  //     setResult(newValue)
  //     console.log(
  //       `Newtab Storage key "${key}" in namespace "${namespace}" changed.`,
  //       `Old value was "${oldValue}", new value is "${newValue}".`
  //     );
  //   }
  // });

  // chrome.storage.local.get(["summary"]).then((result) => {
  //   // setResult(result.value)

  //   console.log("Value currently is " + result.key);
  // });

  return (
    <div className="bg-black text-white h-screen py-10 font-mono">
      <div className="w-3/4 m-auto text-center">
        <h1 className="mb-5 text-3xl text-[#BBFB00] font-bold">
          Muhtasari wa Nakala ya Video
        </h1>
        <p className="text-base">{Result}</p>
      </div>
    </div>
  );
};

export default withSuspense(Newtab);
