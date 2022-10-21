import * as React from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../components/SearchIcon";

interface IGalleryProps {}

const transition = { duration: 2.6, ease: [0.43, 0.13, 0.23, 0.96] };

// const defaultAddress = "Heb1FEcEuY4c7byfyS9iFzphomJb8riMCHvReqSeZURc";

export const Gallery: React.FunctionComponent<IGalleryProps> = () => {
  const [address, setAddress] = React.useState("");

  const router = useRouter();

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    router.push({
      pathname: "[address]",
      query: { address: address, from: "front-page" },
    });
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-span-6">
        <div className="flex flex-col">
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
