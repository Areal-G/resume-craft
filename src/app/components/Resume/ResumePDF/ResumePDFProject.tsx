import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFEntryHeader,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeProject } from "lib/redux/types";

export const ResumePDFProject = ({
  heading,
  projects,
  themeColor,
}: {
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {projects.map(({ project, date, descriptions }, idx) => (
        <View
          key={idx}
          style={{
            ...styles.flexCol,
            marginTop: idx !== 0 ? spacing["2.5"] : 0,
          }}
        >
          <ResumePDFEntryHeader title={project} date={date} />
          {descriptions.length > 0 && (
            <View style={{ ...styles.flexCol, marginTop: spacing["1"] }}>
              <ResumePDFBulletList
                items={descriptions}
                themeColor={themeColor}
              />
            </View>
          )}
        </View>
      ))}
    </ResumePDFSection>
  );
};
