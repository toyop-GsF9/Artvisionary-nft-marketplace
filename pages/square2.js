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
      setNfts(items);
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
      <Head>
        <title>Playlist（square） || Artvisionary</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <div className="relative w-full min-h-[930px] flex items-center justify-center text-left text-sm text-gray-600 bg-white">
        <div className="bg-black absolute top-0 left-0 w-full h-full"></div>


        <div className="relative  min-w-[820px] min-h-[820px] max-w-[820px] max-h-[820px]  bg-[#1a1a1a] flex items-center justify-center border-4 border-gray-300 box-border">
          <img
            src={mainURL + nfts[currentSlideIndex]?.image}
            alt={nfts[currentSlideIndex]?.name}
            className="object-contain min-w-[712px] min-h-[712px] max-w-[712px] max-h-[712px]" // 720 - 4 * 2 (border)
          />
          <div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white">
            <button onClick={prevSlide}>前へ</button>
            <button onClick={handleGoBack}>戻る</button>
            <button onClick={nextSlide}>次へ</button>
          </div>
        </div>

      </div>
    </>
  );


  // return (
  //   <>
  //     <Head>
  //       <title>Playlist（square） || Artvisionary</title>
  //       <link rel="shortcut icon" href="logo.png" />
  //     </Head>
  //     <div className="relative w-full min-h-[930px] flex items-center justify-center text-left text-sm text-gray-600 bg-white">
  //       <div className="bg-black absolute top-0 left-0 w-full h-full"></div>


  //       <div className="relative w-full h-full md:w-[720px] md:h-[720px] max-w-[720px] max-h-[720px] bg-[#1a1a1a] flex items-center justify-center">
  //         <img
  //           src={mainURL + nfts[currentSlideIndex]?.image}
  //           alt={nfts[currentSlideIndex]?.name}
  //           className="object-contain min-w-[720px] min-h-[720px] max-w-[720px] max-h-[720px]"
  //         // className="object-contain max-w-[720px] max-h-[720px]"
  //         />
  //         <div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white">
  //           <button onClick={prevSlide}>前へ</button>
  //           <button onClick={handleGoBack}>戻る</button>
  //           <button onClick={nextSlide}>次へ</button>
  //         </div>
  //       </div>

  //     </div>
  //   </>


  // );

};


