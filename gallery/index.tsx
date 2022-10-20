import * as React from "react";
// import { useNFT } from "../hooks/useNFT";
// import { useNFTCollection } from "../hooks/useNFTCollection";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "../components/SearchIcon";
import Router, { useRouter } from "next/router";
import Link from "next/link";

interface IGalleryProps {}

const transition = { duration: 2.6, ease: [0.43, 0.13, 0.23, 0.96] };

const defaultAddress = "Heb1FEcEuY4c7byfyS9iFzphomJb8riMCHvReqSeZURc";

export const Gallery: React.FunctionComponent<IGalleryProps> = () => {
  const [address, setAddress] = React.useState(defaultAddress);

  const router = useRouter();

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    Router.push("/[address]", `/${address}`);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-span-6">
        <div className="flex flex-col">
          {/* <AnimatePresence>
            <motion.div
              key={router.route}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition}
              className="flex text-5xl justify-center items-center font-sans text-gray-900 font-light text-center mb-9"
            >
              <motion.span
                className="mr-5"
                exit={{ opacity: 0 }}
                initial={{ opacity: 1 }}
                transition={transition}
              >
                <div className="rounded-lg h-10 w-10 border-2 border-gray-400 rotate-60"></div>
              </motion.span>
              Rect
            </motion.div>
          </AnimatePresence> */}

          {/* <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              key={address}
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="text-center text-slate-400 font-light tracking-wider mb-6 text-lg"
            >
              Explore NFTs inside any{" "}
              <Image
                src="/solana.svg"
                alt="Solana Logo"
                width={28}
                height={16}
              />{" "}
              Solana wallet
            </motion.div>
          </AnimatePresence> */}
          <form
            className="flex content-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full">
              <input
                type="text"
                className="h-20 px-8 py-4 sm:text-xl shadow-[0_2px_6px_rgb(0_0_0_/_5%)] border-gray-300/50 rounded-lg placeholder:text-gray-400 w-full text-gray-900 focus:border-gray-400/50 focus:outline-transparent focus:ring-transparent transition duration-200 placeholder:font-light font-sans placeholder:text-center placeholder:text-xl cursor-text text-center"
                placeholder="enter wallet address"
                onChange={handleChange}
                value={address}
              ></input>
              <button type="submit" className="absolute right-6 top-7">
                <SearchIcon
                  whileHover={{
                    scale: 1.1,
                    transition,
                  }}
                />
              </button>
            </div>
          </form>
          {/* <div className="text-center font-sans my-6">OR</div>
          <div className="text-center">
            <Link href={"/[address]"} as={`/${address}`}>
              <button className="h-10 px-4 bg-neutral-900  rounded-lg text-neutral-200 w-40 hover:bg-neutral-700 transition-colors">
                Connect
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};
