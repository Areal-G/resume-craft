"use client";
import { useState, useEffect } from "react";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { cx } from "lib/cx";
import { Heading, Paragraph } from "components/documentation";
import { ResumeTable } from "resume-parser/ResumeTable";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { ResumeParserAlgorithmArticle } from "resume-parser/ResumeParserAlgorithmArticle";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/sample-resume-engineer.pdf",
    title: "Senior Software Engineer",
    description: "A4 size, Lato font and an indigo theme",
  },
  {
    fileUrl: "resume-example/sample-resume-analyst.pdf",
    title: "Data Analyst",
    description: "A4 size, Merriweather serif font and a teal theme",
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0].fileUrl;

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const [parseError, setParseError] = useState("");
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    let cancelled = false;
    async function parse() {
      try {
        const textItems = await readPdf(fileUrl);
        if (cancelled) return;
        setParseError("");
        setTextItems(textItems);
      } catch {
        if (cancelled) return;
        setTextItems([]);
        setParseError(
          "This PDF couldn't be read. It may be damaged, password-protected or a scanned image without selectable text."
        );
      }
    }
    parse();
    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  return (
    <main className="h-full w-full overflow-hidden">
      <div className="grid md:grid-cols-6">
        <div className="flex justify-center px-2 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
          <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
            <div className="aspect-h-[9.5] aspect-w-7">
              <iframe
                title="Resume PDF preview"
                src={`${fileUrl}#navpanes=0`}
                className="h-full w-full"
              />
            </div>
          </section>
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
        </div>
        <div className="flex px-6 text-gray-900 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
          <section className="max-w-[600px] grow">
            <Heading className="text-primary !mt-4">
              Resume Parser Playground
            </Heading>
            <Paragraph smallMarginTop={true}>
              This playground showcases the Resume Craft parser and its ability
              to parse information from a resume PDF. Click around the PDF
              examples below to observe different parsing results.
            </Paragraph>
            <div className="mt-3 flex gap-3">
              {RESUME_EXAMPLES.map((example, idx) => (
                <button
                  key={example.fileUrl}
                  type="button"
                  aria-pressed={example.fileUrl === fileUrl}
                  className={cx(
                    "flex-1 rounded-md border-2 px-4 py-3 text-left shadow-sm outline-none hover:bg-gray-50 focus-visible:bg-gray-50",
                    example.fileUrl === fileUrl
                      ? "border-[color:var(--theme-purple)]"
                      : "border-gray-300"
                  )}
                  onClick={() => setFileUrl(example.fileUrl)}
                >
                  <span className="block font-semibold">{example.title}</span>
                  <span className="mt-2 block text-sm text-gray-500">
                    {example.description}
                  </span>
                </button>
              ))}
            </div>
            <Paragraph>
              You can also{" "}
              <span className="font-semibold">add your resume below</span> to
              assess how well your resume would be parsed by similar Application
              Tracking Systems (ATS) used in job applications. The more
              information it can parse out, the better it indicates the resume
              is well formatted and easy to read. It is beneficial to have the
              name and email accurately parsed at the very least.
            </Paragraph>
            <div className="mt-3">
              <ResumeDropzone
                onFileUrlChange={(fileUrl) =>
                  setFileUrl(fileUrl || defaultFileUrl)
                }
                playgroundView={true}
              />
            </div>
            <Heading level={2} className="!mt-[1.2em]">
              Resume Parsing Results
            </Heading>
            {parseError && (
              <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {parseError}
              </p>
            )}
            <ResumeTable resume={resume} />
            <ResumeParserAlgorithmArticle
              textItems={textItems}
              lines={lines}
              sections={sections}
            />
            <div className="pt-24" />
          </section>
        </div>
      </div>
    </main>
  );
}
