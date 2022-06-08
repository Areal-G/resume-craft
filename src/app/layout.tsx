import "globals.css";
import { TopNavBar } from "components/TopNavBar";

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3407";
const TITLE = "Resume Craft - Free Resume Builder and ATS Resume Checker";
const DESCRIPTION =
  "Resume Craft is a free resume builder that helps anyone create a polished, ATS-friendly resume in minutes, right in the browser. Already have a resume? Check how well applicant tracking systems can read it with the built-in parser.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Resume Craft",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Resume Craft",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
