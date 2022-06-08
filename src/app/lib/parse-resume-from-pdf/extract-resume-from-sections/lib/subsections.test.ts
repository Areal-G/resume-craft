import { divideSectionIntoSubsections } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/subsections";
import type { Line, Lines } from "lib/parse-resume-from-pdf/types";

const line = (text: string, y: number, bold = false): Line => [
  {
    text,
    x: 0,
    y,
    width: 100,
    height: 10,
    fontName: bold ? "Lato-Bold" : "Lato-Regular",
    hasEOL: false,
  },
];

const texts = (subsections: Lines[]) =>
  subsections.map((lines) => lines.map((l) => l[0].text));

describe("divideSectionIntoSubsections", () => {
  it("starts a new subsection when the line gap is unusually large", () => {
    const lines = [
      line("Senior Engineer", 700, true),
      line("Northwind Health", 688),
      line("•Shipped things", 676),
      line("•Shipped more", 664),
      line("Software Engineer", 640, true),
      line("Brightline", 628),
      line("•Built dashboards", 616),
    ];
    expect(texts(divideSectionIntoSubsections(lines))).toEqual([
      [
        "Senior Engineer",
        "Northwind Health",
        "•Shipped things",
        "•Shipped more",
      ],
      ["Software Engineer", "Brightline", "•Built dashboards"],
    ]);
  });

  it("keeps a bullet merged with its text in the current subsection", () => {
    // Extra space before the first bullet must not split the entry
    const lines = [
      line("University of Washington", 700, true),
      line("B.S. Computer Science", 688),
      line("•Dean's List", 664),
      line("Teaching Assistant", 652),
    ];
    expect(divideSectionIntoSubsections(lines)).toHaveLength(1);
  });

  it("falls back to bold lines when gaps are uniform", () => {
    const lines = [
      line("Acme Corp", 700, true),
      line("Did work", 688),
      line("Globex", 676, true),
      line("Did more work", 664),
    ];
    expect(texts(divideSectionIntoSubsections(lines))).toEqual([
      ["Acme Corp", "Did work"],
      ["Globex", "Did more work"],
    ]);
  });
});
