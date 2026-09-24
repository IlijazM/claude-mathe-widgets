# claude-mathe-widgets 🐱📐

Widgets und Zeichnungen für den Claude-Skill **Mathe-Lehrer**. Die Dateien werden über [jsDelivr](https://www.jsdelivr.com/) direkt aus diesem Repo geladen. Der Skill selbst enthält dadurch nur noch kurze Snippets statt des ganzen Codes (≈ 26 KB statt ≈ 107 KB), und beim Anzeigen eines Widgets schreibt Claude ~150 Tokens statt ~20.000.

| Datei | Inhalt |
|---|---|
| `umform.js` | Interaktives Umform-Widget für Gleichungen (Container `#ml`) |
| `funktionen.js` | Koordinatensystem mit 1–3 Funktionen, Legende, Schnittpunkten, Nullstellen (Container `#mp`) |
| `bilder.js` | Alltags-Beispiele `1a`–`5b` und Katzen `katze-1`–`katze-5` (für jedes Element mit `data-bild`) |
| `skill/SKILL.md` | Die schlanke Skill-Anleitung, die diese Dateien benutzt |
| `demo.html` | Lokale Vorschau – einfach im Browser öffnen |

## Einbinden

```html
<div id="ml">Widget lädt …</div>
<script>var CONFIG={equation:"2x + 3 = 13",target:"x",steps:[]};</script>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@v1/umform.js"></script>
```

```html
<div id="mp">Widget lädt …</div>
<script>var CONFIG={functions:[{name:"f",expr:"2x + 1"}],x:[-5,5]};</script>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@v1/funktionen.js"></script>
```

```html
<div data-bild="katze-5" data-texte="x = 4"></div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@v1/bilder.js"></script>
```

`data-texte` ersetzt die Texte im Bild der Reihe nach (getrennt mit `|`, leere Stellen bleiben unverändert).

## Veröffentlichen & Versionen

1. Repo **öffentlich** auf GitHub pushen (jsDelivr kann keine privaten Repos ausliefern).
2. Tag `v1` setzen: `git tag v1 && git push origin v1`.
3. Test im Browser: <https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@v1/umform.js> muss den Code zeigen.

Der Skill lädt fest `@v1`, damit Änderungen am `main`-Branch nie laufende Chats kaputt machen. Für Updates: Änderungen committen, neuen Tag `v2` setzen und im Skill `@v1` → `@v2` ersetzen. (Einen bestehenden Tag zu verschieben klappt wegen des CDN-Caches nicht zuverlässig.)
