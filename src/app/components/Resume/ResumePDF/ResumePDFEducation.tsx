import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
  ResumePDFEntryHeader,
} from "components/Resume/ResumePDF/common";
import {
  styles,
  spacing,
  TEXT_COLORS,
} from "components/Resume/ResumePDF/styles";
import type { ResumeEducation } from "lib/redux/types";

export const ResumePDFEducation = ({
  heading,
  educations,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  educations: ResumeEducation[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {educations.map(
        ({ school, degree, date, gpa, descriptions = [] }, idx) => {
          // Hide school name if it is the same as the previous school
          const hideSchoolName =
            idx > 0 && school === educations[idx - 1].school;
          const showDescriptions = descriptions.join() !== "";
          const degreeText = gpa
            ? `${degree} - ${Number(gpa) ? gpa + " GPA" : gpa}`
            : degree;

          return (
            <View
              key={idx}
              style={{
                ...styles.flexCol,
                marginTop: idx !== 0 ? spacing["2.5"] : 0,
              }}
            >
              {!hideSchoolName && (
                <ResumePDFEntryHeader title={school} date={date} />
              )}
              {degreeText && (
                <ResumePDFText
                  style={{ color: TEXT_COLORS.body, marginTop: spacing["0.5"] }}
                >
                  {degreeText}
                </ResumePDFText>
              )}
              {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                  <ResumePDFBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                    themeColor={themeColor}
                  />
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
