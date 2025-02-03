'use client';
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import PropTypes from "prop-types"; // Prop 검증을 위해 추가


// 다음 클릭 모달달
const FinModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // useRouter 초기화
  return (
    <>
      <button
        aria-label="다음"
        className="w-auto h-auto flex items-center justify-center hover:text-gray-300 font-bold text-[#2300A1] text-xl"
        onClick={() => setIsModalOpen(true)}
      >
        다음
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
            <h2 className="text-3xl font-bold mb-4 flex justify-center gap-1 text-black">
            프로젝트 추가 완료
            </h2>

            <div className="space-y-3">
              {/* 설명 */}
                <div className="relative flex justify-center">
                    <img
                        src="Alert Triangle.png"
                        className="w-4 h-4 mr-2"
                    />
                    <p className="text-sm text-gray-600 text-center">
                        포트폴리오 완성 후에만 수정 가능합니다. <br/> 프로젝트 정리를 완료 하시겠습니까?
                    </p>
                </div>
            
              {/* 진행하기 */}
                <div className="grid grid-cols-2 items-center">
                    {/* 버튼1 */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(false)}
                        >
                            <img
                                src="backbut.png"
                                alt="아니오"
                                className="w-auto h-auto"
                            />
                        </button>
                    </div>
                    {/* 버튼2 */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setIsModalOpen(false)
                                router.push("#"); // 다음으로로
                            }}
                        >
                            <img
                                src="passbut.png"
                                alt="네"
                                className="w-auto h-auto"
                            />
                        </button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ImageSlider = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="relative w-full h-[500px]">
              <Image
                src={image}
                alt={`slide-${index}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full justify-center">
        {images.map((_, index) => (
          index === currentSlide ? (
            <FaCircle key={index} style={{ margin: "0 5px" }} />
          ) : (
            <FaRegCircle key={index} style={{ margin: "0 5px" }} />
          )
        ))}
      </div>
    </div>
  );
};

// Prop 검증 추가
ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const images =[
    "/example-image-1_3.png",
    "/example-image-1_2.png",
    "/example-image-1_4.png"
];

{/*main*/}
const Step4 = () => {
  // 도움말 모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative w-full h-auto bg-white overflow-hidden">
      {/* header */}
      <header className="bg-[#FFFFFF] text-white py-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* 로고 */}
          <div className="text-3xl font-bold text-[#2300A1]">POPO</div>

          {/* 네비게이션 메뉴 // Re?랑 +프로젝트 둘다 라우팅은 똑같은데 onclick으로 +프로젝트는 작성된 데이터 db에 저장하는걸로*/}
          <nav className="flex flex-row-3 gap-10">
            <a href="/" className="hover:text-gray-300 font-bold text-[#2300A1] text-xl">
              + 프로젝트
            </a>
            <FinModal onOpen={() => setIsModalOpen(true)} />
          </nav>
        </div>
      </header>

      {/* body */}
      <div className="pt-2">
        {/* 설명 */}
        <div className="flex items-center justify-between bg-white shadow px-10 pt-20 pb-5">
          {/* 왼쪽 섹션 */}
          <div>
            <h1 className="text-xl font-bold text-black">Step 4. 프로젝트 경험 추가</h1>
            <p className="text-sm text-gray-600">프로젝트 목록을 확인하세요</p>
          </div>
        </div>

        {/* 완성된 포트폴리오 이미지 슬라이드쇼 */}
        <div className="flex relative w-auto h-[600px] bg-[#F0F0F0] justify-center">
            <div className="mt-10">
                <ImageSlider images={images}/>
            </div>
        </div>
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