# Snow Clinics — strona internetowa

Statyczny one-pager dla Snow Clinics (medycyna estetyczna, Zürich · Konstanz · Paris · Marbella).
Bez frameworka i bez build stepu — otwierasz `index.html` i działa.

```bash
python3 -m http.server 8000    # http://localhost:8000
```

Do wysłania komuś — jeden plik z wbudowanym CSS, JS i grafikami, otwierany dwuklikiem:

```bash
python3 build-preview.py       # → snow-clinics-preview.html
```

---

## Kierunek wizualny

Język projektu wywodzi się z monogramu marki: pudrowy błękit koła na białym tle.

| Rola | Token | Hex |
|---|---|---|
| Tekst, sekcje ciemne | `--ink` | `#0E1922` |
| Błękit marki (z logo) | `--frost` | `#A9C5D6` |
| **Kolor akcji — przyciski, pas marki** | `--brand` | `#2E6B85` |
| Tło | `--porcelain` | `#F3F5F6` |
| Ciepły kontrapunkt (sekcja „Dr. Snow") | `--sand` | `#E3D9CF` |

`--brand` to nasycone rodzeństwo błękitu z logo — na tyle mocne, żeby unieść przyciski
i jeden pełnoekranowy pas koloru, a wciąż z tej samej rodziny.

**Typografia: Instrument Serif + Instrument Sans.** Jedna nadrodzina, twardy podział:
szeryf niesie nagłówki sekcji, liczby i sygnaturę; grotesk wszystko, co się czyta.
Tekst podstawowy 17–18 px, waga 400.

**Geometria.** Promień zaokrągleń w jednej skali: `12 / 20 / 28 px` plus pigułka `999 px`.
Przyciski to pigułki z okrągłym badge'em — strzałka przy najechaniu wylatuje z kadru,
a druga wjeżdża na jej miejsce.

**Sygnatura — „frost reveal":** każdy blok wchodzi z rozmycia do ostrości. Jedyny język
animacji na stronie.

### Co wzięliśmy z dwóch stron referencyjnych

Dwa szablony klinik dentystycznych (Dentel, Oralux) — wyrenderowane w przeglądarce
i rozebrane na sekcje, tokeny i wzorce interakcji. Zaadaptowane, nie skopiowane:

| Wzorzec | Skąd | Jak u nas |
|---|---|---|
| Pigułkowe przyciski z okrągłym badge'em | obie | `.btn` + `.btn__badge` |
| Duże, miękkie zaokrąglenia kart | obie | skala `--r-sm/md/lg` |
| Jeden nasycony pas koloru jako emocjonalny szczyt | Oralux | `.section--brand`: zobowiązania + opinie |
| Wiersz zabiegu: nazwa, opis, **chipy z tym, co obejmuje** | Oralux | `.protocol` + `.chips` |
| FAQ w grupach, pytania **w pierwszej osobie** | Oralux | `.segments` + 9 pytań w 3 grupach |
| Karty liczb z ikoną na pasie koloru | Oralux | `.pledges` |
| Numerowane karty problemów pacjenta | Dentel | `.concerns` — 6 kafli, każdy otwiera pasujący obszar |
| Stopka: hasło + CTA, 4 kolumny, wyblakły wordmark | Oralux | `.footer` |
| Etykieta sekcji jako kropka + tekst | Oralux | `.eyebrow` |

Czego nie wzięliśmy: gradientowych wypełnień przycisków, wymyślonych liczników
procentowych i gęstości 99 zdjęć na stronę.

## Co jest zrobione

**Sekcje:** hero · pasek faktów · podejście · **obawy** · zabiegi w czterech
kategoriach · przed/po · proces 01–04 · Dr. Snow · 4 kliniki · **pas marki: zobowiązania
+ opinie** · FAQ w grupach · formularz · stopka.

### Ścieżka decyzji

Sekcje idą w kolejności, w jakiej podejmuje się tę decyzję, nie w kolejności oferty:

1. **Obietnica** (hero) → 2. **Kto i czym** (pasek faktów) → 3. **Dlaczego inaczej**
(podejście) → 4. **To brzmi jak ja** (obawy) → 5. **Co na to pomaga** (zabiegi)
→ 6. **Czy to działa** (przed/po) → 7. **Jak to wygląda** (proces) → 8. **Kto to robi**
(Dr. Snow) → 9. **Gdzie** (kliniki) → 10. **Dowód** (pas marki) → 11. **Wątpliwości**
(FAQ) → 12. **Krok** (formularz).

### Obawy → zabiegi

Sześć kafli nazywa problem słowami pacjentki („Linie, które zostają, gdy mimika odchodzi").
Kliknięcie otwiera pasujący obszar zabiegów i tam przewija — pytanie i odpowiedź są
połączone za czytelnika, zamiast zostawiać go z listą nazw handlowych.

### Zabiegi — kategorie zamiast listy

| | Kategoria | Zabiegi |
|---|---|---|
| 01 | Mimikfalten / Expression lines | 2 |
| 02 | Volumen & Kontur / Volume & contour | 2 |
| 03 | Hautqualität / Skin quality | 3 |
| 04 | Körper & Haar / Body & hair | 2 |

Kwadratowe kafle, jeden otwarty naraz, panel **morfuje do wysokości** nowej zawartości.
Każdy wiersz zabiegu ma nazwę, opis, trzy dane (termin / czas rekonwalescencji / trwałość)
i **chipy z tym, co obejmuje** — np. Botulinumtoxin: Stirn · Zornesfalte · Krähenfüsse ·
Brauenlift. `role="tablist"`, strzałki przewijają, focus podąża. Bez JS wszystkie
dziewięć zabiegów i wszystkie dziewięć pytań FAQ jest w treści.

**Interakcje:** smooth scroll (lerp na natywnym scrollu, tylko kółko myszy) · suwak przed/po
(mysz, dotyk, strzałki) · karuzela opinii bez autoplay · FAQ w trzech grupach · walidacja
formularza · navbar chowający się przy schodzeniu · pasek akcji na mobile.

### Psychologia — co i dlaczego

| Mechanizm | Gdzie |
|---|---|
| **Prawo Hicka** | 4 kategorie zamiast 9 kart; 3 pytania FAQ naraz zamiast 9 |
| **Samoidentyfikacja** | obawy nazwane słowami pacjentki, nie nazwami zabiegów |
| **Autorytet** | pasek faktów pod hero: kto wykonuje, jakie produkty, co w cenie |
| **Odwrócenie ryzyka** | trzy zobowiązania na pasie marki: 4 kliniki / 2 tygodnie kontroli / 48 h na odwołanie |
| **Dowód społeczny przy CTA** | opinia obok formularza + karty opinii z tabelką (zabieg, standort, od kiedy) |
| **Efekt Pratfalla** | „odradzimy połowę tego, po co przyszłaś" |
| **Obsługa obiekcji** | FAQ w pierwszej osobie: „Nie chcę wyglądać na zrobioną", „Dlaczego nie podacie ceny przez telefon" |
| **Heurystyka dostępności** | 45 minut, 2 tygodnie, 48 godzin, 3–4 miesiące |
| **Naturalna rzadkość** | ograniczone dni kliniczne w Paryżu i Marbelli — i tak jest naprawdę |
| **Mała pierwsza prośba** | „umów konsultację", nie „umów zabieg" |
| **Peak-end** | stopka zamyka zdaniem o drugich opiniach i powracających pacjentkach |

**Dwujęzyczność EN/DE:** angielski w HTML (działa bez JS i dla crawlerów), niemiecki ze
słownika. **284 klucze, komplet przetłumaczony.** Przełączenie języka odpala zdarzenie,
na które panel kategorii przelicza wysokość.

**SEO:** meta + OG + Twitter Card, canonical, hreflang en/de/x-default, `sitemap.xml`,
`robots.txt`, manifest, JSON-LD (`Organization` + `Physician` + 4 × `MedicalClinic`
+ `FAQPage` z 9 pytaniami, generowany z treści strony), jeden `<h1>`, poprawna hierarchia.

**Dostępność:** skip link, widoczny focus, `aria-selected` / `aria-expanded` / `aria-live`,
strzałki w obu tablistach, `prefers-reduced-motion`, cele dotykowe ≥ 44 px,
**0 błędów kontrastu** (audyt liczy też półprzezroczyste tła), 0 poziomego scrolla
przy 390 / 768 / 1440 px.

## Do podmiany przed publikacją

Rzeczy, których nie dało się ustalić z profilu IG — **wszystkie wymagają potwierdzenia od kliniki:**

| Co | Gdzie |
|---|---|
| **Zdjęcia** — zostały trzy miejsca: hero, portret, przed/po | `assets/img/*.svg` → podmiana na `<img src="…jpg">`, proporcje zostają |
| **Domena** — wszędzie `https://snow-clinics.com` | `index.html` (canonical, OG, JSON-LD), `sitemap.xml`, `robots.txt` |
| **Opinie pacjentek** — treści przykładowe | `index.html` sekcja `#reviews` + `q1–q4` w `i18n.js`. Wymagają realnych opinii za zgodą osób |
| **„Since 2016"** i rok założenia | `hero.eyebrow` |
| **Adresy klinik** — są tylko miasta, bez ulic | `#locations` + `PostalAddress` w JSON-LD |
| **Czasy trwania, downtime i trwałość efektów** | wiersze w `#treatments` |
| **Podział zabiegów między kategorie** oraz czy lista jest kompletna | `#treatments` |
| **Chipy „Behandelt"** przy każdym zabiegu — obszary, które obejmuje | `#treatments`, klucze `p.*.c*` |
| **Godziny konsultacji** w stopce | `#footer`, klucze `footer.h*` |
| **Zabiegi w tabelce opinii** (Skinbooster, Botulinumtoxin…) | `#reviews`, klucze `q*.m1` |
| **Języki konsultacji** (wpisane: EN/DE/ES/PL) | `physician.c1`, `faq.a5` |
| **E-mail kontaktowy** — obecnie tylko telefon i Instagram | `#contact` |
| **Backend formularza** — teraz tylko walidacja i ekran potwierdzenia | `assets/js/main.js`, sekcja 9 |
| **Impressum / Polityka prywatności / Regulamin** — linki prowadzą do `#` | stopka |

> Strona opisuje zabiegi medyczne, więc czasy, trwałość efektów i kwalifikacje muszą być
> zatwierdzone przez Dr. Snow przed publikacją.

---

## Przy rozbudowie do pełnego serwisu

1. **Osobne podstrony zabiegów i lokalizacji** — jedna strona nie zrankuje jednocześnie
   na „Botox Zürich" i „mesotherapy Marbella". To one przyniosą ruch z Google.
2. **Statyczne `/de/`** zamiast podmiany przez JS — mocniejsze hreflang i indeksowanie.
3. **Zdjęcia w WebP/AVIF** z `<picture>` i wariantami szerokości.
4. **Rezerwacja online** zamiast formularza kontaktowego.

---

## Struktura

```
index.html              wszystkie sekcje + JSON-LD
assets/css/main.css     tokeny → reset → typografia → layout → reveal → komponenty
assets/js/main.js       smooth scroll, reveal, nawigacja, filtr, przed/po, karuzela, FAQ, formularz
assets/js/i18n.js       słownik niemiecki + przełącznik języka
assets/img/             grafiki SVG, favicon, znak graficzny
robots.txt  sitemap.xml  site.webmanifest
build-preview.py        sklejka do jednego pliku HTML (do wysyłki)
```
