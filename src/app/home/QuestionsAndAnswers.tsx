import Link from "next/link";

const QAS = [
  {
    question: "Q1. Why use a resume builder instead of a document template?",
    answer: (
      <>
        <p>
          A document template means formatting everything by hand: copying
          sections, fixing spacing and keeping bullet points and fonts
          consistent. Small slips are easy to make and hard to spot.
        </p>
        <p>
          Resume Craft handles the layout for you. You focus on the content, and
          it keeps every section consistently formatted. Changing the font,
          size, color or page size takes a single click, and the preview updates
          instantly.
        </p>
      </>
    ),
  },
  {
    question: "Q2. Will my resume work with applicant tracking systems (ATS)?",
    answer: (
      <>
        <p>
          Resume Craft uses a clean, top-down single-column layout with standard
          section headings, which is the format ATS software reads most
          reliably. It deliberately leaves out things that tend to confuse
          parsers, such as multi-column layouts, text in images and profile
          photos.
        </p>
        <p>
          You can also check any existing resume with the{" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            resume parser
          </Link>
          . It shows exactly which fields a parser can read, so you can fix
          problems before you apply.
        </p>
      </>
    ),
  },
  {
    question: "Q3. Where is my data stored?",
    answer: (
      <p>
        Only in your browser. Resume Craft has no accounts and no backend, and
        your resume never gets uploaded anywhere. PDFs you import are read
        locally on your device. Clearing your browser data removes your saved
        resume, so download a PDF copy of the final version.
      </p>
    ),
  },
  {
    question: "Q4. Should I choose A4 or Letter?",
    answer: (
      <p>
        A4 is the standard paper size in most countries and is selected by
        default. If you are applying for jobs in the United States or Canada,
        switch to Letter in the theme settings at the bottom of the builder.
        Your content reflows automatically.
      </p>
    ),
  },
];

export const QuestionsAndAnswers = () => {
  return (
    <section className="mx-auto max-w-3xl divide-y divide-gray-300 lg:mt-4 lg:px-2">
      <h2 className="text-center text-3xl font-bold">Questions & Answers</h2>
      <div className="mt-6 divide-y divide-gray-300">
        {QAS.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <h3 className="font-semibold leading-7">{question}</h3>
            <div className="mt-3 grid gap-2 leading-7 text-gray-600">
              {answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
