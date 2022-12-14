import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Gallery } from "../gallery";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Home() {
  const { asPath } = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Rect</title>
        <meta name="description" content="View Solana NFTs beautifully" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-rows-[1fr_auto] h-screen">
        <motion.main key={asPath} className="p-10 flex flex-col justify-center">
          <Gallery />
        </motion.main>

        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
