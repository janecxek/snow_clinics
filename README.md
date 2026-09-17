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

## Do podmiany przed publikacją

| Co | Gdzie |
|---|---|
| **Zdjęcie do hero** — pełnoekranowe, brand-kolorowe tło za modelką | `assets/img/hero-portrait.svg` |
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
