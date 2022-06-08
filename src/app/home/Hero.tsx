import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { TrySampleResumeButton } from "components/TrySampleResumeButton";

export const Hero = () => {
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
        <h1 className="pb-2 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
          Create a professional
          <br />
          <span className="text-[color:var(--theme-purple)]">resume</span>{" "}
          easily
        </h1>
        <p className="mt-3 text-lg lg:mt-5 lg:text-xl">
          Build a polished, ATS-friendly resume in minutes, right in your
          browser
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:mt-14 lg:justify-start">
          <Link href="/resume-import" className="btn-primary">
            Create Resume <span aria-hidden="true">→</span>
          </Link>
          <TrySampleResumeButton />
        </div>
        <p className="ml-6 mt-3 text-sm text-gray-600">No sign up required</p>
        <p className="mt-3 text-sm text-gray-600 lg:mt-36">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            resume parser
          </Link>
        </p>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
        <AutoTypingResume />
      </div>
    </section>
  );
};
