import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import WalletOverview from "../../gallery/wallet-overview";
import styles from "../../styles/Home.module.css";

export default function Overview() {
  const { asPath, query } = useRouter();

  console.log({ query });

  return (
    <div className={styles.container}>
      <Head>
        <title>Rect</title>
        <meta name="description" content="View Solana NFTs beautifully" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-rows-[1fr_auto] h-screen">
        <motion.main key={asPath} className="p-10">
          <WalletOverview />
        </motion.main>

        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
