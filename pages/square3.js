import Head from "next/head";
import React, { useEffect, useState } from "react";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
import Link from 'next/link';
import { useRouter } from "next/router";
import { QRCodeComponent } from "../components";


const mainURL = `https://arweave.net/`;

export default function Square() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [detailsVisible, setDetailsVisible] = useState(true);
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/playlist');
  };




  // const getContract = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   let contract = new ethers.Contract(
  //     process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  //     ContractABI.abi,
  //     provider
  //   );
  //   return contract;
  // };

  const getContract = () => {
    // RPC URLを使用してプロバイダを初期化
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

    // コントラクトを初期化
    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      provider
    );
    return contract;
  };

  const RETRY_INTERVAL = 5000; // 5 seconds
  const MAX_RETRIES = 3;
  const getNfts = async (retryCount = 0) => {
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

      if (error.code === "CALL_EXCEPTION" && retryCount < MAX_RETRIES) {
        // Retry after a delay
        setTimeout(() => {
          getNfts(retryCount + 1);
        }, RETRY_INTERVAL);
        return;
      }

      toast.error("ウォレット接続エラー（polygon Mumbaiで接続）");
    }

  };



  useEffect(() => {
    getNfts();
  }, []);
  useEffect(() => {
    // コンポーネントがマウントされた後に透明度を更新
    setOpacity(1);
  }, []);



  // useEffectの内部で画像のスライドショーの動作を設定
  useEffect(() => {
    // loadingがtrueでない場合、またはnftsが空の場合はタイマーを設定しない
    if (!loading || nfts.length === 0) return;

    // 3秒ごとにnextSlide関数を呼び出すタイマーを設定
    const timerId = setInterval(() => {
      nextSlide();
    }, 10000);

    // useEffectのクリーンアップ関数でタイマーをクリア
    return () => {
      clearInterval(timerId);
    };
  }, [loading, nfts, currentSlideIndex]); // loading, nfts, currentSlideIndex のいずれかが変更されたときに再度設定


  useEffect(() => {
    // スライドが切り替わるたびに実行される
    setDetailsVisible(true); // 詳細情報を表示

    const timer = setTimeout(() => {
      setDetailsVisible(false); // 1秒後に非表示
    }, 3500);

    return () => clearTimeout(timer); // クリーンアップ関数
  }, [currentSlideIndex]); // currentSlideIndexが変更されるたびに実行

  // 画像が最初に読み込まれたときにも詳細情報を表示するためのロジック
  useEffect(() => {
    if (nfts.length > 0) {
      setDetailsVisible(true);

      const timer = setTimeout(() => {
        setDetailsVisible(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [nfts]); // nftsが変更されたときに実行

  if (!loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center font-body bg-gradient-to-br from-gray-900 to-black">
        <img src="/logo.png" alt="logo" className="h-[160px] animate-pulse" />
        <h2 className="text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-black mt-5">
          Loading...
        </h2>
      </div>
    )


  // 画像のプリロード機能
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };


  const nextSlide = async () => {
    // 次のスライドの画像URLを取得
    const nextIndex = (currentSlideIndex + 1) % nfts.length;
    const nextImageUrl = mainURL + nfts[nextIndex].image;

    // 次の画像をプリロード
    await preloadImage(nextImageUrl);

    // 透明度を0に設定してフェードアウト
    setOpacity(0);

    // 画像の読み込みが完了したらスライドインデックスを更新
    setTimeout(() => {
      setCurrentSlideIndex(nextIndex);
      // 透明度を1に設定してフェードイン
      setOpacity(1);
    }, 1000); // アニメーションの持続時間に合わせて調整

  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + nfts.length) % nfts.length);
  };

  // NFTの詳細ページへのURLを取得
  const nftDetailURL = `https://artvisionary-nft-marketplace-pi.vercel.app/nft-details?price=${nfts[currentSlideIndex]?.price}&tokenId=${nfts[currentSlideIndex]?.tokenId}&seller=${nfts[currentSlideIndex]?.seller}&owner=${nfts[currentSlideIndex]?.owner}&image=${encodeURIComponent(nfts[currentSlideIndex]?.image)}&name=${encodeURIComponent(nfts[currentSlideIndex]?.name)}&description=${encodeURIComponent(nfts[currentSlideIndex]?.description)}&tokenURI=${encodeURIComponent(nfts[currentSlideIndex]?.tokenURI)}`;
  const nftDetailURL2 = `https://artvisionary-nft-marketplace-pi.vercel.app/dashboard`;

  const truncateSeller = (seller) => seller.slice(-4);
  return (
    <>
      <Head>
        <title>Playlist（square） || Treasure Art</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <div className="flex items-center justify-center bg-black relative h-screen w-screen">
        {/* 正方形を保持するためにコンテナのサイズを調整 */}
        {/* <div className="flex items-center justify-center relative bg-black h-[min(100vh,100vw)] w-[min(100vh,100vw)]"> */}
        <div className="flex items-center justify-center relative bg-black h-[min(100vh,100vw)] w-[min(100vh,100vw)] sm:mt-[-50px]">
          <img
            src={mainURL + nfts[currentSlideIndex]?.image}
            alt={nfts[currentSlideIndex]?.name}
            className={`object-contain max-h-[676px] max-w-[676px] h-full w-full p-4 transition-opacity duration-1000 ${opacity ? 'opacity-100' : 'opacity-0'}`}
            style={{ opacity: opacity }}
            onLoad={() => setOpacity(1)}
          />


          <div className={`absolute bg-black bg-opacity-50 bottom-0 left-0 right-0 px-4 py-2 text-white transition-opacity duration-1000 ${detailsVisible ? 'opacity-100' : 'opacity-0'} w-full`}>
            {/* 上の行：タイトル */}
            <div className="flex justify-center mb-2 mt-2 ">
              <span className="truncate">{nfts[currentSlideIndex]?.name}</span>
            </div>

            {/* 下の行：ロゴ、作者番号、価格ロゴ、価格 */}
            <div className="flex justify-between ">
              <div className="flex items-center">
                <img
                  className="w-9 h-9 object-cover mr-1"
                  alt="icon"
                  src="/images/mask-group@2x.png"
                />
                <span className="underline truncate">{truncateSeller(nfts[currentSlideIndex]?.seller)}</span>
              </div>
              <div className="flex items-center">
                <img
                  className="w-8 h-6 rounded-[9px]"
                  alt="MATIC"
                  src="/images/polygonlogo-mono.png"
                />
                <span className="ml-2 font-semibold leading-[32px]">
                  {nfts[currentSlideIndex]?.price} MATIC
                </span>
              </div>
            </div>
          </div>


        </div>
        <div className="absolute bottom-0 mb-10 right-0 transform -translate-x-1/2 md:bottom-2 md:left-auto md:right-4 md:transform-none">
          <Link href={nftDetailURL} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <QRCodeComponent
                value={nftDetailURL}
                className="w-[81px] h-[81px]"
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );



}