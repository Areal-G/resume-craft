# Resume Craft

Resume Craft is a small resume builder and ATS parser that runs entirely in the browser. It can turn a structured form (profile, work experience, education, projects, skills and a custom section) into a clean, single-column PDF that updates as you type, it can restyle that page with twelve theme colours, ten fonts, three text sizes and A4 or US Letter paper, it can reorder, hide or rename sections, it can import an existing PDF resume to fill in the form for you, and it can read any resume PDF back and show which fields an applicant tracking system would pick out of it: name, email, phone, location, jobs, schools, projects and skills. There is no sign-up and no server. Everything you type is kept in `localStorage`, so a reload never loses your work, and once the page has loaded it keeps working offline. Under the hood it is Next.js, React, Redux Toolkit and Tailwind CSS, with react-pdf writing the PDF and PDF.js reading it back, both in the browser.

## How to run

You need Node.js 20+ and npm.

```bash
git clone <repository-url> resume-craft
cd resume-craft
npm ci --ignore-scripts
npm run dev
```

Then open `http://localhost:3000`. No environment variables are needed.

The `--ignore-scripts` flag skips the native build of the optional `canvas` package, which the app never uses.

To run the tests once:

```bash
npm run test:ci
```

To make a production build and serve it:

```bash
npm run build
npm start
```