import Head from "next/head";
import React, { useEffect, useState } from "react";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { QRCodeComponent } from "../components";

const mainURL = `https://arweave.net/`;

export default function Square() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/playlist");
  };

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      provider
    );
  };

  const getNfts = async () => {
    try {
      const contract = await getContract();
      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data?.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          const meta = await axios.get(mainURL + tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          return {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenURI,
          };
        })
      );

      // setNfts(items);
      setNfts([...items].reverse());
      setLoading(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // useEffect(() => {
  //   getNfts();
  // }, []);

  useEffect(() => {
    if (!loading || nfts.length === 0) return;
    const timerId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(timerId);
    };
  }, [loading, nfts, currentSlideIndex]);

  if (loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center font-body">
        <img src="/logo.png" alt="logo" className="h-[160px] animate-bounce" />
        <h2 className="text-7xl font-semibold ">Loading...</h2>
      </div>
    );

  const currentNft = nfts[currentSlideIndex];
  const nftDetailURL = `https://artvisionary02.vercel.app/nft-details?price=${currentNft?.price
    }&tokenId=${currentNft?.tokenId}&seller=${currentNft?.seller}&owner=${currentNft?.owner
    }&image=${encodeURIComponent(currentNft?.image)}&name=${encodeURIComponent(
      currentNft?.name
    )}&description=${encodeURIComponent(
      currentNft?.description
    )}&tokenURI=${encodeURIComponent(currentNft?.tokenURI)}`;

  return (
    <>
      <Head>
        <title>Playlist（square） || Treasure Art</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <div className="w-full h-[930px] max-w-[1440px] flex items-center justify-center bg-black relative">
        <div className="w-[852px] h-[852px] bg-[#1a1a1a] flex items-center justify-center relative ">
          <img
            src={mainURL + currentNft?.image}
            alt={currentNft?.name}
            className="object-contain h-[676px] w-[676px] mt-[-40px]"
          />
          <div className="flex justify-between px-4 py-2 absolute bottom-2 left-0 right-0 text-[#a3a3a3] w-full">
            <div className="flex items-center">
              <img
                className="w-9 h-9 object-cover mr-1"
                alt="icon"
                src="/images/mask-group@2x.png"
              />
              <span className="underline truncate ml-2">shin tanaka</span>
              <span className="truncate ml-6">title</span>
            </div>
            <div className="flex items-center pr-24">
              {" "}
              <img
                className="w-6 h-9 rounded-[9px]"
                alt="MATIC"
                src="/images/ethereum-1@2x.png"
              />
              <span className="ml-2 font-semibold leading-[32px]">
                0.01 MATIC
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 mr-4 mb-4">
            <QRCodeComponent
              value={nftDetailURL}
              className="w-[81px] h-[81px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}