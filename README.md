# Resume Craft

Resume Craft is a free, private resume builder and ATS parser that runs entirely in your browser. You type on the left, a PDF updates on the right, and then you can check how a tracking system would read it.

## What is in it

- Resume Builder
  - The form
    - Profile, work experience, education, projects, skills and a custom section
    - Sections can be reordered, hidden or renamed
    - Bullet points can be turned on or off for each section
    - Up to 12 featured skills, shown as tags at the top of the skills section
  - The preview
    - Re-renders on every keystroke
    - Zoom controls
    - An autoscale option that fits the page to your screen
  - Styling
    - 12 theme colours
      - All deep 600 to 800 shades
      - Headings stay readable and print well in grayscale
    - 10 font families
      - Sans and serif
    - Text size
      - Compact
      - Standard
      - Large
    - Page size
      - A4
      - US Letter
  - Output
    - Single-column, text-based PDFs
    - Made with react-pdf with embedded fonts
    - Tracking systems parse them reliably
  - Saving
    - State is written to `localStorage` on every change
    - A reload never loses work
- ATS Parser
  - Input
    - Drop in any resume PDF
    - Or pick one of the two example PDFs
      - An engineer in Lato and indigo
      - An analyst in Merriweather and teal
  - Output
    - Name, email, phone and location
    - Jobs, schools and projects
    - Skills
    - Shown in a table next to the PDF
  - Errors
    - Empty files
    - Invalid files
    - Upper-case `.PDF` files
- Import
  - Import an existing PDF to fill the form automatically
  - Continue where you left off
  - Replace everything with the sample resume
- Home page
  - An auto-typing resume preview
  - Three steps
  - Four feature cards
  - Rotating resume tips
  - An FAQ

## Parser algorithm

The parser runs locally with PDF.js (with `isEvalSupported: false`) and works in four steps. First `read-pdf` turns the text items PDF.js gives back into positioned text, keeping each item's position and font. Then `group-text-items-into-lines` merges those items into lines, and `group-lines-into-sections` splits the lines wherever it finds a section heading. Finally the `extract-*` modules go through each section and score every candidate line for each field. The scoring is the interesting part. Each field has a list of weighted features. Positive features describe the field itself, such as an email regex, bold text or all caps, and negative features describe the other fields that live in the same section, so a line with an `@` in it is pushed away from being the name, a line with a number or parentheses is pushed away because it looks like a phone, a line with a comma looks like a location, a line with a slash looks like a URL and a line with four or more words looks like a summary. The scores are added up and the highest total wins, and if the highest score is not positive the field can come back empty instead of guessing. Every step is a pure function over typed text items, which makes it easy to test, and the tests cover profile extraction, subsection splitting (including lines that start with a merged bullet) and the resume reducer. A longer explainer of the algorithm also sits below the results on the parser page itself. The optional `canvas` and `encoding` dependencies of PDF.js are aliased away in `next.config.js`, so the build needs no native modules.

## Stack

- Next.js 14.2 with the App Router and `standalone` output
- React 18.2, Tailwind CSS 3.3 and Heroicons
- TypeScript 5
- Redux Toolkit 1.9, persisted to `localStorage`
- @react-pdf/renderer 3 and pdfjs-dist 3
- Jest 29 and Testing Library

## Setup

You need Node.js 20+ and npm.

```bash
git clone <repository-url> resume-craft
```

```bash
cd resume-craft
```

```bash
npm ci --ignore-scripts
```

```bash
npm run dev
```

Open `http://localhost:3000`.

To lint:

```bash
npm run lint
```

To type check:

```bash
npm run typecheck
```

To run the tests once:

```bash
npm run test:ci
```

To build:

```bash
npm run build
```

```bash
npm start
```

With Docker:

```bash
docker build -t resume-craft .
```

```bash
docker run -p 3000:3000 resume-craft
```
