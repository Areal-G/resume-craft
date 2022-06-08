"use client";
import { useRouter } from "next/navigation";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { saveStateToLocalStorage } from "lib/redux/local-storage";
import { SAMPLE_RESUME, getSampleSettings } from "lib/sample-resume";
import { deepClone } from "lib/deep-clone";
import { cx } from "lib/cx";

export const loadSampleResumeIntoStorage = () => {
  saveStateToLocalStorage({
    resume: deepClone(SAMPLE_RESUME),
    settings: getSampleSettings(),
  });
};

export const TrySampleResumeButton = ({
  className,
  text = "Try with a sample resume",
}: {
  className?: string;
  text?: string;
}) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className={cx(
        "outline-theme-purple inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-5 py-2 font-semibold text-gray-700 shadow-sm hover:bg-gray-50",
        className
      )}
      onClick={() => {
        loadSampleResumeIntoStorage();
        router.push("/resume-builder");
      }}
    >
      <SparklesIcon className="h-5 w-5 text-[color:var(--theme-purple)]" />
      {text}
    </button>
  );
};
