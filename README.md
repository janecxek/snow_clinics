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
| Akcent czytelny na jasnym tle | `--frost-deep` | `#3E6076` |
| Tło | `--porcelain` | `#F3F5F6` |
| Ciepły kontrapunkt (sekcja „Dr. Snow") | `--sand` | `#E3D9CF` |

**Typografia: Instrument Serif + Instrument Sans.** Jedna nadrodzina, więc szeryf i grotesk
są rysowane tak, żeby się zgadzać. Obowiązuje twarda zasada podziału:

- **Szeryf** — tylko nagłówki sekcji, liczby i sygnatura. Rzeczy, na które się patrzy.
- **Grotesk** — wszystko, co się czyta: leady, opisy, nazwy zabiegów, pytania FAQ, formularz.

Tekst podstawowy ma 17–18 px i wagę 400. Poprzednia wersja (Cormorant + Jost 300 przy 16 px)
wyglądała elegancko i męczyła przy czytaniu.

**Sygnatura — „frost reveal":** każdy blok wchodzi z rozmycia do ostrości (`blur` → `0`),
nagłówki dodatkowo wyjeżdżają spod maski. Jak szron znikający ze szkła. To jedyny język
animacji na stronie.

### Czego tu celowo nie ma

Research nad tym, co zdradza stronę generowaną automatycznie, wskazuje na kilka
powtarzalnych sygnatur. Zostały usunięte:

- **gradientowe kule i bloby w tle** — pierwszy i najmocniejszy sygnał; grafiki są teraz
  płaskimi, równomiernie oświetlonymi polami z ziarnem, czyli tym, czym mają być: miejscem
  na zdjęcie;
- **dekoracyjne okręgi w hero** — motyw koła z logo został w monogramie, gdzie ma sens;
- **siatka bliźniaczych kart ze zdjęciem i akapitem** — zastąpiona kategoriami i listą danych;
- **pasek z przewijającymi się hasłami** — powtarzał to, co pasek faktów mówi wprost;
- **Inter** i inne domyślne kroje.

Zdjęć nie zastępuje żadna grafika udająca zdjęcie. Miejsca na fotografię (hero, portret,
przed/po) są przygotowane i czekają na materiały kliniki.

## Co jest zrobione

**Sekcje:** hero (pełny ekran) · pasek faktów · podejście · zabiegi w czterech kategoriach
· przeciąganie przed/po · proces 01–04 · Dr. Snow · 4 kliniki · opinie · FAQ · formularz · stopka.

### Zabiegi — kategorie zamiast listy

Dziewięć kart naraz to menu do przejrzenia, nie wybór do podjęcia. Teraz wyborem jest
**obszar**, a zabiegi są szczegółem za nim:

| | Kategoria | Zabiegi |
|---|---|---|
| 01 | Mimikfalten / Expression lines | 2 |
| 02 | Volumen & Kontur / Volume & contour | 2 |
| 03 | Hautqualität / Skin quality | 3 |
| 04 | Körper & Haar / Body & hair | 2 |

Kwadratowe kafle, jeden otwarty naraz, panel **morfuje do wysokości** nowej zawartości
(bez skoku), wiersze wjeżdżają kaskadowo. Zaimplementowane jako `role="tablist"` —
strzałki przewijają kategorie, focus podąża za wyborem. Bez JS wszystkie dziewięć zabiegów
jest w treści, więc Google i czytniki widzą komplet.

Kategorie nazywają **problem, nie procedurę** — bo tak myśli osoba, która jeszcze nie wie,
czego chce, i nie powinna musieć zgadywać, pod którą nazwę handlową podpada jej zmartwienie.

**Interakcje:**
- Smooth scroll — własna implementacja (lerp na natywnym scrollu, tylko kółko myszy).
  Dotyk, klawiatura i czytniki ekranu korzystają z natywnego scrolla, więc nic się nie psuje.
- Suwak przed/po — myszka, dotyk i strzałki klawiatury (`role="slider"`)
- Karuzela opinii — wyłącznie ręczna, bez autoplay
- FAQ z płynnym rozwijaniem (`grid-template-rows: 0fr → 1fr`)
- Walidacja formularza z komunikatami przy polach
- Navbar: przezroczysty na hero, matowe szkło po scrollu, chowa się przy schodzeniu w dół
- Pasek akcji na mobile: pojawia się po hero, znika przy formularzu

### Psychologia — co i dlaczego

| Mechanizm | Gdzie na stronie |
|---|---|
| **Prawo Hicka** — mniej opcji, szybsza decyzja | 4 kategorie zamiast 9 kart |
| **Autorytet** | pasek faktów tuż pod hero: kto wykonuje, jakie produkty, co w cenie |
| **Odwrócenie ryzyka** | „pierwszy termin to konsultacja, nic się nie wstrzykuje", plan z ceną przed zobowiązaniem, bezpłatne odwołanie 48 h |
| **Dowód społeczny przy CTA** | opinia pacjentki bezpośrednio obok formularza, nie tylko w osobnej sekcji |
| **Efekt Pratfalla** | „odradzimy połowę tego, po co przyszłaś" — przyznanie się do niewygodnego buduje wiarę |
| **Heurystyka dostępności** | konkretne liczby: 45 minut, 2 tygodnie, 48 godzin, 3–4 miesiące |
| **Naturalna rzadkość** | Paryż i Marbella mają ograniczone dni kliniczne — i tak jest naprawdę |
| **Mała pierwsza prośba** | CTA brzmi „umów konsultację", nie „umów zabieg" |

**Dwujęzyczność EN/DE:** angielski jest w HTML (działa bez JS i dla crawlerów), niemiecki
podmieniany przez `assets/js/i18n.js`. 207 kluczy, komplet przetłumaczony. Wybór zapamiętywany
w `localStorage` i w `?lang=de`. Przełączenie języka odpala zdarzenie, na które panel kategorii
przelicza wysokość — niemieckie teksty są dłuższe.

**SEO:** meta + Open Graph + Twitter Card, canonical, hreflang en/de/x-default, `sitemap.xml`,
`robots.txt`, manifest, JSON-LD (`Organization` + `Physician` + 4 × `MedicalClinic` + `FAQPage` + `WebSite`),
jeden `<h1>`, poprawna hierarchia nagłówków, wszystkie obrazy z `width`/`height` i `loading="lazy"`.

**Dostępność:** skip link, widoczny focus, `aria-selected` / `aria-expanded` / `aria-live`,
pełna obsługa klawiatury (łącznie ze strzałkami w kategoriach), `prefers-reduced-motion`
wyłącza animacje nie chowając treści, cele dotykowe ≥ 44 px, 0 poziomego scrolla
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
