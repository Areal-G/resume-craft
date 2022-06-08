import { useEffect, useState } from "react";
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PX,
} from "lib/constants";
import { getPxPerRem } from "lib/get-px-per-rem";
import { CSS_VARIABLES } from "globals-css";

/**
 * useSetDefaultScale sets the default scale of the resume on load.
 *
 * It computes the scale based on current screen height and derives the default
 * resume height by subtracting the screen height from the total heights of top
 * nav bar, resume control bar, and resume top & bottom padding.
 *
 * The scale is also capped by the width of the preview column (half the
 * screen from md up, the full screen below it). Fitting height alone made the
 * page wider than its column on phones and on tall, narrow windows.
 */
export const useSetDefaultScale = ({
  setScale,
  documentSize,
}: {
  setScale: (scale: number) => void;
  documentSize: string;
}) => {
  const [scaleOnResize, setScaleOnResize] = useState(true);

  useEffect(() => {
    const getDefaultScale = () => {
      const screenHeightPx = window.innerHeight;
      const PX_PER_REM = getPxPerRem();
      const screenHeightRem = screenHeightPx / PX_PER_REM;
      const topNavBarHeightRem = parseFloat(
        CSS_VARIABLES["--top-nav-bar-height"]
      );
      const resumeControlBarHeight = parseFloat(
        CSS_VARIABLES["--resume-control-bar-height"]
      );
      const resumePadding = parseFloat(CSS_VARIABLES["--resume-padding"]);
      const topAndBottomResumePadding = resumePadding * 2;
      const defaultResumeHeightRem =
        screenHeightRem -
        topNavBarHeightRem -
        resumeControlBarHeight -
        topAndBottomResumePadding;
      const resumeHeightPx = defaultResumeHeightRem * PX_PER_REM;
      const height = documentSize === "A4" ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;
      const width = documentSize === "A4" ? A4_WIDTH_PX : LETTER_WIDTH_PX;

      // Mirrors the layout: md+ splits the screen in half, then a spacer of up
      // to 50px and the resume padding on both sides; phones keep 16px each side.
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      const resumeWidthPx = isMd
        ? window.innerWidth / 2 - 50 - resumePadding * 2 * PX_PER_REM
        : window.innerWidth - 32;

      const fit = Math.min(resumeHeightPx / height, resumeWidthPx / width);
      // Round down so rounding can never push the page past its column.
      return Math.floor(fit * 100) / 100;
    };

    const setDefaultScale = () => {
      const defaultScale = getDefaultScale();
      setScale(defaultScale);
    };

    if (scaleOnResize) {
      setDefaultScale();
      window.addEventListener("resize", setDefaultScale);
    }

    return () => {
      window.removeEventListener("resize", setDefaultScale);
    };
  }, [setScale, scaleOnResize, documentSize]);

  return { scaleOnResize, setScaleOnResize };
};
