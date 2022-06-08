"use client";
import { useState } from "react";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectResume, setResume } from "lib/redux/resumeSlice";
import { setSettings } from "lib/redux/settingsSlice";
import { SAMPLE_RESUME, getSampleSettings } from "lib/sample-resume";
import { deepClone } from "lib/deep-clone";

/**
 * Shown at the top of the builder while the resume is still empty, so a
 * first-time visitor can see a finished resume with one click.
 */
export const SampleResumeBanner = () => {
  const resume = useAppSelector(selectResume);
  const dispatch = useAppDispatch();
  const [dismissed, setDismissed] = useState(false);

  const isEmpty =
    !resume.profile.name &&
    !resume.profile.email &&
    resume.workExperiences.every((w) => !w.company && !w.jobTitle);

  if (!isEmpty || dismissed) return null;

  return (
    <div className="flex items-start gap-3 rounded-md border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900 shadow-sm">
      <SparklesIcon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
      <div className="grow">
        <p className="font-semibold">Starting from a blank page?</p>
        <p className="mt-1 text-indigo-800">
          Load a complete sample resume to see how every section looks, then
          edit or replace it with your own details.
        </p>
        <button
          type="button"
          className="mt-3 rounded-full bg-indigo-600 px-4 py-1.5 font-semibold text-white hover:bg-indigo-500"
          onClick={() => {
            dispatch(setResume(deepClone(SAMPLE_RESUME)));
            dispatch(setSettings(getSampleSettings()));
          }}
        >
          Load sample resume
        </button>
      </div>
      <button
        type="button"
        title="Dismiss"
        className="rounded-md p-1 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-600"
        onClick={() => setDismissed(true)}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
