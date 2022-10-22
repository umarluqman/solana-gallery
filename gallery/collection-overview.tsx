import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../components/SearchIcon";
import { useNFTs } from "../hooks/useNFTs";
import { motion } from "framer-motion";
import Link from "next/link";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { truncateAddress } from "../utils/truncateAddress";
import { Loader } from "../components/Loader";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

export default function Home() {
  const router = useRouter();

  const walletAddress = router.query.address as string;

  const [address, setAddress] = React.useState(walletAddress);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  const collectionId = router.query.id as string;

  const breadcrumbs = [
    {
      title: `${truncateAddress(walletAddress)}`,
      href: `/${walletAddress}`,
      isCurrentPage: false,
    },
    {
      title: "Collection",
      isCurrentPage: true,
    },
  ];

  const { data, isLoading, error } = useNFTs({
    walletAddress,
    collectionId,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    router.push("/[address]", `/${address}`);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-4 col-span-6">
          <motion.div className="flex flex-col">
            <form
              className="h-[80px] flex content-center items-center"
              onSubmit={handleSubmit}
            >
              {/* <div className="relative w-full scale-[0.7]">
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
              </div> */}
            </form>
          </motion.div>
        </div>
      </div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading ? (
        <Loader animate={false} />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] mt-20 gap-6">
          {data?.map((item) => (
            <div key={item.mint}>
              <div className="bg-white  overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {item.data.name}
                  </h3>
                  <Link
                    href={`/${walletAddress}/collection/${collectionId}/${item.mint}`}
                  >
                    <motion.div className="relative cursor-pointer">
                      <Image
                        src={item?.offChain.image}
                        width={320}
                        height={320}
                        className="rounded-md z-10"
                      />
                      <div className="w-[270px] h-[270px] absolute bg-slate-200 left-2 top-2 rounded-md blur-sm"></div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
