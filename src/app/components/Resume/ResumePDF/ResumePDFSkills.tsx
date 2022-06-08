import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumeSkillTag,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeSkills } from "lib/redux/types";

/**
 * Featured skills render as tags rather than proficiency dots: self-rated
 * dots are subjective to recruiters and unreadable to ATS, tags are plain text.
 */
export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  skills: ResumeSkills;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions, featuredSkills } = skills;
  const featuredSkillsWithText = featuredSkills.filter((item) => item.skill);

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {featuredSkillsWithText.length > 0 && (
        <View
          style={{
            ...styles.flexRow,
            flexWrap: "wrap",
            gap: spacing["1.5"],
            marginBottom: descriptions.length > 0 ? spacing["1"] : 0,
          }}
        >
          {featuredSkillsWithText.map(({ skill }, idx) => (
            <ResumeSkillTag key={idx} skill={skill} themeColor={themeColor} />
          ))}
        </View>
      )}
      {descriptions.length > 0 && (
        <View style={{ ...styles.flexCol }}>
          <ResumePDFBulletList
            items={descriptions}
            showBulletPoints={showBulletPoints}
            themeColor={themeColor}
          />
        </View>
      )}
    </ResumePDFSection>
  );
};
