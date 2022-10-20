import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../components/SearchIcon";
import { useNFTs } from "../hooks/useNFTs";
import { motion } from "framer-motion";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

export default function Home() {
  const router = useRouter();

  const walletAddress = router.query.address as string;
  console.log({ walletAddress });
  const [address, setAddress] = React.useState(walletAddress);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  const collectionId = router.query.id as string;

  const { data, isLoading, error } = useNFTs({
    walletAddress,
    collectionId,
  });

  // const { data: dataQuery, isLoading: isFetching } = useQueryCollection({
  //   walletAddress,
  // });

  // useEffect(() => {
  //   if (walletAddress) {
  //     mutate(walletAddress);
  //   }
  // }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    router.push("/[address]", `/${address}`);
  };

  console.log({ data });

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-4 col-span-6">
          <motion.div
            // initial={{ y: 306 }}
            // animate={{ y: 0 }}
            // transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex flex-col"
          >
            {/* <div className="flex text-5xl justify-center items-center font-sans text-gray-900 font-light text-center mb-9">
              <span className="mr-5">
                <div className="rounded-lg h-10 w-10 border-2 border-gray-400 rotate-60"></div>
              </span>
              Rect
            </div> */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              className="text-center text-slate-400 font-light tracking-wider mb-6 text-lg"
            >
              Explore NFTs inside any{" "}
              <Image
                src="/solana.svg"
                alt="Solana Logo"
                width={28}
                height={16}
              />{" "}
              SOLANA wallet
            </motion.div> */}
            <form
              className="flex content-center items-center"
              onSubmit={handleSubmit}
            >
              <motion.div
                className="relative w-full"
                // initial={{ scale: 1, y: 306 }}
                style={{ scale: 0.7, y: 0 }}
                transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <input
                  type="text"
                  className="h-20 px-8 py-4 sm:text-xl shadow-[0_2px_6px_rgb(0_0_0_/_5%)] border-gray-300/50 rounded-lg placeholder:text-gray-400 w-full text-gray-900 focus:border-gray-400/50 focus:outline-transparent focus:ring-transparent transition duration-200 placeholder:font-light font-sans placeholder:text-center placeholder:text-xl cursor-text text-center"
                  placeholder="enter wallet address"
                  onChange={handleChange}
                  value={address}
                ></input>
                <button className="absolute right-6 top-7">
                  <SearchIcon
                    whileHover={{
                      scale: 1.1,
                      transition,
                    }}
                    whileTap={{
                      scale: 0.9,
                      transition,
                    }}
                  />
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full">
          <motion.div
            initial={{ x: -100, y: -5 }}
            animate={{ x: 100, y: -5 }}
            transition={{
              flip: Infinity,
              duration: 1,
            }}
            className="bg-slate-500"
            style={{
              height: 4,
              width: 120,
            }}
          />
          <motion.div
            initial={{ x: -180, y: -5 }}
            animate={{ x: 180, y: -5 }}
            transition={{
              flip: Infinity,
              duration: 1.2,
            }}
            className="bg-slate-400"
            style={{
              height: 4,
              width: 140,
            }}
          />
          <motion.div
            initial={{ x: -100, y: -5 }}
            animate={{ x: 100, y: -5 }}
            transition={{
              flip: Infinity,
              duration: 1.5,
            }}
            className="bg-slate-900"
            style={{
              height: 4,
              width: 160,
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] mt-20 gap-6">
          {data?.map((item) => (
            <div key={item.mint}>
              <div className="bg-white  overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {item.data.name}
                  </h3>
                  <motion.div className="relative">
                    <Image
                      src={item?.offChain.image}
                      width={320}
                      height={320}
                      className="rounded-md z-10"
                    />
                    <div className="w-[270px] h-[270px] absolute bg-slate-200 left-2 top-2 rounded-md blur-sm"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
