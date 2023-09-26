// components/QRCodeComponent.js

import QRCode from 'qrcode.react';

function QRCodeComponent({ value, size = 64 }) {
	return (
		<div className="w-[72px] h-[72px] bg-white p-1 z-10 ">
			<QRCode value={value} fgColor="#0067c0" size={size} className="top-0 w-[64px] h-[64px]" />
		</div>
	);
}

export default QRCodeComponent;
