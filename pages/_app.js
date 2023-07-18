import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import TopProgressbar from "@/components/TopProgressbar";
import WalletConnectProvider from "@/providers/WalletConnectProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setTimeout(() => { setLoading(false) }, 1000);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  return (
    <WalletConnectProvider>
      {loading && <TopProgressbar />}
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </WalletConnectProvider>
  );
}
