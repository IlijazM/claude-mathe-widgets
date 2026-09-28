# claude-mathe-widgets v1.1.0 – so kommt es ins Repo

Der Push aus der Claude-Sitzung ging nicht (403, Repo war nicht als Quelle freigeschaltet). Deshalb dieses ZIP.

## Variante A: Patch (empfohlen, behält die Commit-Nachricht)

```bash
cd claude-mathe-widgets
git checkout main && git pull
git checkout -b feature/graphen-nullstellen
git am --keep-cr /pfad/zu/_aenderungen.patch
git push -u origin feature/graphen-nullstellen
```
(`--keep-cr` ist wichtig, sonst scheitert der Patch an den CRLF-Zeilenenden des Workflows.) Dann auf GitHub den Pull Request öffnen und mergen.

## Variante B: Dateien hochladen

Alle Dateien aus diesem Ordner (außer `ANLEITUNG.md`, `_aenderungen.patch` und `_screenshots/`) an dieselbe Stelle im Repo legen und überschreiben, z. B. per GitHub → „Add file → Upload files“. **Wichtig:** `.github/workflows/purge-jsdelivr.yml` hat Windows-Zeilenenden (CRLF) – die Datei so übernehmen, wie sie ist.

## Danach: Release

1. GitHub → Releases → „Draft a new release“ → Tag **`v1.1.0`** → veröffentlichen.
2. Die Action `purge-jsdelivr.yml` leert den CDN-Cache (jetzt auch für `ableiten.js`, das bisher gefehlt hat).
3. Den Skill aktualisieren (Vorschlag kommt im Chat als Karte zum Speichern).
4. Im Chat Bescheid sagen – dann teste ich die Widgets einmal live mit `@1`.

## Was drin ist

- `zuordnen.js` (neu): Graphen per Antippen den Termen zuordnen
- `aufstellen.js` (neu): Funktion aus dem Graphen aufstellen (linear, Potenz, exponentiell)
- `einsetzen.js` (neu): `f([ ]) = [ ]` mit pulsierender 0 und Probe mit Lücken
- `umform.js` (erweitert): pq-/abc-Formel, `intro` für die Einsetz-Animation, `formula`; Konfetti vergrößert den Chat nicht mehr
- `README.md`, `skill/SKILL.md`, Demos, Purge-Workflow
- `_screenshots/`: Testbilder (hell, dunkel, 360 px mit Touch)
