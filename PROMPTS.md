# Prompty do zdjęć — Snow Clinics

Wszystkie zdjęcia na stronie mają wyglądać jak jedna sesja u jednego fotografa.
Dlatego każdy prompt poniżej zaczyna się od **tego samego bloku stylu** (STYLE BLOCK),
skopiowanego z hero, które już jest na stronie. Nie zmieniaj go — zmieniaj tylko
część „SUBJECT".

Blok stylu trzyma razem: to samo tło (głęboki stalowy błękit), to samo światło
(jeden duży softbox z góry-lewej + ciepły rim z prawej), ten sam obiektyw
(85 mm, płytka głębia), tę samą skórę (naturalna, nieretuszowana, widoczna tekstura).

---

## STYLE BLOCK (wkleja się na początku każdego promptu)

```
Editorial photograph for a high-end aesthetic medicine clinic. Seamless deep
slate-blue studio backdrop (#2E6B85 falling off to #15303F in the corners),
softly vignetted, no props, no text, no logos. Lighting: one large softbox
high on the camera-left at 45 degrees as the key, a warm subtle rim light from
the right edge separating hair and shoulder from the background, gentle fill,
no harsh shadows. Shot on a full-frame camera with an 85mm lens at f/2.0,
shallow depth of field, background completely clean and out of focus.
Colour grade: cool blue backdrop against warm golden skin tones, calm and
restrained, low contrast in the midtones, slightly lifted blacks, film-like.
Skin is real and unretouched — visible pores, fine texture, a few freckles,
natural sheen, no plastic smoothing, no beauty filter, no makeup-heavy look.
Photorealistic, not illustration, not 3D render, not AI-glossy.
```

---

## 1. Hero (już zrobione — dla referencji)

```
[STYLE BLOCK]

SUBJECT: A beautiful young Latina woman, mid-20s, sun-tanned skin, long dark
brunette hair falling in loose natural waves, warm brown eyes, thin cream-coloured
strap top. She is turned three-quarters away from the camera and looks back over
her bare shoulder directly into the lens with a calm, self-assured half-smile.
Framed on the right third of the image, large empty backdrop on the left for text.

FORMAT: 3:2 horizontal, 1536x1024.
```

---

## 2. Karta „Expression lines" (mimika, botoks)

```
[STYLE BLOCK]

SUBJECT: Close-up of the same kind of woman — young, tanned, dark brunette hair,
brown eyes. Head and shoulders, face turned slightly to the camera-left, chin
lifted a few degrees, eyes calm and open, lips relaxed and closed, a soft neutral
expression with no forced smile. The upper third of the face — forehead, brow and
the area around the eyes — is the sharpest part of the frame and catches the key
light cleanly. Hair pulled loosely back from the face so the brow is fully visible.
Bare shoulders, no clothing detail in frame.

FORMAT: 3:4 vertical portrait, 900x1200.
```

## 3. Karta „Volume & contour" (usta, wolumetria, lifting)

```
[STYLE BLOCK]

SUBJECT: Close-up profile-to-three-quarter view of the same kind of woman — young,
tanned, dark brunette hair, brown eyes. The camera sits slightly below eye level so
the jawline, cheekbone and the line from chin to ear read as the strongest shapes in
the frame. Lips closed and relaxed, natural lip colour, no gloss, no lipstick.
The key light rakes across the cheekbone and leaves a soft shadow under it.
Hair swept behind the ear on the camera side. Bare shoulders.

FORMAT: 3:4 vertical portrait, 900x1200.
```

## 4. Karta „Skin quality" (jakość skóry, mezoterapia, boostery)

```
[STYLE BLOCK]

SUBJECT: Very tight close-up of the same kind of woman — young, tanned, dark
brunette hair. The frame holds the cheek, the side of the nose and one eye, cropped
at the top of the brow and at the corner of the mouth. Eyes looking softly off-frame.
The point of the picture is the skin itself: fine pores, downy vellus hair catching
the rim light, a scattering of freckles across the cheekbone, a healthy natural
sheen on the high points, absolutely no airbrushing. Extremely sharp on the cheek,
everything else falling away.

FORMAT: 3:4 vertical portrait, 900x1200.
```

## 5. Karta „Body & hair" (ciało i włosy)

```
[STYLE BLOCK]

SUBJECT: The same kind of woman — young, tanned, dark brunette hair — photographed
from behind and slightly to the side, cropped from the top of the head to just below
the shoulder blades. Her back is bare apart from a thin cream strap, her long dark
hair falls in loose waves down her back with the warm rim light running along it and
along the line of the shoulder. Head turned a little away from the camera, face not
visible or only a sliver of the cheek. Elegant, restrained, never suggestive.

FORMAT: 3:4 vertical portrait, 900x1200.
```

---

## 6. Dr. Snow — portret z fartuchem

**Jak tego użyć:** wrzuć do ChatGPT 3–5 swoich zdjęć z Instagrama (najlepiej:
jedno na wprost, jedno pod kątem, wszystkie w dobrym świetle, twarz wyraźna),
a potem wklej ten prompt.

```
The attached photographs are all of the same person. Keep her identity exactly:
her face shape, her features, her eye colour, her hair colour and length, her skin
tone and her real skin texture. Do not beautify her, do not slim or reshape her face,
do not change her age. Generate a new studio photograph of her.

[STYLE BLOCK]

SUBJECT: She is a doctor of aesthetic medicine, photographed for her own clinic.
She stands in a crisp white medical coat worn open over a simple black top, sleeves
at full length, collar clean and flat. Three-quarter body crop, from the top of the
head to just below the waist, her body angled slightly away from the camera while
she looks straight into the lens. Hands relaxed and out of frame or one hand loosely
in the coat pocket. Her expression is warm, composed and professional — a faint
closed-lip smile, the look of somebody who is good at her job and has nothing to
prove. Minimal jewellery, no stethoscope, no clipboard, no clinic equipment, nothing
in her hands.

FORMAT: 4:5 vertical portrait, 1200x1500.
```

**Jeśli ChatGPT nie trzyma podobieństwa:** dopisz na końcu
`Match the attached reference photographs of her face as closely as possible — this
is a portrait of a specific real person, not a generic model.` i wygeneruj ponownie.

---

## Gdzie to wrzucić po wygenerowaniu

| Plik | Co zastąpić |
| --- | --- |
| `assets/img/area-lines.svg` | prompt 2 |
| `assets/img/area-contour.svg` | prompt 3 |
| `assets/img/area-skin.svg` | prompt 4 |
| `assets/img/area-body.svg` | prompt 5 |
| `assets/img/portrait-physician.svg` | prompt 6 |

Przyślij mi pliki, a ja je przekonwertuję do WebP + JPEG (jak hero: 2 MB PNG → 64 KB),
podepnę pod `<picture>` i przebuduję podgląd.
