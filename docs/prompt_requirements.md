# Imagen 4: 일관된 캐릭터의 다양한 동작 생성을 위한 프롬프트 요구사항

이 문서는 제공된 3개의 가이드(`character_consistence.md`, `google_guide.md`, `image_prompting.md`)를 종합하여, Imagen 4에서 일관된 캐릭터가 다양한 동작을 수행하는 장면을 생성하기 위한 핵심 프롬프트 요구사항을 정리합니다.

## 1. 핵심 철학: '고정'과 '변수'의 분리

가장 중요한 원칙은 프롬프트 구조를 절대 변하지 않는 '고정' 부분과 장면에 따라 변하는 '변수' 부분으로 명확히 분리하는 것입니다.

-   고정 (캐릭터 DNA): 캐릭터의 외모, 의상, 액세서리 등 정체성에 대한 모든 정보입니다. 이는 일종의 '단일 진실 공급원(Single Source of Truth)'으로, 모든 프롬프트에서 일관되게 유지되어야 합니다.
-   변수 (장면 및 동작): 캐릭터가 수행하는 특정 행동, 감정, 배경, 카메라 워크 등 매번 새롭게 묘사될 부분입니다.

## 2. 프롬프트 구성 요구사항 (7가지 핵심 요소)

성공적인 프롬프트는 다음 7가지 구성 요소를 모두 포함하는 '일관된 미학 시스템'을 구축해야 합니다.

---

### [고정] 1. 캐릭터 DNA 정의

캐릭터의 정체성을 구성하는 상세한 텍스트 블록입니다.

| DNA 구성 요소 | 요구사항 | 예시 (영문 프롬프트 기준) |
| :--- | :--- | :--- |
| 핵심 정체성 | 이름, 나이, 역할, 성격을 구체적으로 명시합니다. | `A 25-year-old female explorer named 'Elara'` |
| 신체적 특징 | 얼굴형, 눈/헤어 색상 및 모양, 피부톤 등 외형을 상세히 묘사합니다. | `round face, large almond-shaped hazel eyes, short messy bob haircut of platinum blonde` |
| 대표 의상 | 주요 의상의 종류, 색상, 재질을 일관된 용어로 정의합니다. 'jacket'과 'coat'를 혼용하지 않습니다. | `wears a functional worn brown leather jacket over a grey t-shirt, dark cargo pants` |
| 핵심 액세서리 | 캐릭터를 구별하는 고유 아이템을 지정합니다. 일관성 유지에 매우 중요합니다. | `always wears a unique silver locket shaped like a compass` |

### [변수] 2. 장면 및 동작 연출

매번 변경될 장면의 구체적인 내용입니다.

| 장면 구성 요소 | 요구사항 | 예시 (영문 프롬프트 기준) |
| :--- | :--- | :--- |
| 주제/동작 | 캐릭터가 무엇을 하고 있는지, 어떤 감정 상태인지 명확하게 묘사합니다. | `She is inside a dimly lit ancient ruin, her eyes wide with surprise as she holds up a glowing artifact` |
| 장면/배경 | 주제가 놓인 환경, 장소, 시간적 맥락을 상세히 설정합니다. | `ancient stone ruin, overgrown with vines, at dusk` |
| 구도 | 영화 촬영 용어를 사용하여 샷 크기, 카메라 앵글, 프레이밍을 지정합니다. | `Medium Close-Up (MCU) shot, low-angle shot` |
| 조명 | 분위기를 결정하는 조명의 품질, 시간대, 광원을 명시합니다. | `dramatic volumetric lighting from the artifact, golden hour` |
| 기술 사양 | (선택) 렌즈, 카메라 종류, 효과를 지정하여 사실성을 극대화합니다. | `shot on 50mm lens, shallow depth of field, bokeh` |
| 스타일/분위기 | 이미지의 전체적인 미학(사진, 유화 등)과 감성적 톤을 정의합니다. | `hyper-realistic photographic style, somber, moody atmosphere` |

## 3. 언어 및 구문 요구사항

-   서술형 문장 사용: '그려줘' 같은 명령어 대신, 소설의 한 장면처럼 상세하고 서술적인 문장을 사용해야 합니다.
-   긍정적 묘사 원칙: Imagen 4는 네거티브 프롬프트를 공식적으로 지원하지 않습니다. 원치 않는 요소를 `no text`처럼 제외하는 대신, 원하는 상태를 `a clean wall`, `plain background`와 같이 긍정적으로 묘사해야 합니다.
-   용어의 절대적 일관성: 캐릭터 DNA에 정의된 모든 용어(예: `brown leather jacket`)는 모든 프롬프트에서 철저히 동일하게 유지되어야 합니다. 동의어 사용은 일관성을 해치는 주된 원인입니다.

## 4. 통합 워크플로우 및 프롬프트 예시

1.  '앵커(Anchor)' 이미지 생성:
    -   위의 모든 구성 요소와 언어 요구사항을 결합한 완벽한 마스터 프롬프트를 작성하여 캐릭터의 기준이 되는 첫 이미지를 생성합니다.

2.  동작 변경 이미지 생성:
    -   앵커 이미지 생성에 사용된 마스터 프롬프트에서 '캐릭터 DNA' 부분은 절대 수정하지 않습니다.
    -   오직 '장면 및 동작 연출'에 해당하는 부분만 새로운 상황에 맞게 수정하여 다음 이미지를 생성합니다.

### 통합 프롬프트 예시

```prompt
## Master Prompt for Elara

# [고정] Character DNA & Style Definition
A cinematic, photorealistic photo of a 25-year-old female explorer named 'Elara', with a round face, large almond-shaped hazel eyes, and a short messy bob haircut of platinum blonde. She wears a functional worn brown leather jacket over a grey t-shirt and dark cargo pants. She always wears a unique silver locket shaped like a compass.

# [변수] Scene, Action & Cinematic Direction
She is inside a dimly lit, ancient stone ruin, overgrown with vines. Her eyes are wide with surprise as she holds up a glowing artifact. The scene is illuminated by dramatic, low-key volumetric lighting coming from the artifact, creating long shadows, and a somber, moody atmosphere. This is a Medium Close-Up (MCU), low-angle shot, captured with a 50mm f/1.8 lens, creating a shallow depth of field. The overall color palette is cool and muted.
```

다음 장면 생성 시: 위 프롬프트에서 `# Scene, Action & Cinematic Direction` 부분의 내용만 (예: `She is now running through a dense jungle...`) 수정하여 사용합니다.

이러한 구조화된 요구사항을 따르면, 캐릭터의 정체성은 일관되게 유지하면서 다양한 스토리와 동작을 효과적으로 연출할 수 있습니다.
