import Head from "next/head";
import React, { useEffect, useState } from "react";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
// import { truncateEthAddress } from "../utils/truncAddress";
// import { useRouter } from "next/router";


const mainURL = `https://arweave.net/`;

export default function Square() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);


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



  return (
    <>
      <Head>
        <title>Playlist（square） || Artvisionary</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <div className="relative w-full h-[930px] overflow-hidden text-left text-sm text-gray-600 bg-white">
        <div className="absolute top-0 left-0 w-[1440px] h-[930px] bg-black"></div>
        <div className="absolute top-[144px] left-[399px] w-[642px] h-[642px] bg-[#1a1a1a]">
          <div className="w-full h-full bg-white relative">
            <img
              src={mainURL + nfts[currentSlideIndex]?.image}
              alt={nfts[currentSlideIndex]?.name}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white">
              <button onClick={prevSlide}>前へ</button>
              <button onClick={() => setIsModalOpen(false)}>閉じる</button>
              <button onClick={nextSlide}>次へ</button>
              {/* <button onClick={() => changeAspectRatio('3:2')}>3:2 </button>
            <button onClick={() => changeAspectRatio('9:16')}>9:16 </button>
            <button onClick={() => changeAspectRatio('1:1')}>1:1 </button> */}
            </div>
          </div>


        </div>

        <div className="absolute top-[426px] left-[1159px] w-[179px] h-[360px] rounded-[20px] border border-gray-600 box-border"></div>
        <img className="absolute top-[444px] left-[1181px] w-[36px] h-[36px] object-cover" alt="icon" src="/images/mask-group@2x.png" />
        <div className="absolute top-[484px] left-[1181px] w-[138px] h-[26px] font-semibold">
          <span className="underline">shin tanaka</span>
        </div>
        <div className="absolute top-[516px] left-[1181px] w-[138px] h-[26px] font-semibold">Point</div>
        <hr className="absolute left-[1181px] top-[542px] w-[138px] border-t-[0.5px] border-gray-600" />
        <div className="absolute top-[560px] left-[1181px] w-[139px] h-[68px] font-semibold">#noise #science</div>
        <hr className="absolute left-[1181px] top-[612px] w-[138px] border-t-[0.5px] border-gray-600" />
        <img className="absolute top-[634px] left-[1198px] w-[12px] h-[18px] object-cover rounded-[12px]" alt="ETH" src="/images/ethereum-1@2x.png" />
        <div className="absolute top-[624px] left-[1217px] w-[69px] h-[37px] font-semibold leading-[36px]">0.01 ETH</div>
        <button className="absolute top-[664px] left-[1218px] w-[60px] h-[24px] font-semibold leading-[24px] text-white bg-gray-600 rounded-[4px]">BUY</button>
        <img className="absolute top-[703px] left-[1218px] w-[62px] h-[62px] object-cover" alt="QRコード" src="/images/-20230905-009-1@2x.png" />
      </div>
    </>
  );
};


