import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { MetadataKey } from "@nfteyez/sol-rayz/dist/config/metaplex";
import { Connection } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import groupBy from "lodash.groupby";

export type NFTTokenAccount = {
  mint: string;
  updateAuthority: string;
  data: {
    creators: any[] | undefined;
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
  };
  key: MetadataKey;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  masterEdition?: string | undefined;
  edition?: string | undefined;
  offChain?: {
    attributes: Array<any>;
    collection: any;
    description: string;
    symbol: string;
    edition: number;
    external_url: string;
    image: string;
    name: string;
    properties: {
      files: Array<any>;
      category: string;
      creators: Array<any>;
    };
    seller_fee_basis_points: number;
  };
};

export interface IuseNFTProps {
  publicAddress: string;
}

export const getSolanaNFTCollections = async (
  publicAddress: IuseNFTProps["publicAddress"]
): Promise<NFTTokenAccount[]> => {
  try {
    const NFTList = await getParsedNftAccountsByOwner({
      publicAddress: publicAddress,
      connection: new Connection("https://solana-api.projectserum.com"),
    });

    const filteredNFTList = NFTList.filter((item) => {
      return item.data.creators !== undefined;
    });

    const groupByCollection = groupBy(
      filteredNFTList,
      (item) => item.data.symbol
    );

    //   const collectionList = Object.keys(groupByCollection).map((key) => {
    //     return {
    //       collectionName: groupByCollection[key][0].data.name.split(" #")[0],
    //       collection: groupByCollection[key],
    //     };
    //   });

    console.log({
      groupByCollection: groupByCollection[Object.keys(groupByCollection)[0]],
    });

    const getNFTCollectionwithImage = async () => {
      return await Promise.all(
        Object.keys(groupByCollection).map(async (key, index) => {
          try {
            const response = await fetch(groupByCollection[key][0].data.uri);
            const data = await response.json();
            console.log({ data, number: index + 1 });
            return {
              collectionName:
                groupByCollection[key][0]?.data?.name?.split(" #")[0],
              ...groupByCollection[key],
              offChain: {
                ...data,
              },
            };
          } catch (error) {
            console.log({ x: error });
          }
        })
      );
    };

    const derivedNFTList = await getNFTCollectionwithImage();

    const filterNFTs = derivedNFTList.filter((item) => item !== undefined);

    console.log({ filterNFTs });

    return filterNFTs;
  } catch (error) {
    console.log({ error });
  }
};

export const useMutationCollection = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  return useMutation(getSolanaNFTCollections, {
    onError,
  });
};

export const useQueryCollection = ({ walletAddress }) => {
  return useQuery(
    ["collection", walletAddress],
    () => getSolanaNFTCollections(walletAddress),
    {
      enabled: !!walletAddress,
      retry: false,
    }
  );
};
