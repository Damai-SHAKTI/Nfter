import { useState } from "react";
import NFTCard from "@/components/NFTCard";

const TABS = ["Newest", "Lowest price", "Highest price"];

const FRAMES = [
  {
    id: "nHGn3jsA",
    price: 2.8,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/9541.png",
  },
  {
    id: "nHGn3jsA",
    price: 2.2,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/1436.png",
  },
  {
    id: "nHGn3jsA",
    price: 1.5,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/2087.png",
  },
  {
    id: "nHGn3jsA",
    price: 1.0,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/9541.png",
  },
  {
    id: "nHGn3jsA",
    price: 2.2,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/1436.png",
  },
  {
    id: "nHGn3jsA",
    price: 1.5,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/2087.png",
  },
  {
    id: "nHGn3jsA",
    price: 1.0,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/9541.png",
  },
  {
    id: "nHGn3jsA",
    price: 2.5,
    framePath: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://madlads.s3.us-west-2.amazonaws.com/images/1436.png",
  },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Newest");

  return (
    <div>
      <div className="w-fit mt-4 mb-2 mx-auto select-none flex items-center justify-center rounded-3xl ring-2 ring-neutral-800 overflow-hidden">
        {TABS.map((name) => (
          <div
            onClick={() => setSelectedTab(name)}
            className={
              `px-4 py-3 rounded-3xl cursor-pointer ` +
              (selectedTab == name ? "  bg-neutral-800 transition-all" : "")
            }
          >
            {name}
          </div>
        ))}
      </div>
      <div className="pb-6 flex flex-wrap gap-4 sm:gap-8 items-center justify-center">
        {selectedTab == TABS[0] && FRAMES.map((frame) => (
          <NFTCard id={frame.id} price={frame.price} framePath={frame.framePath} />
        ))}

        {selectedTab == TABS[1] && FRAMES.sort((a, b) => a.price - b.price).map((frame) => (
          <NFTCard id={frame.id} price={frame.price} framePath={frame.framePath} />
        ))}

        {selectedTab == TABS[2] && FRAMES.sort((a, b) => b.price - a.price).map((frame) => (
          <NFTCard id={frame.id} price={frame.price} framePath={frame.framePath} />
        ))}
      </div>
    </div>
  );
}
