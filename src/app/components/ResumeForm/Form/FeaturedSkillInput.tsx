import { XMarkIcon } from "@heroicons/react/24/outline";
import { INPUT_CLASS_NAME } from "components/ResumeForm/Form/InputGroup";
import { DEFAULT_THEME_COLOR } from "lib/redux/settingsSlice";
import { cx } from "lib/cx";

/**
 * Featured skills render as tags on the resume, so the input is a plain text
 * field. The rating is kept in the data model for backward compatibility with
 * resumes saved by earlier versions, but is no longer shown.
 */
export const FeaturedSkillInput = ({
  skill,
  rating,
  onChange,
  onRemove,
  placeholder,
  className,
  accentColor = DEFAULT_THEME_COLOR,
}: {
  skill: string;
  rating: number;
  onChange: (skill: string, rating: number) => void;
  onRemove?: () => void;
  placeholder: string;
  className?: string;
  accentColor?: string;
}) => (
  <div className={cx("relative flex items-center", className)}>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-3 h-2 w-2 rounded-full"
      style={{ backgroundColor: accentColor }}
    />
    <input
      type="text"
      value={skill}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(e) => onChange(e.target.value, rating)}
      className={cx(INPUT_CLASS_NAME, "pl-7", onRemove && "pr-9")}
    />
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        title="Remove skill"
        aria-label={`Remove ${skill || "skill"}`}
        className="absolute right-1.5 mt-1 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
      >
        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    )}
  </div>
);
