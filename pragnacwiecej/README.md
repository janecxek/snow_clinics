# Pragnąc Więcej — Iga Pawlak

Jednostronicowa witryna dla marki **pragnacwiecej** (coaching decyzji
i ścieżki życiowej dla osób w swoich 20s).

Statyczna strona — bez frameworka i bez kroku budowania. Wgraj zawartość
tego katalogu na dowolny hosting i działa. Ścieżki do zasobów są
**względne**, więc strona działa też w podkatalogu (np. GitHub Pages).

## Struktura

```
index.html            cała treść strony
assets/style.css      system projektowy + wszystkie style
assets/fonts.css      @font-face dla self-hostowanych fontów
assets/fonts/         Lora + Poppins (woff2, latin + latin-ext)
assets/app.js         płynne przewijanie, nawigacja, okno zapisu, animacje
img/                  zdjęcia (webp) + og.jpg + apple-touch-icon.png
favicon.svg  robots.txt  sitemap.xml  site.webmanifest
```

## Zanim wejdzie na produkcję

1. **Domena.** W `index.html` podmień `https://pragnacwiecej.pl/`
   w: `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`
   oraz w blokach JSON-LD. To samo w `sitemap.xml` i `robots.txt`.
2. **Cena i długość sesji.** Nigdzie nie podajemy kwoty — w oknie zapisu
   i w FAQ jest „ustalamy przed pierwszą sesją”. Jeśli cennik ma być jawny,
   trzeba dopisać sekcję (i dodać `offers` do JSON-LD `Service`).
3. **Link do DM.** Przycisk Instagrama prowadzi do `https://ig.me/m/pragnacwiecej` —
   warto kliknąć i sprawdzić, czy otwiera wiadomość do właściwego konta.
4. **Zdjęcia.** Wszystkie pochodzą z karuzel z Instagrama i mają maks. 1170 px
   szerokości. Oryginały z sesji dałyby ostrzejsze hero na dużych ekranach.

## Design system

Kierunek wizualny zaadaptowany z szablonu referencyjnego (Holina): piaskowe
tło, terakota jako kolor akcji, głęboka zieleń jako przeciwwaga, Lora nad
Poppinsem, duże promienie i miękkie bloki.

| token | wartość | rola |
|---|---|---|
| `--piasek` | `#F0E8DB` | tło strony |
| `--piasek-jasny` | `#FCF6EA` | jaśniejsze pasmo sekcji |
| `--karta` | `#F5E7D0` | karty, wiersze FAQ, pigułka nawigacji |
| `--kamien` | `#CFC3B9` | włoskowate linie |
| `--tusz` | `#1E2015` | nagłówki |
| `--tusz-tekst` | `#3F4136` | tekst |
| `--tusz-cichy` | `#646458` | podpisy, meta |
| `--las` | `#41593C` | zieleń — kolor główny (przyciski, tagi, bloki) |
| `--las-mgla` | `#E6EAE1` | zielony odcień tła |
| `--woda` | `#26536E` | niebieski — przeciwwaga (pasmo „Dla kogo", ikony usług) |
| `--woda-mgla` | `#E2E9ED` | niebieski odcień tła |

Paleta to **beże + zieleń + niebieski** — kolory, które wskazała klientka.
Pomarańczowy (terakota) z szablonu referencyjnego został usunięty w całości:
z tokenów, z ikon, z zasłony nad hero i ze zdjęcia w sekcji „manifest"
(zachód słońca zastąpiły góry — zieleń i błękit).

Zieleń i niebieski mają **tę samą jasność** (29 % w HSL) i 92° różnicy
w odcieniu, więc czytają się jak para, a nie jak kolor główny i podrzędny.

Krój: **Lora** (nagłówki, waga zmienna 400–700) + **Poppins** (tekst, 400/500/600),
self-hostowane, podzbiory latin + latin-ext.

Wszystkie pary kolor/tło przechodzą **WCAG AA** (4.5:1 dla tekstu, 3:1 dla
elementów nietekstowych) — łącznie z półprzezroczystą bielą na terakocie
i zieleni. Zmieniając kolory, przelicz kontrast.

## Animacje

- **Płynne przewijanie z bezwładnością** (`assets/app.js`, moduł `Plynne`) —
  własna implementacja w stylu lenis, ~60 linii, bez zależności. Włącza się
  tylko dla myszy; na dotyku i touchpadzie zostaje natywne przewijanie.
  Kotwice jadą tym samym silnikiem, więc mają tę samą bezwładność.
- **Odsłanianie przy przewijaniu** — opacity + translateY, kaskadowo,
  sterowane `IntersectionObserver`; opóźnienie ustawia się per element
  przez `style="--zwloka:120ms"`.
- **Wejście hero** — kaskada tekstu plus powolne odjechanie zdjęcia ze skali.
- **Manifest (zdanie pod hero)** — zdanie wyjeżdża spod zdjęcia hero.
  Hero i manifest siedzą we wspólnym rodzicu `.scena-startowa`, dzięki czemu
  zdjęcie (`position: sticky`) klei się do ekranu tylko na czas manifestu.
  Manifest to tor `210svh` (`.manifest__tor`) z przyklejoną sceną wysokości
  ekranu (`.manifest__scena`), leżącą pod hero (z-index 1 vs 2).
  `app.js` liczy jedną miarę — ile toru przewinięto — i robi z niej trzy
  postępy zapisywane na `.scena-startowa`:
  `--z` gasi tekst hero i zasłonę (0,06 → 0,34 toru), `--h` przycina zdjęcie
  od dołu do pasma (0,42 → 0,78), `--p` zjeżdża zdaniem w dół (0,46 → 0,96).
  Przycinanie robi `clip-path: inset(...)` na `.hero__kadr`, więc kadrowanie
  zostaje na twarzy, a nie na butach; `object-position` przesuwa się w prawo
  razem z `--h`. Wysokość pasma to `--kurtyna` / `--pasmo` (na wąskich
  ekranach więcej, bo wąski kadr przycina zdjęcie w poziomie).
  `--zjazd` jest celowo krótki (20svh): gdyby zdanie jechało z daleka, jego
  dolna krawędź odklejałaby się od krawędzi zdjęcia i pod spodem otwierałby
  się pusty pas piasku.
  Uwagi przy edycji: `.manifest` nie może dostać `overflow` innego niż
  `visible` — zrobiłoby z siebie kontener przewijania i `sticky` przestałoby
  działać. Zdanie wyjeżdża dołem do przodu, więc nie warto dokładać do niego
  animacji słowo-po-słowie (idzie od pierwszego słowa) — te dwa ruchy się
  biją i pod zdjęciem robi się pusto. Wersja słowo-po-słowie jest w historii
  gita, gdyby kiedyś wróciła.
- **Nagłówek** — chowa się przy przewijaniu w dół, wraca przy przewijaniu w górę.
- **Hover** — karty unoszą się, przyciski wypełniają się od dołu.

## Dostępność i degradacja

- Bez JavaScriptu: cała treść widoczna, nawigacja działa, FAQ działa
  (natywne `<details>`), oba sposoby zapisu dostępne bezpośrednio w sekcji
  końcowej.
- `prefers-reduced-motion`: bezwładne przewijanie wyłączone, animacje
  wyłączone, wszystko od razu widoczne.
- Okno zapisu: pułapka focusu, Esc, przywrócenie focusu po zamknięciu.
- Kotwice przenoszą focus do sekcji, nie tylko widok.

## Podgląd lokalny

```sh
python3 -m http.server 8000
# http://localhost:8000
```

## Wersja w jednym pliku

Do wysłania komuś na podgląd (działa po dwukliku, bez serwera i bez internetu):

```sh
python3 build-jeden-plik.py
# -> ../pragnacwiecej-jeden-plik.html
```

Skrypt wszywa CSS, JavaScript, fonty i zdjęcia jako base64. Na produkcję
idzie normalny katalog — przeglądarka cache'uje wtedy zasoby osobno.
Wyniki (`pragnacwiecej-jeden-plik.html`, `pragnacwiecej-strona.zip`) są
w `.gitignore`, bo odtwarza je ten skrypt.

## Zapasowe zdjęcia

W `img/` leżą też kadry, których obecny układ nie używa: `iga-portret`,
`iga-studio`, `iga-sylwetka`, `ocean`, a od usunięcia polaroidów z sekcji
z mottem także `klif` i `gory`. Przeglądarka ich nie pobiera — zostają na
wypadek kolejnej iteracji układu. Można je usunąć.
