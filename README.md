# bass-notes

A small web application for practicing bass guitar notes, chords and scales. It
is built with [React](https://react.dev/), [Vite](https://vitejs.dev/) and
TypeScript.

The project provides two tools:

- **TrainNotes** — repeatedly displays random notes and then shows their
  locations on the fretboard.
- **FindScale** — helps you find the notes of common chords and scales and
  displays them on the fretboard.

Each tool is available under its own URL:

- `http://localhost:5173/train-notes` for **TrainNotes**
- `http://localhost:5173/find-scale` for **FindScale**

## Running

Install dependencies first:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

Run tests with:

```bash
npm test
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run serve
```
