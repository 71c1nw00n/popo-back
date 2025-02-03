'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function Wait() {
  const router = useRouter();

  return (
    <div className="relative w-full h-auto bg-white overflow-hidden">
      {/* header */}
      <header className="bg-[#FFFFFF] text-white py-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* 로고 */}
          <div className="text-3xl font-bold text-[#2300A1]">POPO</div>
        </div>
      </header>

      {/* body */}
      <div className="flex flex-col gap-10 pt-[100px] justify-center items-center">
        <img
          src="/nupjuk2.png"
          alt="대기화면 입니다."
        >
        </img>
        <p className="font-bold text-3xl grid place-items-center">
          잠시만 기다려 주세요!<br/><span className="font-medium text-xl text-gray-400 grid place-items-center">ai가 프로젝트 포트폴리오를 작성중입니다...</span>
        </p>
      </div>
      
    </div>
  );
}
