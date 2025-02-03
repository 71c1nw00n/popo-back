const API_BASE_URL = "http://localhost:8000"; // FastAPI 서버 주소!

export async function fetchData() {
    const response = await fetch(`${API_BASE_URL}/api/data`);
    const data = await response.json();
    return data;
}
