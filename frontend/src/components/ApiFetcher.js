import { useEffect, useState } from "react";

const ApiFetcher = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/data") // FastAPI 엔드포인트
            .then((response) => response.json())
            .then((result) => setData(result.data))
            .catch((error) => console.error("API 요청 실패:", error));
    }, []);

    return (
        <div className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-bold">FastAPI 응답</h2>
            {data ? <p className="text-gray-700">{data}</p> : <p>데이터 로딩 중...</p>}
        </div>
    );
};

export default ApiFetcher;

