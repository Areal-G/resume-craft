import Image from "next/image";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureAtsSrc from "public/assets/feature-ats.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featurePreviewSrc from "public/assets/feature-preview.svg";

const FEATURES = [
  {
    src: featureFreeSrc,
    title: "Free to Use",
    text: "Every template option, font and export is free. No watermarks, no paywalls and no trial that runs out the night before a deadline",
  },
  {
    src: featureAtsSrc,
    title: "ATS-Friendly",
    text: "Clean single-column layouts that applicant tracking systems read reliably, plus a built-in parser to check your resume before you apply",
  },
  {
    src: featurePrivacySrc,
    title: "Private by Design",
    text: "No sign up and no servers. Your resume is stored only in your browser, so you stay in full control of your data",
  },
  {
    src: featurePreviewSrc,
    title: "Live PDF Preview",
    text: "See a pixel-perfect preview as you type, switch fonts, colors and page sizes in one click, then download a polished PDF",
  },
];

export const Features = () => {
  return (
    <section className="py-16 lg:py-36">
      <div className="mx-auto lg:max-w-4xl">
        <dl className="grid grid-cols-1 justify-items-center gap-y-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-16">
          {FEATURES.map(({ src, title, text }) => (
            <div className="px-2" key={title}>
              <div className="relative w-96 self-center pl-16">
                <dt className="text-2xl font-bold">
                  <Image
                    src={src}
                    className="absolute left-0 top-1 h-12 w-12"
                    alt="Feature icon"
                  />
                  {title}
                </dt>
                <dd className="mt-2">{text}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
