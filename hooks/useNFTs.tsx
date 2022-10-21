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

const getSolanaNFTs = async (
  publicAddress: IuseNFTProps["publicAddress"],
  collectionId: string
): Promise<NFTTokenAccount[]> => {
  const NFTList = await getParsedNftAccountsByOwner({
    publicAddress: publicAddress,
    connection: new Connection("https://solana-api.projectserum.com"),
  });

  const filteredNFTList = NFTList.filter((item) => {
    return item.data.creators !== undefined;
  });

  const NFTListByUpdateAuthority = filteredNFTList.filter(
    ({ updateAuthority }) => {
      return updateAuthority === collectionId;
    }
  );

  const getNFTwithMetadata = async () => {
    return await Promise.all(
      NFTListByUpdateAuthority.map(async (item) => {
        const response = await fetch(item.data.uri);
        const data = await response.json();
        return {
          ...item,
          offChain: {
            ...data,
          },
        };
      })
    );
  };

  const derivedNFTList = await getNFTwithMetadata();

  return derivedNFTList;
};

export const useNFTs = ({ walletAddress, collectionId }) => {
  return useQuery(
    ["collection", walletAddress, collectionId],
    () => getSolanaNFTs(walletAddress, collectionId),
    {
      enabled: !!walletAddress,
      retry: false,
    }
  );
};
