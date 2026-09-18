# Pragnąc Więcej — Iga Pawlak

Jednostronicowa witryna dla marki **pragnacwiecej** (coaching decyzji
i ścieżki życiowej dla osób w swoich 20s).

Statyczna strona — bez frameworka i bez kroku budowania. Wgraj zawartość
tego katalogu na dowolny hosting i działa.

## Struktura

```
index.html            cała treść strony
assets/style.css      system projektowy + wszystkie style
assets/fonts.css      @font-face dla self-hostowanych fontów
assets/fonts/         Fraunces + Manrope (woff2, latin + latin-ext)
assets/app.js         menu, okno zapisu, odsłanianie, manifest
img/                  zdjęcia (webp) + og.jpg + apple-touch-icon.png
favicon.svg  robots.txt  sitemap.xml  site.webmanifest
```

Ścieżki do zasobów są **względne**, więc strona działa zarówno pod
własną domeną, jak i w podkatalogu (np. GitHub Pages).

## Zanim wejdzie na produkcję

1. **Domena.** W `index.html` podmień `https://pragnacwiecej.pl/`
   w: `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`
   oraz w blokach JSON-LD. To samo w `sitemap.xml` i `robots.txt`.
2. **Cena i długość sesji.** Nigdzie nie podajemy kwoty — w oknie zapisu
   i w FAQ jest sformułowanie „ustalamy przed pierwszą sesją”. Jeśli
   cennik ma być jawny, trzeba dopisać sekcję (i dodać `offers` do
   JSON-LD `Service`).
3. **Link do DM.** Przycisk Instagrama prowadzi do `https://ig.me/m/pragnacwiecej`.
   Warto to kliknąć i sprawdzić, czy otwiera wiadomość do właściwego konta.

## Design system

| token | wartość | rola |
|---|---|---|
| `--len` | `#EDE8DF` | len — tło bazowe |
| `--len-jasny` | `#F6F3ED` | jaśniejsze pasmo sekcji |
| `--popiol` | `#DCD5C9` | popiół — pasmo „poza rozmowami” |
| `--atrament` | `#23262B` | atrament — chłodna czerń |
| `--atrament-70` | `#4C515A` | tekst drugoplanowy |
| `--atrament-45` | `#585D65` | podpisy, „brwi” sekcji |
| `--ocean` | `#1E4F73` | akcent główny |
| `--sygnal` | `#1F63E8` | błękit z Instagrama — tylko włoskowate akcenty |
| `--mech` | `#4E6B52` | zieleń marynarki — sekcja „czym jest coaching” |

Krój pisma: **Fraunces** (nagłówki, oś `opsz`) + **Manrope** (tekst).
Fraunces jest zinstancjonowany do samej osi `opsz` — 494 KB → 144 KB.

Wszystkie pary kolor/tło przechodzą **WCAG AA (4.5:1)** dla tekstu
i 3:1 dla elementów nietekstowych. Zmieniając kolory, przelicz kontrast.

## Dostępność i degradacja

- Bez JavaScriptu: cała treść jest widoczna, nawigacja działa, FAQ działa
  (natywne `<details>`), a oba sposoby zapisu są dostępne bezpośrednio
  w sekcji „Jak się zapisać”.
- `prefers-reduced-motion`: sekcja „manifest” zamienia się w statyczny
  blok, animacje odsłaniania są wyłączone.
- Okno zapisu: pułapka focusu, Esc, przywrócenie focusu po zamknięciu.

## Podgląd lokalny

```sh
python3 -m http.server 8000
# http://localhost:8000
```
