import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Loader } from "../components/Loader";
import { SearchIcon } from "../components/SearchIcon";
import { useNFTs } from "../hooks/useNFTs";
import { truncateAddress } from "../utils/truncateAddress";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

export default function NFTOverview() {
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

  const breadcrumbs = [
    {
      title: `${truncateAddress(walletAddress)}`,
      href: `/${walletAddress}`,
      isCurrentPage: false,
    },
    {
      title: "Collection",
      href: `/${walletAddress}/collection/${collectionId}`,
      isCurrentPage: false,
    },
    { title: "NFT", isCurrentPage: true },
  ];

  const { data, isLoading, error } = useNFTs({
    walletAddress,
    collectionId,
  });

  const nft = React.useMemo(() => {
    return data?.filter((nft) => nft.mint === router.query.mintId)[0];
  }, [data]);

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    router.push("/[address]", `/${address}`);
  };

  console.log({ nft });

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
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading ? (
        <Loader animate={false} />
      ) : (
        <div className="flex justify-center mt-24">
          <div className="bg-white  overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <motion.div className="relative">
                <Image
                  src={nft?.offChain.image}
                  width={320}
                  height={320}
                  className="rounded-md z-10"
                />
                <div className="w-[270px] h-[270px] absolute bg-slate-200 left-2 top-2 rounded-md blur-sm"></div>
              </motion.div>
            </div>
          </div>
          <div className="w-96">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-xl mt-1 leading-6 font-medium text-gray-900 mb-4">
                {nft?.data.name}
              </h3>
              <div className="mb-4">{nft?.offChain?.description}</div>
              <a href={nft?.offChain?.external_url} className="text-slate-500 ">
                {nft?.offChain?.external_url}
              </a>
            </div>
            <div className="flex flex-wrap px-4 py-5 sm:px-6">
              {nft?.offChain?.attributes?.map((attribute) => (
                <span className="bg-green-100 mb-2 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 capitalize whitespace-pre-wrap">
                  {`${attribute.trait_type}: ${attribute.value}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
