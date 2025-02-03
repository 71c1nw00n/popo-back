'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ApiFetcher from "@/components/ApiFetcher";
import ImageUploader from "@/components/ImageUploader";
import { API_BASE_URL } from "@/config/config"; // 환경 변수 가져오기

// 도움말 모달
const HelpModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        aria-label="도움말"
        className="w-8 h-8 bg-gray-200 rounded-[40%] flex items-center justify-center hover:bg-gray-300 focus:outline-none"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-lg font-bold text-black">?</span>
      </button>
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* 모달 팝업 */}
          <div className="bg-white w-[400px] md:w-[600px] p-6 rounded-3xl shadow-lg relative">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* 모달 내용 */}
            <div className="grid grid-cols-2 items-center">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-1">
                <span className="text-xl mb-1 mr-2">※</span> 프로젝트 정리 가이드
              </h2>
              <div className="flex justify-end">
                <a href={"https://youtu.be/OGSUsOoOhpI?si=3JppbeOZCi-nl5Pr"} 
                  className="flex justify-end mr-10" 
                  target="_blank" // 새탭열기
                  rel="noopener noreferrer"
                >
                  <img
                    src={"/yt-logo.png"}
                    alt="Example yt"
                    layout="fixed"
                    height={30}
                    width={40}
                    className=" cursor-pointer"
                  />
                </a>
              </div>
            </div>

            <div className="space-y-10">
              {/* 1번 섹션 */}
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* 이미지 */}
                <div className="flex justify-center">
                  <img
                    src="/example-image-1.png"
                    alt="Example 1"
                    className="max-w-full h-auto rounded-md shadow-md"
                  />
                </div>
                {/* 텍스트 */}
                <div>
                  <p className="text-sm text-gray-600">
                    1. 대표 이미지를 삽입해 주세요! 
                    (크기는 000x000 으로 조정됩니다)
                  </p>
                </div>
              </div>

              {/* 2번 섹션 */}
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* 이미지 */}
                <div className="flex justify-center">
                  <img
                    src="/example-image-2.png"
                    alt="Example 2"
                    className="max-w-full h-auto rounded-md shadow-md"
                  />
                </div>
                {/* 텍스트 */}
                <div>
                  <p className="text-sm text-gray-600">
                    2. 해당 프로젝트의 주요기능을 설명해 주세요! 기간 및 기능, git-url등을 기재하려면 함께 적어주세요! 
                  </p>
                </div>
              </div>

              {/* 3번 섹션 */}
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* 이미지 */}
                <div className="flex justify-center">
                  <img
                    src="/example-image-3.png"
                    alt="Example 3"
                    className="max-w-full h-auto rounded-md shadow-md"
                  />
                </div>
                {/* 텍스트 */}
                <div>
                  <p className="text-sm text-gray-600">
                    3. 프로젝트 타이틀과 본인이 담당한 skill과 라이브러리를 글에 포함시켜 주세요!
                  </p>
                </div>
              </div>

              {/* 4번 섹션 */}
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* 이미지 */}
                <div className="flex justify-center">
                  <img
                    src="/example-image-4.png"
                    alt="Example 4"
                    className="max-w-full h-auto rounded-md shadow-md"
                  />
                </div>
                {/* 텍스트 */}
                <div>
                  <p className="text-sm text-gray-600">
                    4. 작성이후 보내기 버튼으로 AI의 페이지 생성을 기다리세요!이후 수정 및 프로젝트 추가가 가능합니다!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Input style 일단은 submit 누르면 저장되는걸로 되어있음
const InputStyle = () => {
  const [text, setText] = useState(""); // 입력값
  const router = useRouter();

  // 텍스트 파일 생성 및 다운로드
  const saveAsFile = () => {
    if (!text.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    const blob = new Blob([text], { type: "text/plain" }); // Blob 객체 생성
    const url = URL.createObjectURL(blob); // Blob URL 생성

    // 다운로드를 위한 링크 생성
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.txt"; // 파일 이름 지정
    document.body.appendChild(link);
    link.click(); // 링크 클릭하여 다운로드 실행
    document.body.removeChild(link); // 링크 제거
    URL.revokeObjectURL(url); // 메모리 해제
  };

  return (
    <div className="px-4 sm:px-6 w-full max-w-[880px] mx-auto">
      {/* 입력 필드 */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="저는 XXX 프로젝트를 진행했고, 해당 프로젝트는 99년 1월부터 9월까지 진행되었습니다. 저는 HTML/CS와 JS, 구글 API, MySQL을 담당했고 이를 이용해 UI/UX와 사용자와의 인터렉션을 구현했고 db를 관리했습니다."
        className="w-full h-40 p-4 rounded-md border text-sm text-black md:text-base"
      ></textarea>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            saveAsFile();
            router.push("/step4_re");
          }}
          className="w-10 h-10 rounded-[15px] hover:bg-gray-300 flex items-center justify-center"
        >
          <img src="/submit.png" alt="저장 버튼" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// GPT API 후첨

{/*main*/}
const Step4 = () => {
  // 도움말 모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  <ApiFetcher />
  return (
    <div className="relative w-full h-auto bg-white overflow-hidden">
      {/* header */}
      <header className="bg-[#FFFFFF] text-white py-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* 로고 */}
          <div className="text-3xl font-bold text-[#2300A1]">POPO</div>

          {/* 네비게이션 메뉴 */}
          {/*<nav className="flex space-x-6">
            <a href="#Next" className="hover:text-gray-300 font-bold text-[#2300A1] text-xl">
              다음
            </a>
          </nav>*/}
        </div>
      </header>

      {/* body */}
      <div className="pt-2">
        {/* 설명 */}
        <div className="flex items-center justify-between bg-white shadow px-10 pt-20 pb-5">
          {/* 왼쪽 섹션 */}
          <div>
            <h1 className="text-xl font-bold text-black">Step 4. 프로젝트 경험 추가</h1>
            <p className="text-sm text-gray-600">프로젝트 소개 및 담당 업무를 입력해주세요!</p>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="flex items-center">
            <HelpModal onOpen={() => setIsModalOpen(true)} />
            <p className="ml-2 text-sm text-gray-500">
              작성한 내용을 바탕으로 AI가 포트폴리오를 작성합니다!
            </p>
          </div>
        </div>

        {/* example 미디어쿼리 아직 없음 +  이미지 업로드 db 미완 */} 
        {/*https://velog.io/@cloud_oort/Next.js-프로필-이미지-업로드*/}        
        <div className="flex items-center justify-between gap-5 p-6 rounded-lg max-w-4xl mx-auto">
          {/* 왼쪽 섹션 */}
          <div className="flex flex-col items-center w-full md:w-[45%] bg-gray-100 p-4 rounded-lg shadow">
            {/* 프로젝트 미리보기 */}
            <div className="w-full h-[250px] bg-gray-300 rounded-md flex items-center justify-center">
              <ImageUploader />
            </div>

            {/* 프로젝트 제목 */}
            <div className="mt-4 w-full">
              <p className="text-lg font-bold text-gray-700">prj_title</p>
              <p className="text-sm text-gray-500">담당 skill & libraries</p>
            </div>

            {/* 기술 스택 */}
            <div className="flex flex-wrap mt-2 gap-2">
              <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md">HTML/CSS</span>
              <span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-md">JS</span>
              <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-md">Google API</span>
              <span className="bg-purple-500 text-white text-sm px-2 py-1 rounded-md">MySQL</span>
            </div>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="flex flex-col w-full md:w-[50%] mt-6 md:mt-0 bg-white p-4 rounded-lg shadow">
            {/* 프로젝트 제목 */}
            <p className="text-xl font-bold text-gray-700">prj_title</p>
            <p className="text-sm text-gray-500 mt-1">프로젝트를 소개해주세요!</p>

            {/* 프로젝트 정보 */}
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-bold">📅 프로젝트 기간:</span> 99.01 - 99.09
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">🖥️ 담당 기능:</span> UI/UX, 인터렉션 구현, 데이터베이스 관리
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">🔗 Git-url:</span> <a href="https://github.com/kaist-cp/cs220" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">https://github.com/kaist-cp/cs220</a>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">📈 성장 경험:</span> 저는 사용자 인터렉션에 대해 학습하면서 모바일 환경에 대한 이해도를 높였습니다. 특히 화면 전환과 관련한 정보를 중점으로 학습하였습니다.
              </p>
            </div>
          </div>
        </div>

        {/*GPT API 연동 & 입력란*/}
        <InputStyle/>

        {/* SVG Bar */}
        <svg
          width={1219}
          height={58}
          viewBox="0 0 1219 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-4/9 max-w-[800px] h-auto py-4 "
          preserveAspectRatio="none"
        >
          <rect x={29} y={20} width={1163} height={17} fill="#D9D9D9" />
          <circle cx={29} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={261} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={493} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={726} cy={29} r={29} fill="#CECFED" />
          <circle cx={958} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={1190} cy={29} r={29} fill="#D9D9D9" />
        </svg>
      </div>
    </div>
  );
};



export default Step4;