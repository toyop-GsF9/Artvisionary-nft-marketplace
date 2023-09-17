import Head from 'next/head';

export default function ProfileArtist() {
	return (
		<div className="relative w-full h-[1440px] overflow-hidden text-left text-white font-[var(--font-inter)]">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>ArtVisionary</title>
			</Head>

			<div className="absolute top-0 left-0 bg-black w-[1440px] h-[1440px]"></div>

			<div className="absolute top-[152px] left-[224px] inline-block w-[970px] h-[362px] text-lg">
				<p className="text-xl leading-[40px] m-0">
					あなたも作品を登録してください。<br />
					スライドショーでご覧いただけるようになります。<br />
					オンラインギャラリーとして<br />
					アーチスト活動にお役立てください。<br />
					付与されたQRコードで販売することが可能です。
				</p>
				<p className="m-0">&nbsp;</p>
			</div>

			<img className="absolute top-[160px] left-[1010px] w-[200px] h-[200px] object-cover" alt="絵１" src="/images/painting1.png" />

			<div className="absolute top-[35.28%] right-[15.21%] bottom-[61.39%] left-[15.59%] text-center text-[var(--font-size-13xl)]">
				<div className="absolute top-0 left-[360px] font-medium">member登録</div>
				<img className="absolute top-[24px] left-[-100px] w-[350px] h-0.5" alt="" src="/images/vector-3.svg" />
				<img className="absolute top-[24px] left-[646px] w-[350px] h-0.5" alt="" src="/images/vector-4.svg" />
			</div>

			<div className="relative top-[616px] left-[223px] w-[203px] h-[203px] text-center text-black text-base">
				<div className="absolute top-0 left-0 w-[202px] h-[202px] bg-white rounded-full"></div>
				<div className="absolute top-[35px] left-[45px] font-semibold leading-[18px]">
					<p className="m-0">Select image file</p>
					<p className="m-0">or</p>
					<p className="m-0">Drop it here</p>
				</div>
			</div>
			<div className="absolute top-[591px] left-[458px] leading-[150%] font-medium tracking-tight">
				登録名（アーチスト名）
			</div>
			<div className="relative top-[480px] w-[758px] h-[48px] mx-[456px] bg-[var(--color-whitesmoke)] border border-black rounded-[var(--br-xs)]"></div>
			<div className="relative top-[673px] mx-[458px] leading-[150%] font-medium tracking-tight">
				プロフィール
			</div>
			<div className="relative w-[758px] h-[140px] top-[408px] mx-[456px] bg-[var(--color-whitesmoke)] border border-black rounded-[var(--br-xs)]"></div>
			<div className="relative top-[406px] ml-[220px] leading-[150%] font-medium tracking-tight">
				PR (アーチスト活動歴)
			</div>
			<div className="relative w-[997px] h-[360px] top-[404px] ml-[220px] bg-[var(--color-whitesmoke)] border border-black rounded-[var(--br-xs)]"></div>
			<div className="relative w-[497px] h-[48px] top-[410px] ml-[220px] leading-[150%] font-medium tracking-tight inline-block text-white">
				<p className="m-0">
					利用規約を必ずお読みいただき、同意の上、登録をしてください。
				</p>
				<p className="m-0">▫️利用規約に同意する</p>
			</div>
			<div className="relative w-[997px] h-[58px] top-[420px] ml-[220px] bg-#666 rounded-[var(--br-xs)]">
				<div className="absolute top-[10px] left-[420px] text-lg text-white">
					登録/更新する
				</div>
			</div>
			<div className="absolute top-[1288px] left-[1055px] w-[117px] h-[21px] text-center text-[var(--font-size-3xs)] text-white">
				<div className="absolute top-0 left-[1.46px] w-[115.54px] h-[21px] border border-white rounded-[8px]"></div>
				<div className="absolute top-[3px] w-[115px] h-[14px] leading-[150%] font-medium inline-block">
					削除する
				</div>
			</div>

		</div>
	);
}
