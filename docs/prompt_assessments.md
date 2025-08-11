# 프롬프트 품질 평가 가이드라인

이 문서는 `docs/prompt_requirements.md`에 정의된 프롬프트 구조를 기반으로, 각 구성 요소의 품질을 평가하기 위한 지침을 제공합니다. 평가는 '캐릭터 DNA'의 일관성과 '장면 및 동작 연출'의 표현력이라는 두 가지 핵심 축을 중심으로 이루어집니다.

---

## 1. 캐릭터 DNA 프롬프트 평가 지침

'캐릭터 DNA'는 일관성의 핵심입니다. 이 프롬프트는 캐릭터의 정체성을 정의하는 '단일 진실 공급원(Single Source of Truth)' 역할을 해야 합니다.

### 평가 체크리스트

| 평가 항목 | 기준 | 점검 사항 |
| :--- | :--- | :--- |
| 1. 구체성 (Specificity) | 캐릭터의 핵심 특징이 명확하고 구체적인가? | - 핵심 정체성: 이름, 나이, 역할, 성격이 명시되었는가?<br>- 신체적 특징: 얼굴형, 눈/헤어 색상 및 모양, 피부톤 등 고유 식별이 가능한 특징이 상세히 묘사되었는가?<br>- 대표 의상: 의상의 종류, 색상, 재질, 상태(예: 낡은, 깨끗한)가 구체적으로 정의되었는가?<br>- 핵심 액세서리: 캐릭터를 구별하는 고유 아이템이 명확하게 지정되었는가? |
| 2. 용어의 일관성 (Consistency) | 모든 프롬프트에서 동일한 용어를 사용하는가? | - 캐릭터의 특징(의상, 액세서리 등)을 묘사할 때 동의어(예: jacket vs coat)를 피하고, 항상 동일한 단어를 사용하는가? |
| 3. 모호성 배제 (Unambiguity) | 추상적이거나 해석의 여지가 있는 표현을 피했는가? | - '아름다운', '멋진'과 같은 추상적인 단어 대신, '대칭적인 얼굴', '날카로운 턱선' 등 구체적이고 시각적인 묘사를 사용했는가? |
| 4. 구조화 (Structure) | 정보가 논리적으로 잘 구성되어 있는가? | - 키워드 나열이 아닌, 완전하고 서술적인 문장으로 캐릭터를 묘사하는가?<br>- 캐릭터의 각 특징이 명확하게 구분되어 AI가 관계를 쉽게 파악할 수 있는 구조인가? |

### 품질 평가 예시

*   나쁜 예: `A beautiful woman in a coat.` (추상적이고, 구체성 및 일관성 부족)
*   좋은 예: `A 25-year-old female explorer named 'Elara', with a round face and large almond-shaped hazel eyes. She wears a functional, worn brown leather jacket and always has a unique silver locket shaped like a compass.` (구체적이고, 고유하며, 일관성을 유지하기 좋은 구조)

---

## 2. 장면 및 동작 연출 프롬프트 평가 지침

'장면 및 동작 연출' 프롬프트는 캐릭터의 'DNA'를 기반으로, 특정 상황 속에서 어떻게 행동하고 존재하는지를 묘사합니다. 이 프롬프트의 품질은 이미지의 생동감과 서사적 깊이를 결정합니다.

### 평가 체크리스트

| 평가 항목 | 기준 | 점검 사항 |
| :--- | :--- | :--- |
| 1. 서사적 구체성 (Narrative Specificity) | 장면이 한 편의 이야기처럼 생생하게 묘사되었는가? | - 주제/동작: 캐릭터가 무엇을, 어떻게 하고 있는지, 그리고 어떤 감정 상태인지 명확하게 묘사되었는가? (예: '걷는다' vs '지친 듯 터덜터덜 걷는다')<br>- 장면/배경: 장소, 시간대, 날씨 등 환경적 맥락이 구체적으로 설정되었는가? |
| 2. 시네마틱 연출 (Cinematic Direction) | 전문적인 시각 언어를 사용하여 장면을 제어하는가? | - 구도: 샷 크기(Close-up, Full shot 등), 카메라 앵글(Low-angle, High-angle 등)이 명시되었는가?<br>- 조명: 조명의 품질, 광원, 시간대(Golden hour, Volumetric lighting 등)가 분위기에 맞게 정의되었는가?<br>- 기술 사양 (선택 사항): 렌즈 종류(50mm, wide-angle), 카메라 효과(Bokeh, long exposure) 등이 사실감을 더하기 위해 사용되었는가? |
| 3. 미학적 일관성 (Aesthetic Coherence) | 모든 요소가 하나의 통일된 비전을 향하는가? | - 스타일(예: Film Noir)이 조명(예: Low-key), 배경(예: 비 오는 도시), 색상(예: 흑백)과 논리적으로 연결되는가?<br>- 프롬프트 내에 '사실적이면서 추상적인'과 같이 서로 모순되는 지시가 없는가? |
| 4. 긍정적 묘사 (Positive Phrasing) | 원하는 것을 명확하게 묘사하는가? (Imagen 4 특화) | - '텍스트 없음'과 같은 부정적 지시 대신, '깨끗한 벽', '장식 없는 배경'처럼 원하는 상태를 긍정적으로 묘사했는가? |

### 품질 평가 예시

*   나쁜 예: `She is standing in a forest.` (구체성, 연출, 미학적 깊이 부족)
*   좋은 예: `She is inside a dimly lit, ancient stone ruin, overgrown with vines. Her eyes are wide with surprise as she holds up a glowing artifact. This is a Medium Close-Up (MCU), low-angle shot, illuminated by dramatic, low-key volumetric lighting coming from the artifact, creating long shadows.` (구체적인 행동, 감정, 배경 및 전문적인 시네마틱 연출 포함)
