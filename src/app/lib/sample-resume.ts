import type { Resume } from "lib/redux/types";
import { initialSettings, type Settings } from "lib/redux/settingsSlice";
import { deepClone } from "lib/deep-clone";

/**
 * A rich, realistic example resume used for the "Try with a sample resume"
 * demo. The person, companies and numbers are fictional.
 */
export const SAMPLE_RESUME: Resume = {
  profile: {
    name: "Maya Okafor",
    summary:
      "Senior full-stack engineer with 7+ years building fast, accessible web products and mentoring growing teams.",
    email: "maya.okafor@example.com",
    phone: "(415) 555-0142",
    location: "San Francisco, CA",
    url: "linkedin.com/in/maya-okafor",
  },
  workExperiences: [
    {
      company: "Northwind Health",
      jobTitle: "Senior Software Engineer",
      date: "Mar 2022 - Present",
      descriptions: [
        "Lead 6 engineers rebuilding the patient scheduling platform in Next.js, cutting booking time from 4 minutes to 90 seconds",
        "Designed an event-driven appointment service handling 2.3M bookings a month at 99.98% uptime",
        "Cut page load time by 48%, lifting mobile conversion by 17%",
      ],
    },
    {
      company: "Brightline Analytics",
      jobTitle: "Software Engineer II",
      date: "Jun 2019 - Feb 2022",
      descriptions: [
        "Built a real-time dashboard builder in React and D3 used by 1,200+ enterprise customers",
        "Migrated a monolithic Rails API to Node.js services on AWS, saving $310K a year",
        "Shipped single sign-on (SAML/OIDC), unblocking 3 Fortune 500 deals",
      ],
    },
  ],
  educations: [
    {
      school: "University of Washington",
      degree: "B.S. in Computer Science",
      date: "Sep 2015 - Jun 2019",
      gpa: "3.82",
      descriptions: ["Dean's List; Teaching Assistant for Web Programming"],
    },
  ],
  projects: [
    {
      project: "Trailhead - open-source trip planner",
      date: "2023 - Present",
      descriptions: [
        "Collaborative itinerary app with live editing; 4.1K GitHub stars and 60+ contributors",
      ],
    },
    {
      project: "LintLens - VS Code extension",
      date: "2021",
      descriptions: [
        "Explains lint errors inline with suggested fixes; 28K installs, rated 4.8 stars",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "TypeScript", rating: 5 },
      { skill: "React", rating: 5 },
      { skill: "Node.js", rating: 4 },
      { skill: "PostgreSQL", rating: 4 },
      { skill: "AWS", rating: 4 },
      { skill: "GraphQL", rating: 3 },
    ],
    descriptions: [
      "Also: Python, Go, Redis, Docker, Terraform, Playwright, CI/CD",
      "Certified AWS Solutions Architect - Associate (2023)",
    ],
  },
  custom: {
    descriptions: [],
  },
};

export const getSampleSettings = (): Settings => {
  const settings = deepClone(initialSettings);
  settings.themeColor = "#4338ca";
  settings.fontFamily = "Lato";
  settings.formToHeading.projects = "PROJECTS";
  return settings;
};
