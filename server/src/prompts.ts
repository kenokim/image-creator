import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface PromptParams {
  characterDna: string;
  scene: string;
  action: string;
}

export const buildImagen4Prompt = ({ characterDna, scene, action }: PromptParams): string => {
  const dna = (characterDna ?? "").trim();
  const sc = (scene ?? "").trim();
  const ac = (action ?? "").trim();

  const prose = `
${dna}
위 캐릭터 프롬프트는 캐릭터에 대한 프롬프트입니다. 이 캐릭터가 어떤 장면에서 어떤 동작을 하는지 연출하는 imagen 4 를 위한 프롬프트를 작성해 주세요. 반드시 위와 동일한 캐릭터가 장면에 나와 동작해야 합니다.

장면: ${sc}
동작: ${ac}

다음 프롬프트 작성 지침을 참고하세요.:

| 장면 구성 요소 | 요구사항 | 예시 (영문 프롬프트 기준) |
| :--- | :--- | :--- |
| 주제/동작 | 캐릭터가 무엇을 하고 있는지, 어떤 감정 상태인지 명확하게 묘사합니다. | She is inside a dimly lit ancient ruin, her eyes wide with surprise as she holds up a glowing artifact |
| 장면/배경 | 주제가 놓인 환경, 장소, 시간적 맥락을 상세히 설정합니다. | ancient stone ruin, overgrown with vines, at dusk |
| 구도 | 영화 촬영 용어를 사용하여 샷 크기, 카메라 앵글, 프레이밍을 지정합니다. | Medium Close-Up (MCU) shot, low-angle shot |
| 조명 | 분위기를 결정하는 조명의 품질, 시간대, 광원을 명시합니다. | dramatic volumetric lighting from the artifact, golden hour |
| 기술 사양 | (선택) 렌즈, 카메라 종류, 효과를 지정하여 사실성을 극대화합니다. | shot on 50mm lens, shallow depth of field, bokeh |
| 스타일/분위기 | 이미지의 전체적인 미학(사진, 유화 등)과 감성적 톤을 정의합니다. | hyper-realistic photographic style, somber, moody atmosphere |

다음 프롬프트 평가 지침을 참고하세요.:

'장면 및 동작 연출' 프롬프트는 캐릭터의 'DNA'를 기반으로, 특정 상황 속에서 어떻게 행동하고 존재하는지를 묘사합니다. 이 프롬프트의 품질은 이미지의 생동감과 서사적 깊이를 결정합니다.

### 평가 체크리스트

| 평가 항목 | 기준 | 점검 사항 |
| :--- | :--- | :--- |
| 1. 서사적 구체성 (Narrative Specificity) | 장면이 한 편의 이야기처럼 생생하게 묘사되었는가? | - 주제/동작: 캐릭터가 무엇을, 어떻게 하고 있는지, 그리고 어떤 감정 상태인지 명확하게 묘사되었는가? (예: '걷는다' vs '지친 듯 터덜터덜 걷는다')<br>- 장면/배경: 장소, 시간대, 날씨 등 환경적 맥락이 구체적으로 설정되었는가? |
| 2. 시네마틱 연출 (Cinematic Direction) | 전문적인 시각 언어를 사용하여 장면을 제어하는가? | - 구도: 샷 크기(Close-up, Full shot 등), 카메라 앵글(Low-angle, High-angle 등)이 명시되었는가?<br>- 조명: 조명의 품질, 광원, 시간대(Golden hour, Volumetric lighting 등)가 분위기에 맞게 정의되었는가?<br>- 기술 사양 (선택 사항): 렌즈 종류(50mm, wide-angle), 카메라 효과(Bokeh, long exposure) 등이 사실감을 더하기 위해 사용되었는가? |
| 3. 미학적 일관성 (Aesthetic Coherence) | 모든 요소가 하나의 통일된 비전을 향하는가? | - 스타일(예: Film Noir)이 조명(예: Low-key), 배경(예: 비 오는 도시), 색상(예: 흑백)과 논리적으로 연결되는가?<br>- 프롬프트 내에 '사실적이면서 추상적인'과 같이 서로 모순되는 지시가 없는가? |
| 4. 긍정적 묘사 (Positive Phrasing) | 원하는 것을 명확하게 묘사하는가? (Imagen 4 특화) | - '텍스트 없음'과 같은 부정적 지시 대신, '깨끗한 벽', '장식 없는 배경'처럼 원하는 상태를 긍정적으로 묘사했는가? |

### 품질 평가 예시

*   나쁜 예: She is standing in a forest. (구체성, 연출, 미학적 깊이 부족)
*   좋은 예: She is inside a dimly lit, ancient stone ruin, overgrown with vines. Her eyes are wide with surprise as she holds up a glowing artifact. This is a Medium Close-Up (MCU), low-angle shot, illuminated by dramatic, low-key volumetric lighting coming from the artifact, creating long shadows. (구체적인 행동, 감정, 배경 및 전문적인 시네마틱 연출 포함)`;

  return prose.trim();
};

type AnchorRecord = { id: string; ['character-dna']: string; image: string };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const anchorsFile = path.join(__dirname, '..', 'data', 'anchors.json');

const loadAnchors = (): AnchorRecord[] => {
  try {
    const raw = fs.readFileSync(anchorsFile, 'utf-8');
    return JSON.parse(raw) as AnchorRecord[];
  } catch {
    return [];
  }
};

export const buildPromptFromAnchor = (params: { anchorId: string; scene: string; action: string }): string => {
  const list = loadAnchors();
  const rec = list.find((a) => a.id === params.anchorId);
  const dna = rec ? rec['character-dna'] : '';
  return buildImagen4Prompt({ characterDna: dna, scene: params.scene, action: params.action });
};

export default buildImagen4Prompt;