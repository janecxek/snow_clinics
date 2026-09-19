# Prompty do wygenerowania zdjęć

Każdy prompt jest samodzielny — kopiujesz jeden blok, wklejasz do ChatGPT,
dostajesz obraz. Nie trzeba niczego dopisywać ani łączyć promptów.

**Jak używać**
1. Skopiuj blok pod nazwą pliku.
2. Wklej do ChatGPT (tryb generowania obrazów).
3. Pobierz wynik, nazwij dokładnie tak jak w nagłówku i wrzuć do `assets/img/`.
4. Proporcje są w promptach, ale model bywa nieprecyzyjny — po pobraniu przytnij
   do podanych wymiarów i zapisz jako WebP (wtedy w `index.html` zmień rozszerzenie).

**Zanim zaczniesz — dwie rzeczy**

Zdjęcia projektów (`work-1` … `work-4`) będą podpisane na stronie jako
zrealizowane obiekty Eleny z metrażem, miastem i rokiem. Wygenerowane wnętrze
nie jest jej realizacją. Traktuj je jako **tymczasową zaślepkę do czasu
prawdziwych zdjęć** — przy 312 postach na Instagramie materiał raczej jest.
Jeśli mają zostać na dłużej, usuń ze strony metryki (tip, metraż, rok) i zmień
podpis sekcji, żeby nie obiecywała realizacji.

`elena.jpg` to portret realnej osoby. Nie generuj jej od zera — pracuj na
prawdziwym zdjęciu z Instagrama (prompty w sekcji `elena.jpg`). Jest tam też
wariant bez postaci, gdyby dobrego zdjęcia nie było.

---

## `hero.jpg` — pierwszy ekran (16:9, 2400 × 1350)

```
A photorealistic architectural interior photograph of a serene contemporary living space at dusk. Warm minimalism: microcement plaster walls in a soft greige tone, a tall arched niche built into the wall, white oak herringbone floor, a low boucle sofa in cream, a slim brushed-brass floor lamp casting a warm pool of light, a travertine coffee table. Large window on the left with sheer linen curtains, the last cool daylight outside contrasting against warm interior lamplight. Deep chocolate-brown wood veneer on a built-in unit to the right. Palette limited to beige, taupe, cream, warm brown and antique brass. Shot on a 28mm lens at eye level, perfectly straight vertical lines, wide composition with generous empty space on the left third for text overlay. Editorial interior magazine quality, soft natural contrast, no harsh shadows. No people, no text, no logos, no watermark. 16:9 aspect ratio.
```

## `elena.jpg` — portret autorki (3:4, 1200 × 1600)

**Pracujesz na prawdziwym zdjęciu Eleny z Instagrama — nie generujesz postaci.**
Wgrywasz zdjęcie do ChatGPT i dopisujesz prompt poniżej.

Co wybrać: kadr pionowy albo kwadratowy, do pasa, twarz dobrze oświetlona,
bez mocnego filtra i bez innych osób w kadrze. Im ostrzejszy oryginał,
tym mniej model kombinuje.

### Prompt uniwersalny — wklej razem ze zdjęciami

Jeden blok, radzi sobie z dowolnym kadrem. Wgrywasz 1–5 zdjęć i wklejasz to:

```
I'm attaching photos of a real person — Elena, an interior designer. I need one portrait for the "about the author" section of her studio website.

If I attached several photos, pick the one with the sharpest and best-lit face, work from that one only, and tell me which one you chose and why.

Absolute rule: keep her face, hair, body shape and clothing exactly as they are. Do not smooth skin, slim the face, enlarge eyes, change the nose or jawline, remove lines, or "beautify" anything. She must be immediately recognisable as the same person to someone who knows her. Treat the face as a locked region.

Everything else you may change:

1. Framing — output a vertical 3:4 portrait, cropped roughly at the waist, with her placed slightly off-centre and clear empty space above her head. If the source is horizontal or full-body, extend the background naturally to gain height rather than stretching her.

2. Background — replace whatever is behind her with a calm interior wall in soft greige microcement plaster, gently out of focus. You may add a subtle hint of a tall arched niche, or the edge of a white oak surface, at the very edge of the frame. Nothing busy, no furniture clutter, no plants, no visible room detail competing with her.

3. Light — soft warm daylight coming from one side, gentle falloff across the wall, no harsh shadow cutting across her face, no on-camera flash look, no rim light or glow effects.

4. Colour — grade to a warm neutral palette: beige, taupe, cream, warm brown. Natural, warm skin tones. Remove any blue, green or magenta cast. Soft natural contrast, no heavy filter, no HDR.

Keep the result fully photographic and realistic — it must look like a photograph taken in a real room, not a render or an illustration. No text, no logos, no watermark, no border. Final output: vertical 3:4.
```

### Prompt główny — zdjęcie ma dobry kadr, ale tło i kolory nie pasują

```
Here is a photo of a real person — an interior designer. Keep her face, hair, body and clothing exactly as they are. Do not smooth, slim, beautify, restyle or alter her features in any way. She must remain clearly and recognisably the same person.

Edit only the surroundings and the light:
- Recompose to a vertical 3:4 portrait, waist-up, with her slightly off-centre and clear empty space above her head.
- Replace the background with a calm interior wall in soft greige microcement plaster, gently out of focus, with a hint of a tall arched niche or a white oak surface at the edge of the frame.
- Relight to match: soft warm daylight from one side, gentle falloff, no harsh shadow across the face, no on-camera flash look.
- Grade the colours to a warm neutral palette — beige, taupe, cream, warm brown — with natural skin tones. Remove any blue, green or magenta colour cast.
- Keep it fully photographic and realistic. No illustration, no airbrushing, no glow or bloom effects.

No text, no logos, no watermark. 3:4 vertical aspect ratio.
```

### Wariant A — zdjęcie jest poziome albo całą sylwetką

Dopisz zamiast pierwszego punktu:

```
The source photo is wider than it needs to be. Recompose it into a vertical 3:4 portrait cropped at the waist, extending the background naturally where the frame needs more height. Do not stretch or distort the person — extend the surroundings only.
```

### Wariant B — tło już jest dobre, chodzi tylko o spójność kolorów

```
Here is a photo of a real person. Do not change her face, hair, clothing or the background content in any way — no retouching of features. Only crop to a vertical 3:4 portrait, waist-up with space above the head, and colour-grade the image to a warm neutral palette: beige, taupe, cream and warm brown, natural skin tones, no blue or green cast, soft natural contrast. Keep it photographic. No text, no logos, no watermark.
```

### Wariant C — bez postaci, na czas do sesji zdjęciowej

Jeśli nie ma dobrego zdjęcia, ten kadr wypełnia miejsce i nie udaje portretu:

```
A photorealistic vertical interior photograph of an interior designer's studio corner, no people visible. A light oak desk against a greige microcement wall, an open roll of architectural drawings and a few material samples laid out — travertine, brushed brass, oak veneer, a folded boucle fabric swatch. A brass desk lamp switched on, casting warm light across the drawings. A tall window just out of frame on the left provides soft daylight. A single arched mirror on the wall behind. Calm, warm minimalism, palette of beige, taupe, cream and antique brass. Shot on a 35mm lens, straight verticals, shallow depth of field with the drawings sharp. Editorial magazine quality. No people, no faces, no text, no logos, no watermark. 3:4 vertical aspect ratio.
```

### Zanim to zaakceptujesz

Porównaj wynik z oryginałem obok siebie. Modele obrabiające zdjęcia
regularnie podmieniają rysy twarzy — zwężają nos, zmieniają kształt oczu,
wygładzają skórę do plastiku. Jeśli to już nie wygląda na tę samą osobę,
nie używaj: albo powtórz z dopiskiem `do not modify the face at all, treat
the face as a locked region`, albo zostaw oryginalne zdjęcie i zrób samo
kadrowanie i korektę kolorów w zwykłym edytorze. To jej wizerunek na jej
własnej stronie — lepszy nieidealny prawdziwy kadr niż ładny cudzy.

## `work-1.jpg` — Светлая квартира для семьи (4:3, 1800 × 1350)

```
A photorealistic interior photograph of a bright open-plan family living room in a contemporary apartment. Warm minimalism: greige microcement walls, white oak herringbone flooring, a large cream boucle sofa with linen cushions, a round travertine coffee table, a slim brushed-brass arc floor lamp. Floor-to-ceiling window with sheer linen curtains letting in soft diffused daylight from the left. A built-in walnut veneer media unit along the right wall, closed and seamless. A large neutral abstract artwork in a thin brass frame. Palette strictly beige, cream, taupe, warm walnut and antique brass. Shot on a 24mm lens at chest height, one-point perspective, perfectly straight vertical lines. Bright, airy, calm, editorial interior magazine quality. No people, no text, no logos, no watermark. 4:3 aspect ratio.
```

## `work-2.jpg` — Кухня-гостиная с островом (4:3, 1800 × 1350)

```
A photorealistic interior photograph of a contemporary kitchen-living room with a large island. Handleless matte cabinetry in warm greige, full-height cabinet run in deep walnut veneer reaching the ceiling, a travertine-look island countertop with a waterfall edge. Two slim brushed-brass pendant lamps hang above the island, switched on and glowing warm. Two upholstered boucle bar stools in cream. Integrated appliances hidden behind cabinet fronts. White oak floor. A window on the right with soft daylight. Palette beige, cream, walnut brown and antique brass, no bright colours. Shot on a 28mm lens at chest height, straight verticals, balanced symmetrical composition centred on the island. Editorial interior magazine quality, warm and calm. No people, no text, no logos, no watermark. 4:3 aspect ratio.
```

## `work-3.jpg` — Спальня с мягкими панелями (4:3, 1800 × 1350)

```
A photorealistic interior photograph of a calm contemporary bedroom in the evening. A wide upholstered headboard wall in cream boucle, divided into soft vertical panels, running the full width behind the bed. Linen bedding in warm off-white and sand tones. Two walnut veneer nightstands with rounded edges, each with a brushed-brass wall sconce switched on, casting warm pools of light on the panelling. White oak floor with a thick wool rug in oatmeal. Heavy linen curtains in taupe at the right edge, drawn. Palette limited to cream, sand, taupe, walnut and antique brass. Shot on a 28mm lens at chest height, one-point perspective, straight verticals. Intimate warm evening lighting, editorial interior magazine quality. No people, no text, no logos, no watermark. 4:3 aspect ratio.
```

## `work-4.jpg` — Ванная с аркой (4:3, 1800 × 1350)

```
A photorealistic interior photograph of a compact luxurious bathroom. A tall arched niche carved into a travertine-clad wall, with an arched frameless mirror set inside it and a brushed-brass wall light above. A freestanding oval bathtub in matte cream stands in front. Brushed-brass tap and fittings, unlacquered warm gold finish. Floor in large-format travertine-effect porcelain tiles. A folded linen towel in oatmeal on a slim brass rail. Soft daylight from a window out of frame on the left, plus warm light from the sconce. Palette strictly travertine beige, cream, warm stone and antique brass. Shot on a 28mm lens, straight verticals, centred composition on the arch. Serene spa-like mood, editorial interior magazine quality. No people, no text, no logos, no watermark. 4:3 aspect ratio.
```

## `plan.jpg` — sekcja „Proces" (4:3, 1600 × 1200)

```
A photorealistic overhead photograph of an architectural floor plan of an apartment, printed on matte paper and lying on a light oak desk. The plan is a clean black-line technical drawing: walls, doors with swing arcs, furniture outlines, dimension lines and small annotations, drawn in thin precise lines on white paper — no readable text, the annotations are abstract marks. Beside the plan: a mechanical pencil, a metal scale ruler, and two small material samples — a travertine chip and a piece of oak veneer. Soft warm daylight falls diagonally from the upper left, casting a gentle shadow of the ruler across the paper. Palette warm neutral: white paper, light oak, graphite, beige stone. Shot straight down from above, 50mm lens, sharp focus across the plan. Editorial quality, calm and precise. No people, no readable text, no logos, no watermark. 4:3 aspect ratio.
```

## `light.jpg` — sekcja „Свет" (16:9, 2400 × 1350)

> Tu efekt kursora odsłania rozświetlony pokój z ciemności, więc kadr
> potrzebuje **wyraźnego, ciepłego źródła światła** i ciemniejszych partii
> dookoła. Im większy kontrast, tym mocniej działa.

```
A photorealistic interior photograph of a contemporary bedroom at night, lit only by warm artificial light. A single brushed-brass wall sconce and a bedside lamp cast a strong warm pool of light onto a cream boucle upholstered headboard wall, while the corners of the room fall into deep warm shadow. Linen bedding in off-white catches the light. Walnut veneer nightstand, white oak floor, a heavy taupe curtain in darkness at the edge of frame. Strong chiaroscuro: bright warm centre, dark unlit surroundings, no daylight at all. Palette warm amber light against deep brown and charcoal shadow. Shot on a 28mm lens at chest height, straight verticals, wide cinematic composition. Moody, intimate, editorial interior magazine quality, photorealistic. No people, no text, no logos, no watermark. 16:9 aspect ratio.
```

---

## Jeśli model nie trafia w styl

Dopisz na końcu dowolnego promptu:

```
Reference style: quiet luxury interior design, warm minimalism, Belarusian and Scandinavian influence. Materials: microcement plaster, white oak, walnut veneer, travertine, unlacquered brushed brass, cream boucle, natural linen. Strictly neutral palette — no blue, no grey-cold tones, no black furniture, no glossy surfaces, no marble veining. Natural proportions of a real apartment, not a showroom.
```

## Czego pilnować przy wyborze wyniku

* pionowe linie proste — krzywe ściany zdradzają generator od razu;
* jedno spójne źródło światła, bez dwóch cieni w różne strony;
* brak tekstu i napisów na ścianach, książkach, obrazach;
* dłonie i twarze — jeśli model doda osobę, generuj ponownie;
* meble w realnej skali: kanapa nie może być szersza od okna.
