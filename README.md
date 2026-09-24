# claude-mathe-widgets 🐱📐

Widgets und Zeichnungen für den Claude-Skill **Mathe-Lehrer**. Die Dateien werden über [jsDelivr](https://www.jsdelivr.com/) direkt aus diesem Repo geladen. Der Skill selbst enthält dadurch nur noch kurze Snippets statt des ganzen Codes (≈ 26 KB statt ≈ 107 KB), und beim Anzeigen eines Widgets schreibt Claude ~150 Tokens statt ~20.000.

| Datei | Inhalt |
|---|---|
| `umform.js` | Interaktives Umform-Widget für Gleichungen (Container `#ml`) |
| `funktionen.js` | Koordinatensystem mit 1–3 Funktionen, Legende, Schnittpunkten, Nullstellen (Container `#mp`) |
| `ableiten.js` | Ableiten & Aufleiten von Polynomen/Potenzen zum Selbst-Eintippen in Lücken (Container `#md`) |
| `bilder.js` | Alltags-Beispiele `1a`–`5b` und Katzen `katze-1`–`katze-5` (für jedes Element mit `data-bild`) |
| `skill/SKILL.md` | Die schlanke Skill-Anleitung, die diese Dateien benutzt |
| `demo.html` | Lokale Vorschau – einfach im Browser öffnen |
| `demo-ableiten.html` | Lokale Vorschau des Ableiten-Widgets |

## Einbinden

```html
<div id="ml" data-config='{"equation":"2x + 3 = 13","target":"x","steps":[]}'>Widget lädt …</div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/umform.js"></script>
```

```html
<div id="mp" data-config='{"functions":[{"name":"f","expr":"2x + 1"}],"x":[-5,5]}'>Widget lädt …</div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/funktionen.js"></script>
```

```html
<div id="md" data-config='{"mode":"ableiten","expr":"4x³ − 2x + 5","name":"f"}'>Widget lädt …</div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/ableiten.js"></script>
```

```html
<div data-bild="katze-5" data-texte="x = 4"></div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/bilder.js"></script>
```

Die Einstellungen stehen als JSON im Attribut `data-config`, nicht in einem eigenen `<script>`: Der Claude-Chat führt Skripte nicht zuverlässig in Reihenfolge aus. Alternativ geht `window.CONFIG` (das Widget wartet bis zu 3 s darauf) oder der Aufruf `MatheUmform(cfg)` / `MatheFunktionen(cfg)` / `MatheAbleiten(cfg)`. Fehlt die CONFIG, erscheint eine Fehlermeldung statt einer Beispiel-Gleichung.

`data-texte` ersetzt die Texte im Bild der Reihe nach (getrennt mit `|`, leere Stellen bleiben unverändert).

### Ableiten-Widget (`ableiten.js`)

| Feld | Bedeutung |
|---|---|
| `mode` | `"ableiten"` oder `"aufleiten"` (Pflicht) |
| `expr` | Funktion als Summe aus `a·xⁿ`, z. B. `4x³ − 2x + 5`, `√x + 1/x²`, `x⁻¹`, `3x^(1/2)`, `∛x`, `½x²` (Pflicht) |
| `name` | Funktionsname, Standard `"f"` (→ `f′`, `f″` bzw. `F`) |

Kann: Potenz-, Faktor- und Summenregel inkl. negativer und Bruch-Exponenten, Umschreiben von Wurzeln und `a/xⁿ`, Sonderfall `1/x → ln|x|`, `+ C`, „nochmal ableiten“. Kann nicht: Ketten-/Produktregel, `eˣ`, `sin`, Klammern mit Summen darin.

## Veröffentlichen & Versionen

1. Änderungen auf `main` pushen.
2. Auf GitHub unter **Releases → Draft a new release** einen neuen Tag im Format `v1.x.y` anlegen (neues Feature → `v1.1.0`, Bugfix → `v1.0.1`) und veröffentlichen.
3. Der Skill lädt `@1` – jsDelivr liefert damit automatisch den neuesten Release `v1.x.x` aus. Die GitHub Action `purge-jsdelivr.yml` leert nach jedem Release den CDN-Cache für alle Widget-Dateien.
4. Test im Browser: <https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/ableiten.js> muss den Code zeigen.

Nur bei inkompatiblen Änderungen (z. B. neues CONFIG-Format) auf `v2.0.0` gehen und im Skill `@1` → `@2` ersetzen – so gehen laufende Chats mit alten Snippets nie kaputt.
