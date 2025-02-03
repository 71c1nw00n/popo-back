"use client";

import { useRef, useState } from "react";
import { API_BASE_URL } from "../config/config"; // 환경 변수 가져오기

const ImageUploader = () => {
    const fileInputRef = useRef(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(
        `${API_BASE_URL}/uploads/cropped_uploaded_image.png`
    );

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        await fetch(`${API_BASE_URL}/upload`, {
            method: "POST",
            body: formData,
        });

        // 캐시 우회를 위해 URL 변경 (쿼리 스트링 추가)
        setUploadedImageUrl(`${API_BASE_URL}/uploads/cropped_uploaded_image.png?t=${new Date().getTime()}`);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="relative w-[350px] h-[250px] border rounded-lg overflow-hidden">
            {/* 업로드된 이미지 표시 */}
            <img
                src={uploadedImageUrl}
                alt="업로드된 이미지"
                className="w-full h-full object-cover"
                onLoad={() => console.log("이미지 로드 완료")} // 로드 확인용
            />

            {/* 업로드 버튼 */}
            <button
                onClick={handleButtonClick}
                className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
            >
                <img src="/image-4.png" className="w-6 h-6"/>
            </button>

            {/* 파일 업로드 input (숨김 처리) */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageUploader;
