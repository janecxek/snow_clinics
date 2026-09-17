# Snow Clinics — strona internetowa

Statyczny one-pager dla Snow Clinics (medycyna estetyczna, Zürich · Konstanz · Paris · Marbella).
Bez frameworka i bez build stepu — otwierasz `index.html` i działa.

```bash
python3 -m http.server 8000    # http://localhost:8000
```

---

## Kierunek wizualny

Język projektu wywodzi się z monogramu marki: pudrowy błękit koła na białym tle.

| Rola | Token | Hex |
|---|---|---|
| Tekst, sekcje ciemne | `--ink` | `#0E1922` |
| Błękit marki (z logo) | `--frost` | `#A9C5D6` |
| Akcent czytelny na jasnym tle | `--frost-deep` | `#3E6076` |
| Tło | `--porcelain` | `#F3F5F6` |
| Ciepły kontrapunkt (sekcja „Dr. Snow") | `--sand` | `#E3D9CF` |

**Typografia:** Cormorant Garamond (display, waga 300) + Jost (tekst i UI, 300/400/500).
Wysoki kontrast szeryfowej antykwy przy geometrycznym grotesku — europejsko, medycznie, bez cukierkowatości.

**Sygnatura projektu — dwie rzeczy, konsekwentnie:**

1. **„Frost reveal"** — każdy blok wchodzi z rozmycia do ostrości (`blur` → `0`), nagłówki dodatkowo
   wyjeżdżają spod maski. Jak szron znikający ze szkła. To jedyny język animacji na całej stronie.
2. **Koło z logo** — wraca jako łuk w hero (rysuje się przy wejściu), jako obramowanie portretu,
   jako pierścień postępu scrolla w prawym dolnym rogu i jako forma w grafikach.

Wszystko inne jest celowo ciche: włosowe linie, dużo powietrza, zero cieni poza jednym na hoverze karty.

---

## Co jest zrobione

**Sekcje:** hero (pełny ekran) · podejście · pasek wartości · 9 zabiegów z filtrem
· przeciąganie przed/po · proces 01–04 · Dr. Snow · 4 kliniki · opinie · FAQ · formularz · stopka.

**Interakcje:**
- Smooth scroll — własna implementacja (lerp na natywnym scrollu, tylko kółko myszy).
  Dotyk, klawiatura i czytniki ekranu korzystają z natywnego scrolla, więc nic się nie psuje.
- Filtr zabiegów (Wszystkie / Twarz / Skóra / Ciało / Włosy)
- Suwak przed/po — myszka, dotyk i strzałki klawiatury (`role="slider"`)
- Karuzela opinii — wyłącznie ręczna, bez autoplay
- FAQ z płynnym rozwijaniem (`grid-template-rows: 0fr → 1fr`)
- Walidacja formularza z komunikatami przy polach
- Navbar: przezroczysty na hero, matowe szkło po scrollu, chowa się przy schodzeniu w dół
- Pełnoekranowe menu mobilne z kaskadą linków

**Dwujęzyczność EN/DE:** angielski jest w HTML (działa bez JS i dla crawlerów), niemiecki podmieniany
przez `assets/js/i18n.js`. 177 kluczy, komplet przetłumaczony. Wybór zapamiętywany w `localStorage`
i w `?lang=de`.

**SEO:** meta + Open Graph + Twitter Card, canonical, hreflang en/de/x-default, `sitemap.xml`,
`robots.txt`, manifest, JSON-LD (`Organization` + `Physician` + 4 × `MedicalClinic` + `FAQPage` + `WebSite`),
jeden `<h1>`, poprawna hierarchia nagłówków, wszystkie obrazy z `width`/`height` i `loading="lazy"`.

**Dostępność:** skip link, widoczny focus, `aria-pressed` / `aria-expanded` / `aria-live`,
pełna obsługa klawiatury, `prefers-reduced-motion` wyłącza animacje, cele dotykowe ≥ 44 px na mobile,
0 poziomego scrolla przy 390 / 768 / 1440 px.

---

## Do podmiany przed publikacją

Rzeczy, których nie dało się ustalić z profilu IG — **wszystkie wymagają potwierdzenia od kliniki:**

| Co | Gdzie |
|---|---|
| **Zdjęcia** — obecnie autorskie grafiki SVG w kolorach marki | `assets/img/*.svg` → podmiana na `<img src="…jpg">`, proporcje zostają |
| **Domena** — wszędzie `https://snow-clinics.com` | `index.html` (canonical, OG, JSON-LD), `sitemap.xml`, `robots.txt` |
| **Opinie pacjentek** — treści przykładowe | `index.html` sekcja `#reviews` + `q1–q4` w `i18n.js`. Wymagają realnych opinii za zgodą osób |
| **„Since 2016"** i rok założenia | `hero.eyebrow` |
| **Adresy klinik** — są tylko miasta, bez ulic | `#locations` + `PostalAddress` w JSON-LD |
| **Czasy trwania, downtime i trwałość efektów** przy zabiegach | karty w `#treatments` |
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
```
