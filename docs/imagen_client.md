import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

// 이미지 생성 함수 예시
async function generateImagen4Image() {
  // API 클라이언트 생성 (API 키 필요)
  const ai = new GoogleGenAI({
    apiKey: "YOUR_GOOGLE_API_KEY" // 실제 API 키로 대체
  });
  
  // 프롬프트 및 매개변수 정의
  const prompt = "예시: 붉은 스케이트보드를 들고 있는 로봇"; // 원하는 프롬프트로 수정
  const response = await ai.models.generateImages({
    model: "imagen-4.0-generate-preview-06-06",
    prompt,
    config: {
      numberOfImages: 1, // 생성할 이미지 수(1~4)
      aspectRatio: "1:1" // 옵션: "1:1", "4:3", 등
    },
  });

  // 결과 저장
  let idx = 1;
  for (const generatedImage of response.generatedImages) {
    const imgBytes = generatedImage.image.imageBytes;
    const buffer = Buffer.from(imgBytes, "base64");
    fs.writeFileSync(`imagen4-${idx}.png`, buffer);
    idx++;
  }
}

generateImagen4Image();
