import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { MetadataKey } from "@nfteyez/sol-rayz/dist/config/metaplex";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
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

const getSolanaNFTs = async (
  publicAddress: IuseNFTProps["publicAddress"]
): Promise<NFTTokenAccount[]> => {
  const NFTList = await getParsedNftAccountsByOwner({
    publicAddress: publicAddress,
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

  const getNFTCollectionwithImage = async () => {
    return await Promise.all(
      Object.keys(groupByCollection).map(async (key) => {
        const response = await fetch(groupByCollection[key][0].data.uri);
        const data = await response.json();
        return {
          collectionName: groupByCollection[key][0].data.name.split(" #")[0],
          ...groupByCollection[key],
          offChain: {
            ...data,
          },
        };
      })
    );
  };

  const derivedNFTList = await getNFTCollectionwithImage();

  console.log({ derivedNFTList, groupByCollection });

  return derivedNFTList;
};

export const useNFTCollection = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  return useMutation(getSolanaNFTs, {
    onError,
  });
};
