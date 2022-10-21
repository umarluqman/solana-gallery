import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SearchIcon } from "../components/SearchIcon";
import {
  useMutationCollection,
  useQueryCollection,
} from "../hooks/useNFTCollections";
import { truncateAddress } from "../utils/truncateAddress";

const transition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const gridTransition = {
  duration: 0.6,
  delay: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export default function WalletOverview({ height }: { height: number | null }) {
  const router = useRouter();

  const walletAddress = router.query.address as string;

  const [address, setAddress] = React.useState(walletAddress);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  const breadcrumbs = [
    { title: `${truncateAddress(walletAddress)}`, isCurrentPage: true },
  ];

  const {
    mutate,
    isLoading: isDiscovering,
    error,
  } = useMutationCollection({
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: dataQuery, isLoading } = useQueryCollection({
    walletAddress,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    mutate(walletAddress);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-4 col-span-6">
          <motion.div className="flex flex-col">
            <form
              className="flex content-center items-center"
              onSubmit={handleSubmit}
            >
              <motion.div
                className="relative w-full"
                initial={{ scale: 1, y: 305.5 }}
                animate={{ scale: 0.7, y: 0 }}
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
      <Breadcrumbs animate breadcrumbs={breadcrumbs} />
      {isLoading ? null : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={gridTransition}
          className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] mt-20 gap-6"
        >
          {dataQuery?.map((item) => (
            <div key={item.collectionName}>
              <div className="bg-white  overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {item.collectionName}
                  </h3>
                  <Link
                    href={`/${walletAddress}/collection/${item[0].updateAuthority}`}
                  >
                    <motion.div className="relative cursor-pointer">
                      <Image
                        src={item?.offChain.image}
                        width={320}
                        height={320}
                        className="rounded-md z-10"
                      />
                      <div className="sm:text-sm px-2 py-1 rounded-full absolute top-2 left-2 bg-slate-900 opacity-60 z-20">
                        <div className="text-slate-50">
                          {Object.keys(item).length - 2 + " items"}
                        </div>
                      </div>
                      <div className="w-[270px] h-[270px] absolute bg-slate-200 left-2 top-2 rounded-md blur-sm"></div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
}
