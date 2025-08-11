# Imagen을 위한 일관된 캐릭터 액션 프롬프트 가이드

이 문서는 제공된 '15_캐릭터_동작_이미지_생성_연구.md' 문서를 기반으로, Google Imagen을 사용하여 일관된 캐릭터가 특정 동작을 수행하는 이미지를 생성하기 위한 핵심 프롬프팅 전략을 정리합니다.

## 핵심 원칙: 명시적이고 상세하며 구조화된 지시

Imagen, 특히 전문적인 워크플로우(Vertex AI, Flow)에서는 모호함을 최소화하고 AI에게 명확한 지시를 내리는 것이 가장 중요합니다. 성공적인 프롬프트는 '캐릭터의 정체성'과 '장면의 동작'이라는 두 가지 핵심 요소를 체계적으로 결합해야 합니다.

---

## 1. 캐릭터의 '디지털 DNA' 정의하기

모든 이미지 생성의 기준점이 될 캐릭터의 핵심 정체성을 고정된 텍스트 블록으로 만듭니다. 이는 매번 재사용되어 일관성을 보장하는 '단일 진실 공급원(Single Source of Truth)' 역할을 합니다.

### '캐릭터 DNA' 템플릿 구성 요소

| 카테고리 | 구성 요소 | 예시 (영문 프롬프트 기준) |
| :--- | :--- | :--- |
| 핵심 정체성 | 이름, 나이, 역할, 성격 | `A 25-year-old female explorer named 'Elara'` |
| 신체적 특징 | 얼굴형, 눈 색상/모양, 헤어스타일/색상, 피부톤 | `round face with soft cheeks, large almond-shaped hazel eyes, short messy bob haircut of platinum blonde color with dark roots, light freckles across her nose` |
| 대표 의상 | 주요 의상, 색상 팔레트, 재질 | `wears a functional yet worn brown leather jacket over a simple grey t-shirt, dark cargo pants, and sturdy hiking boots` |
| 핵심 액세서리 | 구별 가능한 아이템 (가장 중요) | `always wears a unique silver locket shaped like a compass` |
| 스타일 정의 | 아트 스타일, 조명, 전체적인 분위기 | `hyper-realistic photographic style, dramatic lighting, high detail, sharp focus` |

중요: 여기서 정의한 용어(예: `brown leather jacket`)는 모든 프롬프트에서 절대적으로 동일하게 유지해야 합니다. 'coat'나 'outerwear'와 같은 동의어 사용은 일관성을 해칩니다.

---

## 2. 장면 및 동작 연출하기: 감독처럼 생각하기

캐릭터 DNA가 준비되었다면, 이제 특정 장면과 동작을 지시할 차례입니다. 단순한 설명 대신 전문적인 영화 촬영 용어를 사용하여 장면을 정밀하게 제어합니다.

### 시네마틱 연출 용어 예시

| 제어 유형 | 용어 | 효과 및 사용 사례 |
| :--- | :--- | :--- |
| 카메라 샷 | `Medium Close-Up (MCU)`, `Cowboy Shot`, `Extreme Wide Shot (EWS)` | 표정 강조, 자세와 표정 동시 포착, 배경과 함께 규모 설정 |
| 카메라 앵글 | `Low Angle Shot`, `High Angle Shot`, `Dutch Angle` | 인물을 강력하게 표현, 취약하게 표현, 심리적 긴장감 조성 |
| 조명 | `Golden Hour`, `Volumetric Lighting`, `Chiaroscuro Lighting` | 낭만적 분위기, 신비로운 빛줄기 효과, 극적인 고대비 |
| 렌즈/카메라| `Shot on 85mm lens, f/1.8`, `Shallow depth of field`, `Cinematic widescreen 16:9` | 배경 흐림 효과, 특정 피사체 강조, 영화적 화면 비율 |

---

## 3. 통합 마스터 프롬프트 구조

이제 '캐릭터 DNA'와 '장면 연출'을 결합하여 최종 프롬프트를 만듭니다.

구조:
`[스타일 정의]` of `[캐릭터 DNA의 핵심 정체성, 신체, 의상, 액세서리]` who is `[구체적인 동작과 감정]`. `[장면/배경 설명]`. `[시네마틱 연출: 카메라 샷, 앵글, 조명, 렌즈]`.

### 완성된 프롬프트 예시

목표: *탐험가 '엘라라'가 고대 유적 안에서 무언가를 발견하고 놀라는 장면*

```prompt
## Master Prompt for Elara

# Style Definition
hyper-realistic photographic style, dramatic lighting, high detail, sharp focus

# Character DNA
A 25-year-old female explorer named 'Elara', with a round face, soft cheeks, large almond-shaped hazel eyes, and a short messy bob haircut of platinum blonde with dark roots. She has light freckles across her nose. She wears a functional yet worn brown leather jacket over a simple grey t-shirt, dark cargo pants, and sturdy hiking boots. She always wears a unique silver locket shaped like a compass.

# Scene & Action
She is inside a dimly lit, ancient stone ruin, overgrown with vines. Her eyes are wide with surprise as she holds up a glowing artifact she just discovered.

# Cinematic Direction
Medium Close-Up (MCU) shot, low angle to make her look heroic, volumetric lighting from the artifact casting long shadows, shot on 50mm lens with a shallow depth of field, cinematic widescreen 16:9.

# Negative Prompt
text, watermark, logo, ugly, deformed, blurry, extra fingers, mutated hands, plastic, 3d render, anime.
```

워크플로우:
1.  위와 같이 완전한 마스터 프롬프트로 첫 '앵커(Anchor)' 이미지를 생성합니다.
2.  다음 이미지를 생성할 때는 마스터 프롬프트를 거의 그대로 유지하고, `# Scene & Action` 부분만 수정하여 다른 동작을 지시합니다. (예: `She is now running through a dense jungle, looking back over her shoulder with a determined expression.`)

---

## 4. 고급 기술 및 팁

- 다중 캐릭터: 두 명 이상의 캐릭터를 등장시킬 때는 속성이 섞이는 'Attribute Bleed' 현상이 발생할 수 있습니다. 이 경우, 각 캐릭터 설명을 구분자(`|`)로 나누어 명확히 분리하는 구조를 시도해볼 수 있습니다.
    - 예시: `{Style, Background}` | `{Character 1 DNA + Action}` | `{Character 2 DNA + Action}`
- 스타일 튜닝 (Vertex AI): 일관된 미학을 위해 여러 참조 이미지로 맞춤형 '스타일 모델'을 훈련시켜 사용할 수 있습니다.
- 시드(Seed) 고정: 이미지 생성 시 동일한 '시드 번호'를 사용하면, 프롬프트를 약간만 변경했을 때 구도와 같은 기본 요소가 유사하게 유지되어 일관성 확보에 매우 유리합니다.

이러한 구조적이고 상세한 접근법을 통해 Imagen의 강력한 사실주의 표현 능력을 최대한 활용하여, 일관된 캐릭터가 살아 움직이는 듯한 장면들을 연출할 수 있습니다.
