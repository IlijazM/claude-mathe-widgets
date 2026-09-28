# claude-mathe-widgets 🐱📐

Widgets und Zeichnungen für den Claude-Skill **Mathe-Lehrer**. Die Dateien werden über [jsDelivr](https://www.jsdelivr.com/) direkt aus diesem Repo geladen. Der Skill selbst enthält dadurch nur noch kurze Snippets statt des ganzen Codes (≈ 26 KB statt ≈ 107 KB), und beim Anzeigen eines Widgets schreibt Claude ~150 Tokens statt ~20.000.

| Datei | Inhalt |
|---|---|
| `umform.js` | Interaktives Umform-Widget für Gleichungen (Container `#ml`) |
| `funktionen.js` | Koordinatensystem mit 1–3 Funktionen, Legende, Schnittpunkten, Nullstellen (Container `#mp`) |
| `ableiten.js` | Ableiten & Aufleiten von Polynomen/Potenzen zum Selbst-Eintippen in Lücken (Container `#md`) |
| `zuordnen.js` | 2–6 kleine Graphen den passenden Funktionstermen zuordnen, per Antippen (Container `#mz`) |
| `aufstellen.js` | Funktionsgleichung aus einem Graphen aufstellen: linear, Potenz, exponentiell (Container `#ma`) |
| `einsetzen.js` | Einsetzen in Lücken `f([ ]) = [ ]` mit pulsierender 0 und Probe `f(−2) = …` (Container `#me`) |
| `bilder.js` | Alltags-Beispiele `1a`–`5b` und Katzen `katze-1`–`katze-5` (für jedes Element mit `data-bild`) |
| `skill/SKILL.md` | Die schlanke Skill-Anleitung, die diese Dateien benutzt |
| `demo.html` | Lokale Vorschau – einfach im Browser öffnen |
| `demo-ableiten.html` | Lokale Vorschau des Ableiten-Widgets |
| `demo-zuordnen.html`, `demo-aufstellen.html`, `demo-einsetzen.html`, `demo-pq.html` | Lokale Vorschau der neuen Widgets bzw. von pq/abc im Umform-Widget |

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
<div id="mz" data-config='{"functions":["2x + 1","x^2 - 2","2^x","-x + 3"],"x":[-4,4],"y":[-4,6]}'>Widget lädt …</div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/zuordnen.js"></script>
```

```html
<div id="ma" data-config='{"type":"linear","m":2,"b":-1}'>Widget lädt …</div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/aufstellen.js"></script>
```

```html
<div id="me" data-config='{"mode":"probe","name":"f","expr":"x^2 - 4","x":-2}'>Widget lädt …</div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/einsetzen.js"></script>
```

```html
<div data-bild="katze-5" data-texte="x = 4"></div>
<script src="https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/bilder.js"></script>
```

Die Einstellungen stehen als JSON im Attribut `data-config`, nicht in einem eigenen `<script>`: Der Claude-Chat führt Skripte nicht zuverlässig in Reihenfolge aus. Alternativ geht `window.CONFIG` (das Widget wartet bis zu 3 s darauf) oder der Aufruf `MatheUmform(cfg)` / `MatheFunktionen(cfg)` / `MatheAbleiten(cfg)` / `MatheZuordnen(cfg)` / `MatheAufstellen(cfg)` / `MatheEinsetzen(cfg)`. Fehlt die CONFIG, erscheint eine Fehlermeldung statt einer Beispiel-Gleichung.

`data-texte` ersetzt die Texte im Bild der Reihe nach (getrennt mit `|`, leere Stellen bleiben unverändert).

### Ableiten-Widget (`ableiten.js`)

| Feld | Bedeutung |
|---|---|
| `mode` | `"ableiten"` oder `"aufleiten"` (Pflicht) |
| `expr` | Funktion als Summe aus `a·xⁿ`, z. B. `4x³ − 2x + 5`, `√x + 1/x²`, `x⁻¹`, `3x^(1/2)`, `∛x`, `½x²` (Pflicht) |
| `name` | Funktionsname, Standard `"f"` (→ `f′`, `f″` bzw. `F`) |

Kann: Potenz-, Faktor- und Summenregel inkl. negativer und Bruch-Exponenten, Umschreiben von Wurzeln und `a/xⁿ`, Sonderfall `1/x → ln|x|`, `+ C`, „nochmal ableiten“. Kann nicht: Ketten-/Produktregel, `eˣ`, `sin`, Klammern mit Summen darin.

### Umform-Widget: pq-/abc-Formel und Einsetz-Animation (neu in v1.1.0)

Zwei zusätzliche, optionale Felder. Alte CONFIGs funktionieren unverändert.

| Feld | Bedeutung |
|---|---|
| `intro` | Startzeile, aus der die Gleichung „hineinanimiert“ wird, z. B. `"f(x) = 0"` oder `"f(x) = g(x)"`. Die Gleichung selbst steht wie immer in `equation`. |
| `formula` | `"pq"` oder `"abc"`: nur diese Formel im Dropdown anbieten. Ohne das Feld stehen beide zur Wahl. |

Die Rechenarten „pq“ und „abc“ erscheinen im Dropdown, sobald die Gleichung die Form a·x² + b·x + c = 0 hat. Dann tippt man p, q (bzw. a, b, c) in Lücken, prüft, und das Widget rechnet Zeile für Zeile bis x₁ und x₂ (auch „keine Lösung“, eine Lösung und gerundete Wurzeln). Für pq muss vor dem x² eine 1 stehen, sonst kommt ein Hinweis. In `steps` geht `{"op":"pq"}` bzw. `{"op":"abc"}` (ohne `val`).

### Zuordnen-Widget (`zuordnen.js`)

| Feld | Bedeutung |
|---|---|
| `functions` | 2–6 Funktionsterme (Pflicht), gleiche Schreibweise wie beim Funktions-Widget |
| `x`, `y` | Sichtbarer Bereich für alle Graphen, Standard `x` = `[-4,4]`, `y` automatisch |

Man tippt einen Graphen und dann einen Term an (oder umgekehrt). „prüfen“: richtige Paare werden grün und fest, falsche sanft markiert. Ab dem zweiten Fehlversuch gibt es einen Tipp, am Ende Konfetti.

### Aufstellen-Widget (`aufstellen.js`)

| Feld | Bedeutung |
|---|---|
| `type` | `"linear"` (braucht `m`, `b`), `"potenz"` (braucht `a`, `n` mit n = 1 … 5) oder `"exponentiell"` (braucht `a`, `b`) – Pflicht |
| `x`, `y` | Bereich (optional). Standard: `[-5,5]` bzw. `[-3,4]` bei exponentiell |
| `points` | Markierte Punkte, z. B. `[[0,1],[1,3]]`. Ohne das Feld werden 2–3 ganzzahlige Gitterpunkte gewählt |
| `coords` | `true` = Koordinaten an die Punkte schreiben (Standard: aus, man soll ablesen) |
| `name` | Funktionsname, Standard `"f"` |

Vorlagen: `f(x) = [m]x + [b]`, `f(x) = [a] · x^[n]`, `f(x) = [a] · [b]^x`.

### Einsetzen-Widget (`einsetzen.js`)

| Feld | Bedeutung |
|---|---|
| `mode` | `"luecken"` (`f([ ]) = [ ]`) oder `"probe"` (eingesetzt und Schritt für Schritt ausgerechnet) – Pflicht |
| `expr`, `name` | Die Funktion als Summe aus a·xⁿ (n = 0 … 6) und ihr Name |
| `functions` | Nur `probe`: bis zu 3 Funktionen `[{"name":"f","expr":"x^2 - 4"},{"name":"g","expr":"x - 2"}]` mit demselben `x` |
| `x` | `luecken`: erlaubte x-Werte, z. B. `[2,-2]` (ohne Feld: jede Zahl). `probe`: der eingesetzte Wert (Pflicht) |
| `pulse` | Standard `true`: Kommt 0 heraus, wird die 0 hervorgehoben und pulsiert (bei `probe` nur mit genau einer Funktion) |

## Veröffentlichen & Versionen

1. Änderungen auf `main` pushen.
2. Auf GitHub unter **Releases → Draft a new release** einen neuen Tag im Format `v1.x.y` anlegen (neues Feature → `v1.1.0`, Bugfix → `v1.0.1`) und veröffentlichen.
3. Der Skill lädt `@1` – jsDelivr liefert damit automatisch den neuesten Release `v1.x.x` aus. Die GitHub Action `purge-jsdelivr.yml` leert nach jedem Release den CDN-Cache für alle Widget-Dateien.
4. Test im Browser: <https://cdn.jsdelivr.net/gh/IlijazM/claude-mathe-widgets@1/einsetzen.js> muss den Code zeigen.
5. Neue Widget-Dateien immer auch in die `for`-Schleife von `.github/workflows/purge-jsdelivr.yml` eintragen.

Nur bei inkompatiblen Änderungen (z. B. neues CONFIG-Format) auf `v2.0.0` gehen und im Skill `@1` → `@2` ersetzen – so gehen laufende Chats mit alten Snippets nie kaputt.
