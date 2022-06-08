"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChartBarIcon,
  DocumentTextIcon,
  ScissorsIcon,
  type ChartBarIcon as IconType,
} from "@heroicons/react/24/outline";
import { useTailwindBreakpoints } from "lib/hooks/useTailwindBreakpoints";

type Tip = {
  Icon: typeof IconType;
  quote: string;
  name: string;
  title: string;
};

const TIPS: Tip[] = [
  {
    Icon: ChartBarIcon,
    quote:
      'Lead every bullet with a strong verb and end it with a result. "Cut page load time by 48%" says far more than "worked on performance".',
    name: "Show impact",
    title: "Writing tip",
  },
  {
    Icon: ScissorsIcon,
    quote:
      "Recruiters skim a resume in seconds. Keep it to one page early in your career, and trim anything that doesn't support the role you want.",
    name: "Keep it focused",
    title: "Layout tip",
  },
  {
    Icon: DocumentTextIcon,
    quote:
      "Reuse the exact wording from the job posting for skills you really have. It helps both the ATS keyword match and the human reader.",
    name: "Mirror the job post",
    title: "ATS tip",
  },
];

const LG_TESTIMONIALS_CLASSNAMES = [
  "z-10",
  "translate-x-44 translate-y-24 opacity-40",
  "translate-x-32 -translate-y-28 opacity-40",
];
const SM_TESTIMONIALS_CLASSNAMES = ["z-10", "opacity-0", "opacity-0"];
const ROTATION_INTERVAL_MS = 8 * 1000; // 8s

export const ResumeTips = ({ children }: { children?: React.ReactNode }) => {
  const [testimonialsClassNames, setTestimonialsClassNames] = useState(
    LG_TESTIMONIALS_CLASSNAMES
  );
  const isHoveredOnTestimonial = useRef(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHoveredOnTestimonial.current) {
        setTestimonialsClassNames((preClassNames) => {
          return [preClassNames[1], preClassNames[2], preClassNames[0]];
        });
      }
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  const { isLg } = useTailwindBreakpoints();
  useEffect(() => {
    setTestimonialsClassNames(
      isLg ? LG_TESTIMONIALS_CLASSNAMES : SM_TESTIMONIALS_CLASSNAMES
    );
  }, [isLg]);

  return (
    <section className="mx-auto -mt-2 px-8 pb-24">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Tips for a resume that gets read
      </h2>
      <div className="mx-auto mt-10 h-[235px] max-w-lg lg:h-[400px] lg:pt-28">
        <div className="relative lg:ml-[-50px]">
          {TIPS.map(({ Icon, quote, name, title }, idx) => {
            const className = testimonialsClassNames[idx];
            return (
              <div
                key={idx}
                className={`bg-primary absolute max-w-lg rounded-[1.7rem] bg-opacity-30 shadow-md transition-all duration-1000 ease-linear ${className}`}
                onMouseEnter={() => {
                  if (className === "z-10") {
                    isHoveredOnTestimonial.current = true;
                  }
                }}
                onMouseLeave={() => {
                  if (className === "z-10") {
                    isHoveredOnTestimonial.current = false;
                  }
                }}
              >
                <figure className="m-1 flex gap-5 rounded-3xl bg-white p-5 text-gray-900 lg:p-7">
                  <div className="bg-primary hidden h-20 w-20 shrink-0 select-none items-center justify-center rounded-full lg:flex">
                    <Icon className="h-10 w-10 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <blockquote>
                      <p>{quote}</p>
                    </blockquote>
                    <figcaption className="mt-3">
                      <div className="hidden gap-2 lg:flex">
                        <div className="font-semibold">{name}</div>
                        <div
                          className="select-none text-gray-700"
                          aria-hidden="true"
                        >
                          •
                        </div>
                        <div className="text-gray-600">{title}</div>
                      </div>
                      <div className="flex gap-4 lg:hidden">
                        <div className="bg-primary flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-full">
                          <Icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{name}</div>
                          <div className="text-gray-600">{title}</div>
                        </div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
      {children}
    </section>
  );
};
