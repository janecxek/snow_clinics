# Snow Clinics — strona internetowa

Statyczny one-pager dla Snow Clinics (medycyna estetyczna, Zürich · Konstanz · Paris · Marbella).
Bez frameworka i bez build stepu.

```bash
python3 -m http.server 8000    # http://localhost:8000
python3 build-preview.py       # → jeden plik HTML do wysyłki
```

---

## Psychologia: co jest na tym landing page'u

Zabieg estetyczny to zakup wysokiego ryzyka emocjonalnego. Zaufanie nie jest dodatkiem,
jest całym mechanizmem konwersji. Stąd taka kolejność:

| # | Sekcja | Pytanie w głowie odwiedzającej |
|---|---|---|
| 1 | **Hero** | „Czy to dla mnie?" — obietnica i booking w jednym ekranie |
| 2 | **Zabiegi** | „Czy macie to, czego potrzebuję?" — 4 kafle zamiast listy |
| 3 | **Dlaczego my** | „Czym się różnicie?" — cztery decyzje, które klinika musi podjąć |
| 4 | **Dr. Snow** | „Komu ufam?" |
| 5 | **Kliniki** | „Gdzie i kiedy?" + naturalna rzadkość dni w Paryżu i Marbelli |
| 6 | **Opinie** | „Czy to działa u innych?" |
| 7 | **FAQ** | „A co jeśli…?" — obiekcje w pierwszej osobie |
| 8 | **Booking** | „Co teraz?" — trzy kanały, zero tarcia |

**Czego celowo NIE ma:** formularza kontaktowego (obietnica bez terminu — WhatsApp to
rozmowa, którą widać), przed/po (marka obiecuje, że *nikt nie zauważy* — pokazywanie
transformacji przeczy pozycjonowaniu), procesu 01–04 (to jedno zdanie, nie sekcja),
paska faktów i kart zobowiązań (powtarzały to, co i tak mówi sekcja „dlaczego my").

**Booking jest wszędzie:** navbar, hero, każdy otwarty obszar zabiegów, sekcja Dr. Snow,
stopka, pasek mobilny. Wszystkie otwierają **ten sam popup** z trzema kanałami —
i podają mu temat, więc wiadomość na WhatsAppie jest już napisana. Przy wyłączonym JS
te same linki prowadzą do sekcji bookingu, która ma te same trzy kanały.

## Kierunek wizualny

| Rola | Token | Hex |
|---|---|---|
| Tekst, sekcje ciemne | `--ink` | `#0E1922` |
| Błękit marki (z logo) | `--frost` | `#A9C5D6` |
| Kolor akcji — przyciski, pas dowodu | `--brand` | `#2E6B85` |
| Tło | `--porcelain` | `#F4F6F7` |
| Ciepły kontrapunkt (sekcja „Dlaczego my") | `--sand` | `#E6DCD2` |

**Typografia: Plus Jakarta Sans + Playfair Display (kursywa).** Jeden grotesk na wszystko,
co się czyta — geometryczny, przyjazny i czytelny w każdym rozmiarze. Playfair kursywą
pojawia się **wyłącznie jako słowo-akcent w nagłówku** („Still your face. *Only rested.*") —
to urządzenie z pierwszej referencji. Poprzedni Instrument Serif był efektowny i męczący.

Geometria: promienie `12 / 20 / 28 px` plus pigułka. Przyciski to pigułki z okrągłym
badge'em — strzałka przy najechaniu wylatuje z kadru, druga wjeżdża na jej miejsce.

---

## Czego użyliśmy z referencji

| Wzorzec | Skąd | Gdzie u nas |
|---|---|---|
| Navbar: logo z lewej, pływająca pigułka na środku, CTA z prawej | Dentel | `.nav` |
| Hero w kwadrantach: zdjęcie góra-lewo, wielki nagłówek dół, tekst i CTA prawy-dół | Oralux | `.hero__grid` |
| Szeryfowa kursywa jako słowo-akcent w bezszeryfowym nagłówku | Dentel | `.display em` |
| Numerowane karty „dlaczego zostają" | Oralux | `.reasons` |
| Jeden nasycony pas koloru jako emocjonalny szczyt | Oralux | `.section--brand` |
| FAQ w grupach, pytania w pierwszej osobie | Oralux | `.segments` + `.faq` |
| Pigułkowe przyciski z okrągłym badge'em | obie | `.btn` |
| Stopka: hasło + CTA, 4 kolumny, wyblakły wordmark | Oralux | `.footer` |

---

## Zabiegi — cztery kafle, które otwierają się w bok

W spoczynku cztery równe kafle, każdy z własnym zdjęciem i nazwą obszaru. Kliknięcie
oddaje jednemu szerokość, którą oddają pozostałe — animowana zmiana
`grid-template-columns`, nie przeskok. Zamknięte spadają do słupka z nazwą biegnącą
w górę, ale **zachowują swoje zdjęcie**, więc rząd nadal czyta się jako zestaw.
Drugie kliknięcie zamyka i rząd znów jest równy.

| | Obszar | Zabiegi |
|---|---|---|
| 01 | Expression lines / Mimikfalten | 2 |
| 02 | Volume & contour / Volumen & Kontur | 2 |
| 03 | Skin quality / Hautqualität | 3 |
| 04 | Body & hair / Körper & Haar | 2 |

Każdy otwarty obszar: zdanie opisu, chipy **„to brzmi jak ja"**, zabiegi z czasem
i trwałością, oraz CTA otwierające popup z tematem tego obszaru.

Poniżej 1000 px kafle układają się w pionie i otwierają w dół.

## Reszta

**Hero:** jedno zdjęcie na całość, obietnica napisana w poprzek dołu, booking po prawej.
Navbar nad zdjęciem przechodzi w biały wariant i wraca do ciemnego po zejściu z hero.

**Scroll:** kółko myszy wygładzane lerpem; skok do sekcji to osobny, timowany ruch —
380–720 ms zależnie od dystansu, `easeInOutCubic`.

**Booking:** natywny `<dialog>` — pułapka focusu, Escape i backdrop działają bez
dopisywania niczego. Trzy kanały: WhatsApp, DM na Instagramie, telefon.

**FAQ:** dziewięć pytań w trzech grupach, **żadne nie jest otwarte na wejściu**.
Zmiana grupy zamyka wszystko.

**Dwujęzyczność EN/DE:** angielski w HTML (działa bez JS i dla crawlerów), niemiecki ze
słownika. 185 kluczy, komplet.

**SEO:** meta + OG + Twitter Card, canonical, hreflang, `sitemap.xml`, `robots.txt`,
manifest, JSON-LD (`Organization` + `Physician` + 4 × `MedicalClinic` + `FAQPage`
generowany z treści strony), jeden `<h1>`, poprawna hierarchia.

**Dostępność:** skip link, widoczny focus, `aria-expanded` / `aria-selected`, strzałki
w słupkach i w grupach FAQ, `prefers-reduced-motion`, cele dotykowe ≥ 44 px,
**0 błędów kontrastu**, 0 poziomego scrolla przy 390 / 768 / 1440 px.

---

## Brief na zdjęcie do hero

Zdjęcie idzie na całą szerokość, a nagłówek ląduje na **dolnej połowie po lewej** —
ta część kadru musi zostać pusta i ciemna. Proporcje 3:2 poziomo.

```
Editorial beauty photograph for a premium aesthetic medicine clinic website hero.
Full-frame camera, 85mm lens, f/2.0.

SUBJECT: a beautiful young Latina woman, late twenties, sun-kissed tanned olive
skin, long dark brown hair worn loose with a natural wave, warm brown eyes
looking straight into the lens, defined cheekbones, full natural lips, relaxed
confident expression with the hint of a smile. Head and shoulders, body turned
slightly away, face toward camera. Bare shoulders or a simple ivory silk strap.
Minimal makeup: groomed brows, soft bronze tone, glossy neutral lip, no heavy
contour, no false lashes.

BACKGROUND: seamless studio backdrop in desaturated glacial blue-teal, gradient
from #4E8299 in the upper left to #15303F in the lower right. No props, no text,
no logos, no furniture.

LIGHT: one large softbox high on the left, a subtle warm rim light on the right
edge of her hair and shoulder to separate her from the backdrop. Soft falloff,
gentle shadow under the cheekbone. Cool daylight balance against warm skin.

FRAMING: she sits in the UPPER RIGHT THIRD of a 3:2 horizontal frame. The entire
bottom half and the left side stay clean, dark and empty — headline text goes
there. Generous negative space. Do not centre her.

MOOD: quiet, expensive, clinical. Restrained editorial, not a glamour or
fashion shoot.

SKIN: natural retouching only. Keep real pores, fine texture and the faint
lines around the eyes. No beauty filter, no plastic smoothing, no airbrushing,
no HDR, no vignette, no bokeh balls, no lens flare. Photorealistic.

3:2 aspect ratio, high resolution.
```

**Kadr jest wymaganiem technicznym, nie estetycznym.** Nagłówek siedzi na dolnej
połowie po lewej, a lead i przyciski na dolnej prawej — czyli dokładnie tam, gdzie
przy portrecie wypada ramię modelki. Ściemnienie hero startuje od 55% wysokości
w dół i omija twarz, która mieści się w górnej połowie kadru. Jeśli kolejny wariant
będzie miał modelkę niżej, trzeba przesunąć `object-position` w `.hero__media img`.

**Gdyby wyszła zbyt wygładzona** (ChatGPT ma taką tendencję), dopisz na końcu:
*„Shot on Kodak Portra 400, visible film grain, unretouched skin."*

**Gdyby ustawił ją centralnie**, powtórz sam warunek kadru jako pierwsze zdanie
promptu — modele traktują początek jako ważniejszy.

## Do podmiany przed publikacją

| Co | Gdzie |
|---|---|
| **Zdjęcie do hero** — pełnoekranowe, 3:2 | podmień `assets/img/hero-portrait.svg` na `.jpg` i zmień `src` + `width`/`height` w `index.html` |
| **Cztery zdjęcia kafli zabiegów** — proporcje 3:4 | `assets/img/area-*.svg` |
| **Portret Dr. Snow** — slot 4:5 | `assets/img/portrait-physician.svg` |
| **Domena** — wszędzie `https://snow-clinics.com` | `index.html`, `sitemap.xml`, `robots.txt` |
| **Opinie pacjentek** — treści przykładowe, wymagają realnych za zgodą osób | `#proof`, klucze `q*` |
| **Numer WhatsApp** — wpisany `+34 637 479 715` | linki `wa.me/` w całym pliku |
| **Handle Instagrama** do DM — `ig.me/m/snow_clinics` | linki w `#book` i stopce |
| **Czasy trwania i trwałość efektów** przy zabiegach | klucze `p.*.t` |
| **Godziny konsultacji** | stopka, klucze `footer.h*` |
| **Impressum / Polityka prywatności / Regulamin** — linki prowadzą do `#` | stopka |

> Strona opisuje zabiegi medyczne. Czasy, trwałość efektów i kwalifikacje muszą być
> zatwierdzone przez Dr. Snow przed publikacją.

---

## Struktura

```
index.html              wszystkie sekcje + JSON-LD
assets/css/main.css     tokeny → reset → typografia → layout → komponenty
assets/js/main.js       scroll, reveal, nawigacja, słupki, karuzela, FAQ
assets/js/i18n.js       słownik niemiecki + przełącznik języka
assets/img/             hero, portret, favicon, znak graficzny, OG
build-preview.py        sklejka do jednego pliku HTML
robots.txt  sitemap.xml  site.webmanifest
```
