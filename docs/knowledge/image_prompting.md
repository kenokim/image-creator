# Imagen 4 고품질 이미지 생성을 위한 프롬프트 구조 가이드

이 문서는 Google의 Imagen 4 모델을 사용하여 최상의 이미지를 생성하기 위한 효과적인 프롬프트 구조를 설명합니다. 이 내용은 제공된 두 연구 문서의 핵심 원칙을 통합하여 구성되었습니다.

## Imagen 4 프롬프팅의 핵심 철학

Imagen 4는 프롬프트 해석을 위해 Gemini 모델을 사용하므로, 단순한 키워드 나열보다 상세하고 서술적인 문장에 훨씬 더 잘 반응합니다. AI가 훈련된 방식(상세한 캡션)을 모방하여, 마치 '장면을 묘사하는 감독'처럼 프롬프트를 작성하는 것이 중요합니다.

## 마스터 프롬프트의 7가지 핵심 구성 요소

고품질 이미지를 생성하는 프롬프트는 다음과 같은 7가지 핵심 요소를 논리적으로 결합한 '일관된 미학 시스템'을 구축해야 합니다.

---

### 1. 스타일 (Style) / 매체 (Medium)
- 목적: 이미지의 전체적인 미학적 방향과 형태를 결정합니다. 프롬프트의 가장 처음에 위치하여 AI에게 명확한 방향을 제시하는 것이 좋습니다.
- 예시 키워드:
    - 사실주의: `A photograph of`, `A movie still of`, `photorealistic`, `hyperrealistic`, `8K`, `HDR`
    - 예술적 매체: `oil painting`, `watercolor`, `charcoal drawing`, `3D render`, `illustration`
    - 예술 사조: `impressionism`, `surrealism`, `cyberpunk`, `art nouveau`
    - 영화적 미학: `cinematic`, `film noir`, `shot on 35mm film`, `polaroid`

### 2. 주제 (Subject)
- 목적: 이미지의 핵심 초점, 즉 주인공을 명확하게 정의합니다. 일반적인 명사 대신 생생한 형용사로 구체화하고, 행동과 상태를 함께 묘사합니다.
- 예시:
    - 단순: `a knight`
    - 고급: `A weary female knight in intricately engraved gothic plate armor, holding a heavy sword` (지치고 정교하게 조각된 고딕 갑옷을 입은 여성 기사가 무거운 검을 들고 있다)

### 3. 장면 (Scene) / 문맥 (Context)
- 목적: 주제가 놓인 환경, 배경, 시간적 맥락을 설정하여 이미지에 서사와 깊이를 부여합니다.
- 예시:
    - `standing in a misty, rain-slicked castle courtyard at dusk` (해질녘 안개 끼고 비에 젖은 성 안뜰에 서 있다)
    - `in a bustling futuristic city street at night, with holographic advertisements everywhere` (홀로그램 광고로 가득한, 밤의 번화한 미래 도시 거리에 있다)

### 4. 구도 (Composition)
- 목적: 프레임 내 요소의 배치와 시점을 제어하여 '어떻게' 보여줄지 결정합니다. 영화 및 사진 용어가 매우 효과적입니다.
- 예시 키워드:
    - 샷 크기: `close-up`, `medium shot`, `full body shot`, `wide shot`, `panoramic landscape`
    - 카메라 앵글: `low-angle shot`, `high-angle shot`, `eye-level`, `top-down shot`, `aerial view`
    - 프레이밍: `rule of thirds`, `symmetrical composition`, `centered subject`

### 5. 조명 (Lighting)
- 목적: 이미지의 분위기와 감정을 연출하고 입체감을 부여하는 가장 중요한 요소입니다.
- 예시 키워드:
    - 품질: `dramatic lighting`, `soft light`, `rim lighting`, `volumetric lighting` (빛줄기 효과), `chiaroscuro` (극단적 명암 대비)
    - 시간대: `golden hour`, `blue hour`, `dusk`, `midday sun`, `night`
    - 인공 광원: `neon lighting`, `candlelight`, `spotlight`

### 6. 기술적 사양 (Technical Specifications)
- 목적: 특히 사진과 같은 사실적인 이미지를 원할 때, 특정 카메라와 렌즈를 지정하여 해당 장비 고유의 질감과 색감, 왜곡을 재현합니다.
- 예시 키워드:
    - 렌즈: `shot on 85mm lens`, `35mm`, `wide-angle lens`, `macro lens`
    - 카메라: `shot on a Sony A7R IV`, `Canon EOS 5D Mark IV`
    - 효과: `f/1.8`, `shallow depth of field`, `bokeh` (배경 흐림)

### 7. 분위기 (Mood) & 색상 (Color)
- 목적: 이미지가 전달하고자 하는 최종적인 감성적 톤을 조절합니다.
- 예시 키워드:
    - 분위기: `moody`, `somber`, `serene`, `nostalgic`, `eerie`, `vibrant`
    - 색상 팔레트: `warm color palette`, `cool tones`, `pastel colors`, `monochromatic`, `black and white`

---

## 통합 프롬프트 구조 및 예시

이 모든 요소를 결합하여 하나의 서술적인 문단으로 만드는 것이 가장 효과적입니다. 각 요소는 서로를 논리적으로 뒷받침해야 합니다.

### 프롬프트 템플릿

```
[1. 스타일] of a [2. 매우 상세한 주제와 행동] in/on a [3. 매우 상세한 장면]. [5. 조명] and a [7. 분위기] atmosphere. [4. 카메라 샷/앵글] shot on a [6. 렌즈/카메라], creating a [6. 특정 효과]. The color palette is [7. 색상].
```

### 적용 예시 (Before & After)

#### Before: 단순 프롬프트
> a knight

#### After: 고급 프롬프트 (7가지 요소 결합)
> A cinematic, photorealistic photo of a weary female knight in intricately engraved gothic plate armor, resting her hands on her greatsword. She is standing in a misty, rain-slicked castle courtyard at dusk. The scene is illuminated by dramatic, low-key volumetric lighting coming from a single torch, creating long shadows, and a somber, moody atmosphere. This is a full body, low-angle shot, captured with a Sony A7R IV and an 85mm f/1.4 lens, creating a shallow depth of field with beautiful bokeh. The overall color palette consists of cool, muted tones with a single warm highlight from the torch.

이 고급 프롬프트는 모호함을 제거하고, AI에게 명확하고 일관된 비전을 제시하여 훨씬 더 높은 품질의 결과물을 이끌어냅니다.

## Imagen 4를 위한 특별 고려사항

- 긍정적 묘사에 집중: Imagen 4는 공식적으로 네거티브 프롬프트(`--no` 등)를 지원하지 않습니다. 원치 않는 요소를 빼려고 하기보다, 원하는 요소들만으로 장면을 구성하여 긍정적인 언어로 상세히 묘사하는 것이 중요합니다. (예: `no people` 대신 `an empty forest trail`)
- 프롬프트 향상 기능: Vertex AI의 '프롬프트 향상' 기능은 단순한 프롬프트를 자동으로 상세하게 만들어주지만, 정밀한 제어를 원하는 전문가에게는 방해가 될 수 있습니다. 의도와 다른 결과가 나온다면 이 기능을 비활성화하고 테스트해보는 것이 좋습니다.

부정형(지원 안 됨)
긍정형(추천)
no text, no logo
clean wall, empty background, plain surface
no captions, no letters
solid color background, smooth wall without markings
no signs
unmarked street, buildings with plain facades
