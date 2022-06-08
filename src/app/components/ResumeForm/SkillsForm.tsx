import { Form } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  InputGroupWrapper,
} from "components/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "components/ResumeForm/Form/FeaturedSkillInput";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  selectSkills,
  changeSkills,
  addFeaturedSkill,
  deleteFeaturedSkill,
  MAX_FEATURED_SKILLS,
} from "lib/redux/resumeSlice";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
  selectThemeColor,
  DEFAULT_THEME_COLOR,
} from "lib/redux/settingsSlice";

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const { featuredSkills, descriptions } = skills;
  const form = "skills";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const themeColor = useAppSelector(selectThemeColor) || DEFAULT_THEME_COLOR;

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Skills List"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleSkillsChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[4.5rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
        <InputGroupWrapper
          label="Featured Skills (Optional)"
          className="col-span-full"
        >
          <p className="mt-2 text-sm font-normal text-gray-600">
            Your top skills appear as highlighted tags at the start of the
            skills section. Add up to {MAX_FEATURED_SKILLS}, most relevant
            first.
          </p>
        </InputGroupWrapper>

        {featuredSkills.map(({ skill, rating }, idx) => (
          <FeaturedSkillInput
            key={idx}
            className="col-span-3"
            skill={skill}
            rating={rating}
            onChange={(newSkill, newRating) =>
              handleFeaturedSkillsChange(idx, newSkill, newRating)
            }
            placeholder={`Featured Skill ${idx + 1}`}
            accentColor={themeColor}
            onRemove={() => dispatch(deleteFeaturedSkill({ idx }))}
          />
        ))}
        <div className="col-span-full">
          {featuredSkills.length < MAX_FEATURED_SKILLS ? (
            <button
              type="button"
              onClick={() => dispatch(addFeaturedSkill())}
              className="flex items-center gap-1 rounded-md bg-white py-2 pl-2 pr-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PlusSmallIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Add skill
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              You have reached the maximum of {MAX_FEATURED_SKILLS} featured
              skills.
            </p>
          )}
        </div>
      </div>
    </Form>
  );
};
