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

## 2. Karta „Expression lines" (mimika, botoks) — twarz

```
[STYLE BLOCK]

SUBJECT: Head-and-shoulders portrait of a beautiful young Latina woman in her
mid-20s, sun-tanned skin, long dark brunette hair, warm brown eyes. Three-quarter
view, her face turned slightly to the camera-left, chin a touch lifted, looking
straight into the lens with a calm, self-assured, closed-lip expression. The whole
face is in the frame and in focus. Hair loose, swept back off the forehead so the
brow and the area around the eyes read clearly. Bare shoulders, thin cream strap.

FORMAT: 3:4 vertical portrait, 900x1200.
```

## 3. Karta „Volume & contour" (usta, wolumetria) — zbliżenie na usta

```
[STYLE BLOCK]

SUBJECT: Extreme close-up of the mouth of a beautiful young Latina woman in her
mid-20s, sun-tanned skin. The frame is cropped tightly from just under the nose to
the bottom of the chin, with the corners of the mouth well inside the frame — the
eyes are not visible at all. Lips closed and completely relaxed, full and naturally
shaped, natural lip colour with a soft matte finish, no gloss, no lipstick, no
liner. The cupid's bow, the lip line and the philtrum are the sharpest details in
the picture. The key light rakes in from the upper left so the upper lip casts a
faint shadow and the lower lip catches a soft highlight. Skin around the mouth is
real — fine texture, a little down, no airbrushing.

FORMAT: 3:4 vertical portrait, 900x1200.
```

## 4. Karta „Skin quality" (jakość skóry) — ramię i dłoń

```
[STYLE BLOCK]

SUBJECT: A beautiful young Latina woman in her mid-20s, sun-tanned skin, long dark
brunette hair, wearing a simple cream ribbed tank top. She is seated, turned
slightly away, and the frame holds her shoulder, her upper arm and her forearm —
her face is cropped out above the chin or only softly visible at the very top edge.
One hand rests on the opposite forearm and glides slowly along it, fingers relaxed
and flat, the gesture of someone noticing how smooth their own skin is. The arm and
the hand are the sharpest part of the frame. The key light from the upper left runs
down the length of the arm so the skin reads as even, healthy and lit from within —
fine texture and downy hair visible, absolutely no airbrushing. Short natural nails,
no nail polish, no rings, no bracelets, no watch.

FORMAT: 3:4 vertical portrait, 900x1200.
```

## 5. Karta „Body & hair" (ciało i włosy) — od tyłu

```
[STYLE BLOCK]

SUBJECT: A beautiful young Latina woman in her mid-20s, sun-tanned skin, photographed
from behind, framed from the top of her head down to her waist. She wears a fitted
cream-coloured top with a low, clean back and thin straps — clothed, tasteful,
nothing revealing, an editorial beauty photograph and not a lingerie one. Her very
long dark brunette hair falls in loose, healthy waves down her back; one hand is
lifted and runs through it, gathering a section of hair and letting it slide through
her fingers. Head turned a little to the side so only the line of the cheek and jaw
is visible, face away from the camera. The warm rim light from the right runs along
the hair and along the line of the shoulder and upper back, making the hair look
dense and glossy. Calm, elegant, restrained.

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
| `assets/img/area-lines.svg` | prompt 2 (twarz) |
| `assets/img/area-contour.svg` | prompt 3 (usta) |
| `assets/img/area-skin.svg` | prompt 4 (ramię) |
| `assets/img/area-body.svg` | prompt 5 (od tyłu) |
| `assets/img/portrait-physician.svg` | prompt 6 |

Przyślij mi pliki, a ja je przekonwertuję do WebP + JPEG (jak hero: 2 MB PNG → 64 KB),
podepnę pod `<picture>` i przebuduję podgląd.
