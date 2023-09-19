import Head from 'next/head';

export default function square() {
	return (
		<div className="font-inter">
			<Head>
				<meta charset="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" />
				<title>Artvisionary</title>
			</Head>

			<div className="relative w-full h-[930px] overflow-hidden text-left text-sm text-gray-600 bg-white">
				<div className="absolute top-0 left-0 w-[1440px] h-[930px] bg-black"></div>
				<div className="absolute top-[144px] left-[399px] w-[642px] h-[642px] bg-[#1a1a1a]"></div>
				<img className="absolute top-[164px] left-[421px] w-[598px] h-[598px] object-cover" alt="ART-point" src="/images/unsplashpgdw-bhdbpi@2x.png" />
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
		</div>
	);
}
