# Resume Craft

A free, private resume builder and ATS parser that runs entirely in your browser. Type on the left, watch the PDF update on the right, then check how an applicant tracking system will read it.

There is no sign-up and no server. Everything is kept in `localStorage`, PDFs are read and written in the browser, and the app keeps working offline once it has loaded.

## Highlights

- A live PDF preview that keeps up with your typing.
- Twelve accent colours, ten fonts, three text sizes, A4 or US Letter.
- Single-column, text-based PDFs that tracking systems read reliably.
- An ATS parser that shows what a tracking system would pick up, and what it would miss.
- Import an existing PDF to fill in the form for you.
- Nothing leaves your machine.

## Builder

The builder is a structured form next to a live preview of the page. It covers your profile, work experience, education, projects, skills and a custom section, and every keystroke reflows the resume on the right. Zoom controls and an autoscale option fit the page to your screen.

Sections can be reordered, hidden or renamed, and bullet points can be switched on or off per section. Up to 12 featured skills appear as tags at the top of the skills section.

The styling is meant to print well. The twelve accent colours are all deep 600 to 800 shades, so headings stay readable as text and in grayscale. You can pick from ten sans and serif font families, compact, standard or large text, and A4 or US Letter pages. The preview preloads the same font files the PDF embeds, so what you see on screen is what you download.

If you already have a resume, the import page can fill the form from a PDF, let you continue where you left off, or replace everything with the sample resume.

## Parser

Drop in any resume PDF and the parser shows the fields it extracts (name, email, phone, location, jobs, schools, projects and skills) in a table next to the PDF. Two example resumes, an engineer and an analyst, let you see it working without uploading anything.

It works in four steps:

1. Read the text items from the PDF with PDF.js.
2. Group them into lines.
3. Group the lines into sections.
4. Score every candidate line for each field.

The scoring weighs things like bold text, keywords, and patterns for email, phone and dates. Empty, invalid and upper-case `.PDF` files get clear error messages.

## Under the hood

The whole resume lives in two Redux slices, `resume` and `settings`. The form, the preview and the download all read from them, and a single store subscription writes every change to `localStorage`. On load, the builder reads it back.

One `ResumePDF` component does double duty. It produces the downloaded file through react-pdf, and for the live preview it renders as plain DOM inside an iframe, because react-pdf's own viewer lags while you type.

The parser is a chain of pure functions over typed text items: `read-pdf`, then line grouping, then section splitting, then the `extract-*` modules. Each field has a list of weighted features. Positive ones describe the field, negative ones describe its neighbours, so a line with an `@` is pushed away from being the name. The highest score wins.

Here is the name field's feature list, as it appears in the source:

```ts
// src/app/lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile.ts
const NAME_FEATURE_SETS: FeatureSet[] = [
  [matchOnlyLetterSpaceOrPeriod, 3, true],
  [isBold, 2],
  [hasLetterAndIsAllUpperCase, 2],
  // Match against other unique attributes
  [hasAt, -4], // Email
  [hasNumber, -4], // Phone
  [hasParenthesis, -4], // Phone
  [hasComma, -4], // Location
  [hasSlash, -4], // Url
  [has4OrMoreWords, -2], // Summary
];
```

PDF.js only runs on the client, and its optional `canvas` and `encoding` dependencies are aliased away in `next.config.js`, so the build needs no native modules.

The interface itself is kept quiet on purpose: one indigo accent (`#4338ca`) on a grey and white base, so the resume stays the focus. On phones the form takes the full width and the parser stacks the PDF above its results. There is only a light theme.

The stack is Next.js 14.2, React 18.2, TypeScript 5, Redux Toolkit 1.9, Tailwind CSS 3.3, @react-pdf/renderer 3 and pdfjs-dist 3, with Jest 29 for tests.

The source is laid out like this:

```
src/app/
├── page.tsx                 # home page
├── resume-builder/          # builder page
├── resume-import/           # import an existing PDF or start from a sample
├── resume-parser/           # ATS parser playground
├── components/              # form, live preview, dropzone, navigation
└── lib/
    ├── redux/               # resume and settings slices, localStorage persistence
    └── parse-resume-from-pdf/  # read → lines → sections → extract
public/
├── resume-example/          # example PDFs for the parser
└── fonts/                   # embedded PDF fonts
```

## Getting started

You need Node.js 20+ and npm.

```bash
git clone <repository-url> resume-craft
cd resume-craft
npm ci --ignore-scripts
npm run dev
```

Open `http://localhost:3000` and click **Try with a sample resume** to start from a complete example. No environment variables are needed.

`--ignore-scripts` skips the native build of the optional `canvas` package, which the app never uses.

To build for production:

```bash
npm run build
npm start
```

Or with Docker:

```bash
docker build -t resume-craft .
docker run -p 3000:3000 resume-craft
```

The build is a self-contained Node server (`output: 'standalone'`), so it also runs on Vercel, Netlify or any Node host.

The scripts you will use most:

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` / `npm run format:check` | Prettier write / check |
| `npm test` / `npm run test:ci` | Jest in watch mode / once |

## Contributing

Before opening a pull request, please run the same checks CI runs on every push:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test:ci
```

Formatting is handled by Prettier with the Tailwind plugin (`npm run format` fixes it). CI also makes a production build, so a broken import will show up there.

There are 13 Jest tests today. They cover profile extraction, subsection splitting (including lines that start with a merged bullet), the resume reducer and two small utilities. The parser stages are pure functions, so new extraction rules are easiest to add with a small test next to them.

Some things that would be welcome:

- More templates, such as two-column and compact.
- Several saved resumes, each with its own name.
- JSON export and import for backups.
- Keyboard reordering for sections and entries.
