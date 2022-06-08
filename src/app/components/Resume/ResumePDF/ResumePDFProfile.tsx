import { View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import {
  styles,
  spacing,
  TEXT_COLORS,
} from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location } = profile;
  const iconProps = { email, phone, location, url };

  return (
    <ResumePDFSection style={{ marginTop: 0, gap: 0 }}>
      <ResumePDFText
        bold={true}
        style={{
          fontSize: "24pt",
          lineHeight: "1.15",
          letterSpacing: "-0.2pt",
          color: TEXT_COLORS.heading,
        }}
      >
        {name}
      </ResumePDFText>
      {summary && (
        <ResumePDFText
          style={{
            marginTop: spacing["1.5"],
            lineHeight: "1.4",
            color: TEXT_COLORS.muted,
          }}
        >
          {summary}
        </ResumePDFText>
      )}
      <View
        style={{
          ...styles.flexRow,
          flexWrap: "wrap",
          columnGap: 15,
          rowGap: 3,
          marginTop: spacing["3"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === "url") {
            if (value.includes("github")) {
              iconType = "url_github";
            } else if (value.includes("linkedin")) {
              iconType = "url_linkedin";
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": {
                src = `mailto:${value}`;
                break;
              }
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                break;
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>
            );
          };

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1.5"],
              }}
            >
              <ResumePDFIcon type={iconType} isPDF={isPDF} color={themeColor} />
              <Wrapper>
                <ResumePDFText style={{ color: TEXT_COLORS.body }}>
                  {value}
                </ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};
