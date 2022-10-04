import * as React from "react";
import { useNFT } from "../hooks/useNFT";
import Image from "next/image";

interface IGalleryProps {}

export const Gallery: React.FunctionComponent<IGalleryProps> = () => {
  const [address, setAddress] = React.useState("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  const { mutate, isLoading, data, error } = useNFT({
    onError: (error) => {
      console.log(error);
    },
  });

  console.log({ isLoading });

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    mutate(address);
  };

  console.log({ data });

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-4 col-span-6">
          <div className="flex flex-col">
            <form
              className="flex content-center items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="mr-3 rounded-md px-3 py-2 placeholder:text-slate-500 w-full border border-gray-300 text-gray-900 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Enter wallet address"
                onChange={handleChange}
                value={address}
              ></input>
              <button
                type="submit"
                className="sm:text-sm h-[38px] px-6 bg-amber-300 rounded-md text-amber-800 w-40"
              >
                Load NFT
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] mt-20 gap-6">
        {data?.map((item) => (
          <div key={item.data.name}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {item.data.name}
                </h3>
                <Image src={item?.offChain.image} width={320} height={320} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
