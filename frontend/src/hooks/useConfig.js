import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/config";  // config에서 API_BASE_URL 가져오기

const useConfig = () => {
    const [apiBaseUrl, setApiBaseUrl] = useState(API_BASE_URL); // apiBaseUrl 상태 관리
    const [config, setConfig] = useState({});

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/config`);
                const data = await response.json();
                setConfig(data);  // 가져온 설정 데이터를 상태로 설정
            } catch (error) {
                console.error("환경 변수 가져오기 실패:", error);
            }
        };

        if (apiBaseUrl) { // apiBaseUrl이 있을 경우에만 fetch 실행
            fetchConfig();
        }
    }, [apiBaseUrl]);  // apiBaseUrl이 변경될 때마다 실행

    return { config, apiBaseUrl };
};

export default useConfig;
