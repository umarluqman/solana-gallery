import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import WalletOverview from "../../gallery/wallet-overview";
import styles from "../../styles/Home.module.css";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Overview() {
  const { asPath, query } = useRouter();

  const [height, setHeight] = React.useState(null);
  const parentRef = React.useCallback((node: any) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const wallet = useWallet();

  return (
    <div className={styles.container}>
      <Head>
        <title>Rect</title>
        <meta name="description" content="View Solana NFTs beautifully" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-rows-[1fr_auto] h-screen" ref={parentRef}>
        <motion.main key={asPath} className="p-10">
          <WalletOverview height={height} />
        </motion.main>

        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
