import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { APP_NAME } from "@/constants";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

const DROPDOWN_OPTIONS = [
  {
    name: "Profile",
    icon: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    name: "Create",
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
  },
  {
    name: "Learn",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    name: "Settings",
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
    icon2: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export default function Navbar({ children }) {
  const wallet = useWallet();
  const SOLANA_HOST = clusterApiUrl("devnet");
  const connection = new anchor.web3.Connection(SOLANA_HOST);

  const [isOpen, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [solanaBalance, setSolanaBalance] = useState(0);

  useEffect(() => {
    const loadBalance = async () => {
      if (wallet?.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setSolanaBalance(
          (balance / LAMPORTS_PER_SOL).toString().substring(0, 4)
        );
      } else {
        setSolanaBalance(0);
      }
    };
    loadBalance();
  }, [wallet?.publicKey]);

  const disconnectWallet = async () => {
    await wallet
      ?.disconnect()
      .then(() => {
        setOpenDropdown(false);
      })
      .catch(() => {
        setOpenDropdown(false);
      });
  };

  return (
    <div className="min-h-screen text-white bg-neutral-900">
      <nav
        className={
          `z-50 p-4 sticky top-0 flex items-center justify-between ` +
          (isOpen ? "md:backdrop-blur-md" : "backdrop-blur-md")
        }
      >
        <div className="flex gap-2 items-center justify-center">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#3B82FF" />
          <Link 
            href="/"
            className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 inline-block text-transparent bg-clip-text"
          >
            {APP_NAME}
          </Link>
        </div>
        <div className="flex gap-2 items-center justify-center">
          {wallet?.publicKey ? (
            <div className="py-3 px-4 font-medium bg-neutral-800 rounded-2xl">
              {solanaBalance} SOL
            </div>
          ) : (
            <WalletMultiButtonDynamic className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 select-none" />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 p-1 rounded-2xl bg-neutral-800 cursor-pointer"
            onClick={() => setOpenDropdown(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed left-0 top-0 z-40 w-full md:w-80 h-screen backdrop-blur-md">
          <div className="mt-20 text-2xl p-8 flex flex-col gap-6">
            <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/learn" onClick={() => setOpen(false)}>Learn</Link>
            <Link href="/faqs" onClick={() => setOpen(false)}>FAQs</Link>
          </div>
        </div>
      )}

      {openDropdown && (
        <div className="fixed select-none z-50 top-2 right-2 w-48 md:w-60 p-2 bg-neutral-800 rounded-2xl">
          <div className="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 p-2 rounded-2xl cursor-pointer hover:bg-neutral-900"
              onClick={() => setOpenDropdown(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {DROPDOWN_OPTIONS.map((option) => (
            <Link href={`/${option.name.toLowerCase()}`}>
              <div
                onClick={() => setOpenDropdown(false)}
                className="p-2 md:p-4 flex items-center gap-2 hover:bg-neutral-900 rounded-2xl cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={option.icon}
                  />
                  {option.icon2 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={option.icon2}
                    />
                  )}
                </svg>
                <span>{option.name}</span>
              </div>
            </Link>
          ))}

          {wallet?.publicKey && (
            <div
              onClick={() => disconnectWallet()}
              className="p-2 md:p-4 flex items-center gap-2 hover:bg-neutral-900 rounded-2xl cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              <span>Disconnect</span>
            </div>
          )}
        </div>
      )}

      <main className="px-4 pb-4">{children}</main>
    </div>
  );
}
