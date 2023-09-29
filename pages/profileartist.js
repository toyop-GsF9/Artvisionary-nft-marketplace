import Head from 'next/head';
import axios from "axios";
import { useState } from 'react';
import { useRouter } from "next/router"; 
import Image from "next/image";

export default function ProfileArtist() {
  const router = useRouter();

  const [artistName, setArtistName] = useState("");
  const [profile, setProfile] = useState("");
  const [pr, setPR] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [walletAddress, setWalletAddress] = useState(
    "0x70443af823cfcdab0f7e5e0e8899a87ff77847d2"
  );
  const user_type = "artist";

  // ファイルが選択された時の処理
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // 画像のプレビュー
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", artistName);
    formData.append("bio", profile);
    formData.append("content", pr);
    formData.append("user_id", walletAddress);
    formData.append("user_type", user_type);
    formData.append("profile_image", image);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('There was an error submitting the form', error);
		}
	};
	return (
		<div className="flex flex-col w-full min-h-screen text-white font-[var(--font-inter)] bg-black">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>Treasure Art</title>
			</Head>

      <div className="flex flex-row md:flex-col justify-center items-center h-[362px] mx-4 mt-8 md:mt-32">
        <div className="text-2xl flex-grow mb-4 md:mb-0 md:mr-4">
          <p className="md:text-xl leading-relaxed">
            あなたも作品を登録してください。
            <br />
            スライドショーでご覧いただけるようになります。
            <br />
            オンラインギャラリーとして
            <br />
            アーチスト活動にお役立てください。
            <br />
            付与されたQRコードで販売することが可能です。
            <br />
          </p>
        </div>

        <img
          className="w-44 md:w-44 h-44 md:h-44 object-cover mt-4 md:mt-4"
          alt="絵１"
          src="/images/painting1.png"
        />
      </div>

      <div className="flex justify-center items-center mt-12 text-[var(--font-size-13xl)]">
        <img className="w-44 h-0.5" alt="" src="/images/vector-3.svg" />
        <div className="mx-4 font-medium">member登録</div>
        <img className="w-44 h-0.5" alt="" src="/images/vector-4.svg" />
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="flex justify-center items-center w-full max-w-xs h-[153px] md:h-[203px] rounded-full bg-white hover:bg-gray-400 text-black hover:text-gray-700 text-base mt-4 transition duration-300">
          <label className="font-semibold leading-[18px]">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              name="profile_image"
              onChange={handleImageChange}
            />
            <p className="m-0">Select image file</p>
            <p className="m-0">or</p>
            <p className="m-0">Drop it here</p>
          </label>
        </div>
        {previewImage && (
          <div
            className="mt-4"
            style={{ width: "200px", height: "200px", position: "relative" }}
          >
            <Image
              src={previewImage}
              alt="Preview"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col items-center mt-4">
          <label className="w-full max-w-xl leading-[150%] font-medium tracking-tight">
            登録名（アーチスト名）
            <input
              type="text"
              className="w-full h-[48px] mt-2 bg-gray-200 border border-black rounded-[var(--br-xs)] p-2"
              value={artistName}
              name="name"
              onChange={(e) => setArtistName(e.target.value)}
            />
          </label>

          <label className="w-full max-w-xl leading-[150%] font-medium tracking-tight mt-4">
            プロフィール
            <textarea
              className="w-full h-[140px] mt-2 bg-gray-200 border border-black rounded-[var(--br-xs)] p-2"
              value={profile}
              name="bio"
              onChange={(e) => setProfile(e.target.value)}
            ></textarea>
          </label>

          <label className="w-full max-w-2xl leading-[150%] font-medium tracking-tight mt-4">
            PR (アーチスト活動歴)
            <textarea
              className="w-full h-[360px] mt-2 bg-gray-200 border border-black rounded-[var(--br-xs)] p-2"
              value={pr}
              name="content"
              onChange={(e) => setPR(e.target.value)}
            ></textarea>
          </label>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-4 w-full max-w-2xl mt-4">
            <div className="w-full max-w-md leading-[150%] font-medium tracking-tight text-white">
              <p className="m-0">
                利用規約を必ずお読みいただき、同意の上、登録をしてください。
              </p>
              <label className="cursor-pointer mt-2">
                <input type="checkbox" className="mr-2" />
                利用規約に同意する
              </label>
            </div>

            <button
              type="submit"
              className="w-full max-w-xl h-[58px] bg-#666 rounded-[var(--br-xs)] flex items-center justify-center text-lg  mt-2"
            >
              登録する
            </button>
          </div>

          {/* <button className="w-[117px] h-[21px] border border-white rounded-[8px] flex items-center justify-center text-[var(--font-size-3xs)]  mt-4 mb-4">
            削除する
          </button> */}
        </div>
      </form>
    </div>
  );
}
