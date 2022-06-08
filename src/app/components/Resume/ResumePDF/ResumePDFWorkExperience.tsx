import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
  ResumePDFEntryHeader,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeWorkExperience } from "lib/redux/types";

/**
 * Entry layout follows the F-pattern recruiters scan in:
 *   Job Title (bold)                        Date (muted, right)
 *   Company (bold, accent color)
 *   • bullets
 */
export const ResumePDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}: {
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        // Hide company name if it is the same as the previous company
        const hideCompanyName =
          idx > 0 && company === workExperiences[idx - 1].company;

        return (
          <View
            key={idx}
            style={{
              ...styles.flexCol,
              marginTop: idx !== 0 ? spacing["2.5"] : 0,
            }}
          >
            <ResumePDFEntryHeader title={jobTitle} date={date} />
            {!hideCompanyName && company && (
              <ResumePDFText
                bold={true}
                style={{ color: themeColor, marginTop: spacing["0.5"] }}
              >
                {company}
              </ResumePDFText>
            )}
            {descriptions.length > 0 && (
              <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                <ResumePDFBulletList
                  items={descriptions}
                  themeColor={themeColor}
                />
              </View>
            )}
          </View>
        );
      })}
    </ResumePDFSection>
  );
};
