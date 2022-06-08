import { Text, View, Link } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import {
  styles,
  spacing,
  tint,
  TEXT_COLORS,
} from "components/Resume/ResumePDF/styles";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";

export const ResumePDFSection = ({
  themeColor,
  heading,
  style = {},
  children,
}: {
  themeColor?: string;
  heading?: string;
  style?: Style;
  children: React.ReactNode;
}) => (
  <View
    style={{
      ...styles.flexCol,
      gap: spacing["2"],
      marginTop: spacing["5"],
      ...style,
    }}
  >
    {heading && (
      <View style={{ ...styles.flexCol }}>
        {/* Section titles stay bold + uppercase: the resume parser relies on it */}
        <Text
          style={{
            fontWeight: "bold",
            // Keep tracking subtle: wide letter-spacing makes PDF text extract as
            // "W O R K", which breaks ATS parsing
            letterSpacing: "0.3pt",
            color: themeColor || TEXT_COLORS.heading,
          }}
          debug={DEBUG_RESUME_PDF_FLAG}
        >
          {heading.toUpperCase()}
        </Text>
        <View
          style={{
            marginTop: spacing["1"],
            height: "0.75pt",
            backgroundColor: TEXT_COLORS.rule,
          }}
        />
      </View>
    )}
    {children}
  </View>
);

/** Left: bold title. Right: muted date. Used by every entry type. */
export const ResumePDFEntryHeader = ({
  title,
  date,
}: {
  title: string;
  date: string;
}) => (
  <View style={{ ...styles.flexRowBetween, alignItems: "flex-end" }}>
    <ResumePDFText
      bold={true}
      style={{ color: TEXT_COLORS.heading, flexGrow: 1, flexBasis: 0 }}
    >
      {title}
    </ResumePDFText>
    {date && (
      <ResumePDFText
        style={{ color: TEXT_COLORS.muted, marginLeft: spacing["3"] }}
      >
        {date}
      </ResumePDFText>
    )}
  </View>
);

export const ResumePDFText = ({
  bold = false,
  themeColor,
  style = {},
  children,
}: {
  bold?: boolean;
  themeColor?: string;
  style?: Style;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={{
        color: themeColor || DEFAULT_FONT_COLOR,
        fontWeight: bold ? "bold" : "normal",
        ...style,
      }}
      debug={DEBUG_RESUME_PDF_FLAG}
    >
      {children}
    </Text>
  );
};

export const ResumePDFBulletList = ({
  items,
  showBulletPoints = true,
  themeColor,
}: {
  items: string[];
  showBulletPoints?: boolean;
  themeColor?: string;
}) => {
  return (
    <>
      {items.map((item, idx) => (
        <View
          style={{ ...styles.flexRow, marginTop: idx > 0 ? spacing["0.5"] : 0 }}
          key={idx}
        >
          {showBulletPoints && (
            <ResumePDFText
              style={{
                width: spacing["3"],
                paddingLeft: spacing["0.5"],
                lineHeight: "1.4",
                color: themeColor || TEXT_COLORS.body,
              }}
              bold={true}
            >
              {"•"}
            </ResumePDFText>
          )}
          {/* A breaking change was introduced causing text layout to be wider than node's width
              https://github.com/diegomura/react-pdf/issues/2182. flexGrow & flexBasis fixes it */}
          <ResumePDFText
            style={{
              lineHeight: "1.4",
              flexGrow: 1,
              flexBasis: 0,
              color: TEXT_COLORS.body,
            }}
          >
            {item}
          </ResumePDFText>
        </View>
      ))}
    </>
  );
};

export const ResumePDFLink = ({
  src,
  isPDF,
  children,
}: {
  src: string;
  isPDF: boolean;
  children: React.ReactNode;
}) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: "none" }}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={src}
      style={{ textDecoration: "none" }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

/** A featured skill rendered as a soft tag (text, so ATS can still read it) */
export const ResumeSkillTag = ({
  skill,
  themeColor,
}: {
  skill: string;
  themeColor: string;
}) => (
  <View
    style={{
      paddingTop: "1.5pt",
      paddingBottom: "2pt",
      paddingLeft: spacing["2"],
      paddingRight: spacing["2"],
      borderRadius: "3pt",
      backgroundColor: tint(themeColor, 0.88),
    }}
  >
    <ResumePDFText bold={true} style={{ color: themeColor }}>
      {skill}
    </ResumePDFText>
  </View>
);
