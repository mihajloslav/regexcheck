# Regex Check

Mala Next.js aplikacija za live proveru regex-a.

## Šta radi

- prima regex u prvom polju
- otključava drugi input tek kada je regex unet
- proverava tekst na svaku izmenu
- prikazuje da li tekst prolazi check
- za prazan unos prikazuje `prazan string`
- responsive je za mobilni, tablet i desktop

## Pokretanje

```bash
npm install
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

## Produkcijski build

```bash
npm run build
npm start
```

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

## Napomena

Aplikacija radi kao full-string match, što znači da regex mora da odgovara celom tekstu, ne samo delu unosa.
