#!/usr/bin/env python3
"""Buduje wersję strony w jednym pliku HTML.

CSS, JavaScript, fonty i zdjęcia trafiają do środka jako base64, więc plik
działa po dwukliku, bez serwera i bez internetu - do wysłania komuś na
podgląd. Na produkcję idzie normalny katalog, nie to.

    python3 build-jeden-plik.py [plik-wyjsciowy.html]
"""
import base64
import os
import re
import sys

KATALOG = os.path.dirname(os.path.abspath(__file__))
MIME = {'.webp': 'image/webp', '.jpg': 'image/jpeg',
        '.png': 'image/png', '.svg': 'image/svg+xml'}


def data_uri(sciezka, mime):
    with open(sciezka, 'rb') as f:
        return f'data:{mime};base64,' + base64.b64encode(f.read()).decode()


def zbuduj(wyjscie):
    os.chdir(KATALOG)
    html = open('index.html', encoding='utf-8').read()

    # Fonty: podmieniamy url() w @font-face na base64.
    fonts = re.sub(
        r"url\('([^']+)'\)",
        lambda m: "url('" + data_uri(os.path.join('assets', m.group(1)), 'font/woff2') + "')",
        open('assets/fonts.css', encoding='utf-8').read())

    style = open('assets/style.css', encoding='utf-8').read()
    app = open('assets/app.js', encoding='utf-8').read()

    # Jedna kopia zdjęcia wystarczy - srcset tylko podwoiłby wagę pliku.
    for atrybut in ('srcset', 'sizes', 'imagesrcset', 'imagesizes'):
        html = re.sub(rf'\s*{atrybut}="[^"]*"', '', html)

    pamiec = {}

    def obraz(sciezka):
        if sciezka not in pamiec:
            pamiec[sciezka] = data_uri(sciezka, MIME[os.path.splitext(sciezka)[1]])
        return pamiec[sciezka]

    html = re.sub(r'src="(img/[^"]+)"',
                  lambda m: f'src="{obraz(m.group(1))}"' if os.path.exists(m.group(1)) else m.group(0),
                  html)

    # Nie ma już czego wstępnie pobierać ani manifestu do wskazania.
    html = re.sub(r'\s*<link rel="preload"[^>]*>', '', html)
    html = re.sub(r'\s*<link rel="manifest"[^>]*>', '', html)

    html = html.replace(
        '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
        f'<link rel="icon" href="{data_uri("favicon.svg", "image/svg+xml")}" type="image/svg+xml">')
    html = html.replace(
        '<link rel="apple-touch-icon" href="img/apple-touch-icon.png">',
        f'<link rel="apple-touch-icon" href="{obraz("img/apple-touch-icon.png")}">')

    html = html.replace(
        '<link rel="stylesheet" href="assets/fonts.css">\n<link rel="stylesheet" href="assets/style.css">',
        '<style>\n' + fonts + '\n' + style + '\n</style>')
    html = html.replace(
        '<script src="assets/app.js" defer></script>',
        '<script>\n' + app + '\n</script>')

    # Nic nie może zostać wskazaniem na plik obok - inaczej podgląd się sypie.
    zostalo = [w for w in re.findall(r'(?:src|href)="((?!https?:|#|data:|mailto:)[^"]+)"', html)]
    if zostalo:
        raise SystemExit(f'Niewszyte odwołania: {zostalo}')

    open(wyjscie, 'w', encoding='utf-8').write(html)
    print(f'{wyjscie}: {os.path.getsize(wyjscie) // 1024} KB, '
          f'{len(pamiec)} zdjęć i {len(re.findall("@font-face", fonts))} krojów w środku')


if __name__ == '__main__':
    domyslne = os.path.join(os.path.dirname(KATALOG), 'pragnacwiecej-jeden-plik.html')
    zbuduj(sys.argv[1] if len(sys.argv) > 1 else domyslne)
