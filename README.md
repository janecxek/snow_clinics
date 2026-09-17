# Snow Clinics — strona internetowa

Statyczny one-pager dla Snow Clinics (medycyna estetyczna, Zürich · Konstanz · Paris · Marbella).
Bez frameworka i bez build stepu.

```bash
python3 -m http.server 8000    # http://localhost:8000
python3 build-preview.py       # → jeden plik HTML do wysyłki
```

---

## Psychologia: co MUSI być na tym landing page'u

Zabieg estetyczny to zakup wysokiego ryzyka emocjonalnego — obcy człowiek wstrzykuje coś
w twarz. Zaufanie nie jest dodatkiem, jest całym mechanizmem konwersji. Stąd taka kolejność:

| # | Sekcja | Pytanie w głowie odwiedzającej | Mechanizm |
|---|---|---|---|
| 1 | **Hero** | „Czy to dla mnie?" | Obietnica w pięciu słowach + CTA w zasięgu wzroku |
| 2 | **Pasek faktów** | „Kto mnie dotknie i czym?" | Autorytet natychmiast po obietnicy, zanim pojawi się wątpliwość |
| 3 | **Zabiegi** | „Czy macie to, czego potrzebuję?" | Prawo Hicka — 4 obszary zamiast 9 kart |
| 4 | **Dlaczego my** | „Czym się różnicie?" | Cztery decyzje, które klinika musi podjąć — i zwykle podejmuje inaczej |
| 5 | **Dr. Snow** | „Komu ufam?" | Autorytet z twarzą i kwalifikacjami |
| 6 | **Kliniki** | „Gdzie i kiedy?" | Dostępność + naturalna rzadkość (Paryż i Marbella mają ograniczone dni) |
| 7 | **Pas dowodu** | „Czy to działa u innych?" | Trzy zobowiązania + opinie z konkretami |
| 8 | **FAQ** | „A co jeśli…?" | Obsługa obiekcji w pierwszej osobie |
| 9 | **Booking** | „Co teraz?" | Trzy kanały, zero tarcia |

**Czego celowo NIE ma:**

- **Formularza kontaktowego.** Formularz to obietnica bez terminu — wysyłasz w pustkę
  i czekasz. WhatsApp to rozmowa, którą widać. Mniejszy próg, szybsza odpowiedź.
- **Przed/po.** Zdjęcia przed/po to język taniej kliniki. Marka obiecuje, że *nikt nie
  zauważy* — pokazywanie transformacji przeczy samemu pozycjonowaniu.
- **Procesu 01–04.** Pacjentka nie potrzebuje diagramu ścieżki, potrzebuje pewności, że
  przy pierwszym terminie nic się nie stanie. To jedno zdanie, nie sekcja.

**CTA jest wszędzie:** navbar, hero, każdy otwarty obszar zabiegów, sekcja Dr. Snow,
stopka, pasek mobilny. Siedem punktów wejścia, wszystkie prowadzą w to samo miejsce.

---

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

## Zabiegi — pionowe słupki, które otwierają się w bok

Cztery pionowe prostokąty. Zamknięty słupek to grzbiet z nazwą biegnącą w górę.
Kliknięcie oddaje mu szerokość, którą oddają pozostałe — w CSS to animowana zmiana
`grid-template-columns`, nie przeskok.

| | Obszar | Zabiegi |
|---|---|---|
| 01 | Expression lines / Mimikfalten | 2 |
| 02 | Volume & contour / Volumen & Kontur | 2 |
| 03 | Skin quality / Hautqualität | 3 |
| 04 | Body & hair / Körper & Haar | 2 |

Każdy otwarty obszar pokazuje: jedno zdanie opisu, chipy **„to brzmi jak ja"** (dawna
sekcja obaw, złożona tutaj), zabiegi z czasem i trwałością, oraz CTA do WhatsAppa.

Poniżej 1000 px słupki układają się w pionie i otwierają w dół. Sterowanie strzałkami,
`aria-expanded`, a bez JS wszystkie cztery obszary są w treści.

---

## Reszta

**Scroll:** kółko myszy wygładzane lerpem; skok do sekcji to osobny, timowany ruch —
380–720 ms zależnie od dystansu, `easeInOutCubic`. Wcześniej kotwice dziedziczyły lerp
i przelatywały przez stronę.

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
| **Zdjęcie do hero** — brand-kolorowe tło za modelką; slot 4:3 czeka | `assets/img/hero-portrait.svg` |
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
