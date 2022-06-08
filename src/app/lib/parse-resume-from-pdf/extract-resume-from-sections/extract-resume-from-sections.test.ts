import {
  matchOnlyLetterSpaceOrPeriod,
  matchEmail,
  matchPhone,
  matchUrl,
} from "lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";
import type { TextItem } from "lib/parse-resume-from-pdf/types";

const makeTextItem = (text: string) =>
  ({
    text,
  } as TextItem);

describe("extract-profile tests - ", () => {
  it("Name", () => {
    expect(matchOnlyLetterSpaceOrPeriod(makeTextItem("Jane A. Doe"))![0]).toBe(
      "Jane A. Doe"
    );
  });

  it("Email", () => {
    expect(matchEmail(makeTextItem("  hello@example.org  "))![0]).toBe(
      "hello@example.org"
    );
  });

  it("Phone", () => {
    expect(matchPhone(makeTextItem("  (123)456-7890  "))![0]).toBe(
      "(123)456-7890"
    );
  });

  it("Url", () => {
    expect(matchUrl(makeTextItem("  linkedin.com/in/jane-doe  "))![0]).toBe(
      "linkedin.com/in/jane-doe"
    );
    expect(matchUrl(makeTextItem("hello@example.org"))).toBeFalsy();
  });
});
