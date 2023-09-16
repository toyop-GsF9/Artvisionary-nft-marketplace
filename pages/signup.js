// pages/signup.js

import Head from 'next/head'
import Image from 'next/image'

export default function Signup() {
	return (
		<>
			<Head>
				<title>ArtVisionary</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				{/* <link rel="stylesheet" href="/global.css" />
				<link rel="stylesheet" href="/signup.css" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Michroma:wght@400&display=swap" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&display=swap" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Istok+Web:wght@700&display=swap" /> */}
			</Head>

			<div className="relative bg-white w-full h-[930px] overflow-hidden text-center text-[#696969] font-inter">
				<Image className="absolute top-0 left-0 object-cover" alt="" src="/images/gradation-1@2x.png" width={1440} height={930} />

				<div className="absolute top-[106px] left-[255px] w-[930px] h-[645px]">
					<div className="absolute top-0 left-[408px] text-lg leading-[150%] font-medium w-[113px] h-[78px] tracking-tighter">
						<p className="m-0 text-lg">Sign up</p>
					</div>
					<div className="absolute top-[110px] left-0 w-[930px] h-[535px] text-left text-xs">
						<div className="text-lg mb-5 w-[185px] h-[24px]">お名前（フルネーム）</div>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black w-[930px] h-[55px] mb-5"></div>

						<div className="text-lg mb-5 w-[252px]">フリガナ（フルネーム）</div>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black w-[930px] h-[55px] mb-5"></div>

						<div className="text-lg mb-5 w-[280px]">ログインメールアドレス（半角）</div>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black w-[930px] h-[55px] mb-5"></div>

						<div className="text-lg mb-5 w-[340px]">パスワード（半角英数記号８文字以上）</div>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black w-[930px] h-[55px] mb-5"></div>

						<div className="text-lg mb-5 w-[280px]">パスワード（確認用）</div>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black w-[930px] h-[55px] mb-5"></div>
					</div>

					<div className="relative w-[930px] h-[60px] text-white text-xl">
						<div className="relative rounded-[5px] bg-[cadetblue] w-[930px] h-[55px] mt-5 flex items-center justify-center">
							<p className="text-xl">submit</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
