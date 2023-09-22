import Head from "next/head";
import React, { useEffect, useState } from "react";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
// import { truncateEthAddress } from "../utils/truncAddress";
import { useRouter } from "next/router";
import QRCode from 'qrcode.react';


const mainURL = `https://arweave.net/`;

export default function Square() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/playlist');
  };


  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      provider
    );
    return contract;
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

          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenURI,
          };
          return item;
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



  useEffect(() => {
    getNfts();
  }, []);



  // useEffectの内部で画像のスライドショーの動作を設定
  useEffect(() => {
    // loadingがtrueでない場合、またはnftsが空の場合はタイマーを設定しない
    if (!loading || nfts.length === 0) return;

    // 3秒ごとにnextSlide関数を呼び出すタイマーを設定
    const timerId = setInterval(() => {
      nextSlide();
    }, 3000); // 3000ミリ秒 = 3秒

    // useEffectのクリーンアップ関数でタイマーをクリア
    return () => {
      clearInterval(timerId);
    };
  }, [loading, nfts, currentSlideIndex]); // loading, nfts, currentSlideIndex のいずれかが変更されたときに再度設定



  if (!loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center font-body">
        <img src="/logo.png" alt="logo" className="h-[160px] animate-bounce" />
        <h2 className="text-7xl font-semibold ">Loading...</h2>
      </div>
    );





  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % nfts.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + nfts.length) % nfts.length);
  };

  const changeAspectRatio = (ratio) => {
    setAspectRatio(ratio);
  };
  // NFTの詳細ページへのURLを取得
  const nftDetailURL = `https://artvisionary02.vercel.app/nft-details?price=${nfts[currentSlideIndex]?.price}&tokenId=${nfts[currentSlideIndex]?.tokenId}&seller=${nfts[currentSlideIndex]?.seller}&owner=${nfts[currentSlideIndex]?.owner}&image=${encodeURIComponent(nfts[currentSlideIndex]?.image)}&name=${encodeURIComponent(nfts[currentSlideIndex]?.name)}&description=${encodeURIComponent(nfts[currentSlideIndex]?.description)}&tokenURI=${encodeURIComponent(nfts[currentSlideIndex]?.tokenURI)}`;
  const nftDetailURL2 = `https://artvisionary02.vercel.app/dashboard`;

  return (
    <>

      {/* <div className="flex justify-between h-[50px] w-[720px] items-center">
        <div className="w-[36px] h-[36px] rounded-[9px] border border-gray-600 box-border"></div>



        <img className="w-[36px] h-[36px] object-cover" alt="icon" src="/images/mask-group@2x.png" />


        <div className="font-semibold truncate">
          <span className="underline">shin tanaka</span>
        </div>
        <div className="font-semibold truncate">Point</div>


        <img className="w-[36px] h-[36px] object-cover rounded-[9px]" alt="ETH" src="/images/ethereum-1@2x.png" />

        <div className="flex items-center w-[69px] h-[50px] font-semibold leading-[36px]">0.01 ETH</div>
      </div> */}

      <div className="flex justify-between h-[50px] w-[720px] items-center space-x-4">
        <div className="flex">
          <img className="w-[36px] h-[36px] object-cover mr-1" alt="icon" src="/images/mask-group@2x.png" />
          <div className="flex items-center h-[50px] font-semibold truncate mr-4">
            <span className="underline">shin tanaka</span>
          </div>
        </div>
        <div className="font-semibold truncate mr-4">Point</div>
        <div className="flex">
          <img className="w-[36px] h-[36px] rounded-[9px] mr-0" alt="ETH" src="/images/ethereum-1@2x.png" />
          <div className="flex items-center w-[69px] h-[50px] font-semibold leading-[36px]">0.01 ETH</div>
        </div>
      </div>


      <div className="w-[36px] !important h-[36px] !important bg-white p-1 rounded">
        <QRCode value={nftDetailURL2} fgColor="#0067c0" className="w-[36px] !important h-[36px] !important object-cover " />
      </div>






      {/* <div className="absolute top-[426px] left-[1159px] w-[179px] h-[360px] rounded-[20px] border border-gray-600 box-border"></div>
      <div className="absolute top-[703px] left-[1160px] w-[144px] h-[144px] bg-white p-2 rounded">
        <QRCode value={nftDetailURL2} fgColor="#0067c0" className="w-[62px] h-[62px] object-cover" />
      </div>
      <img className="absolute top-[444px] left-[1160px] w-[36px] h-[36px] object-cover" alt="icon" src="/images/mask-group@2x.png" />
      <div className="absolute top-[484px] left-[1160px] w-[138px] h-[26px] font-semibold">
        <span className="underline">shin tanaka</span>
      </div>
      <div className="absolute top-[516px] left-[1160px] w-[138px] h-[26px] font-semibold">Point</div>

      <img className="absolute top-[634px] left-[1198px] w-[12px] h-[18px] object-cover rounded-[12px]" alt="ETH" src="/images/ethereum-1@2x.png" />
      <div className="absolute top-[624px] left-[1217px] w-[69px] h-[37px] font-semibold leading-[36px]">0.01 ETH</div> */}






    </>
  );
};


