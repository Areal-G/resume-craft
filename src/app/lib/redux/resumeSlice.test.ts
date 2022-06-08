import reducer, {
  addFeaturedSkill,
  deleteFeaturedSkill,
  initialResumeState,
  MAX_FEATURED_SKILLS,
} from "lib/redux/resumeSlice";

describe("resumeSlice featured skills", () => {
  it("adds an empty featured skill", () => {
    const before = initialResumeState.skills.featuredSkills.length;
    const state = reducer(initialResumeState, addFeaturedSkill());
    expect(state.skills.featuredSkills).toHaveLength(before + 1);
    expect(state.skills.featuredSkills.at(-1)).toEqual({
      skill: "",
      rating: 4,
    });
  });

  it(`never grows past ${MAX_FEATURED_SKILLS} skills`, () => {
    let state = initialResumeState;
    for (let i = 0; i < MAX_FEATURED_SKILLS + 5; i++) {
      state = reducer(state, addFeaturedSkill());
    }
    expect(state.skills.featuredSkills).toHaveLength(MAX_FEATURED_SKILLS);
  });

  it("removes the featured skill at the given index", () => {
    const start = {
      ...initialResumeState,
      skills: {
        ...initialResumeState.skills,
        featuredSkills: ["TypeScript", "React", "Node.js"].map((skill) => ({
          skill,
          rating: 4,
        })),
      },
    };
    const state = reducer(start, deleteFeaturedSkill({ idx: 1 }));
    expect(state.skills.featuredSkills.map((s) => s.skill)).toEqual([
      "TypeScript",
      "Node.js",
    ]);
  });
});
