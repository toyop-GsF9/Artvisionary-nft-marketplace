import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Sampleplay() {
	const playlists = {

		ColorfulAnimal: [
			"/images/colorfulcat1.jpeg",
			"/images/colorfulcat2.jpeg",
			"/images/colorfuldog.jpeg",
			"/images/colorfulelephant.jpeg"
		],
		PixcelArt: [
			"/images/pixelart1.jpeg",
			"/images/pixelart2.jpeg",
			"/images/pixelart3.jpeg",
			"/images/pixelart4.jpeg"
		],
		Robot: [
			"/images/robot_1.jpeg",
			"/images/robot_2.jpeg",
			"/images/robot_3.jpeg",
			"/images/robot_4.jpeg"
		],
		Microscope: [
			"/images/cell_1.jpeg",
			"/images/cell_2.jpeg",
			"/images/cell_5.jpeg",
			"/images/cell_6.jpeg"
		],
		SF: [
			"/images/space alien.png",
			"/images/spaceboys.jpeg",
			"/images/spacewomen.png"
		]
	};


	const [currentPlaylist, setCurrentPlaylist] = useState('ColorfulAnimal');
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	const nextSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % playlists[currentPlaylist].length);
	};

	const prevSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length);
	};

	const changePlaylist = (genre) => {
		setCurrentPlaylist(genre);
		setCurrentSlideIndex(0); // プレイリストを切り替えるときにスライドのインデックスをリセット
	};

	// 画像の自動切り替え
	useEffect(() => {
		const intervalId = setInterval(() => {
			nextSlide();
		}, 3000); // 3秒おきに次の画像に切り替え

		// コンポーネントがアンマウントされた場合に、intervalをクリアする
		return () => {
			clearInterval(intervalId);
		};
	}, [currentSlideIndex, currentPlaylist]);

	return (
		<>
			<Head>
				<title>Playlist（sample） || Artvisionary</title>
				<link rel="shortcut icon" href="logo.png" />
			</Head>

			<div className="relative w-full h-[930px] overflow-hidden text-left text-sm text-gray-600 bg-white">
				<div className="absolute top-0 left-0 w-[1440px] h-[930px] bg-black"></div>
				<div className="absolute top-[144px] left-[399px] w-[642px] h-[642px] bg-[#1a1a1a]">
					<div className="w-full h-full bg-white relative">
						<div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-3xl font-semibold p-2 rounded">
							{currentPlaylist}
						</div>
						<img
							src={playlists[currentPlaylist][currentSlideIndex]}
							alt={`Image from ${currentPlaylist} ${currentSlideIndex + 1}`}
							className="absolute inset-0 object-cover w-full h-full"
						/>



						<div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white">
							<button onClick={prevSlide}>前へ</button>
							<button onClick={nextSlide}>次へ</button>

						</div>


					</div>
					<div className="genre-list flex space-x-4 p-4">
						{Object.keys(playlists).map((genre) => (
							<button
								key={genre}
								onClick={() => changePlaylist(genre)}
								className="text-white bg-gray-800 p-2 rounded hover:bg-gray-700">
								{genre}
							</button>
						))}
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
}
