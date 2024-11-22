import { LESSONS_PER_TILE, units } from "~/utils/units";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LessonSlice = {
  lessonsCompleted: number;
  increaseLessonsCompleted: (by?: number) => void;
  jumpToUnit: (unitNumber: number) => void;
};

export const createLessonSlice: BoundStateCreator<LessonSlice> = (set) => ({
  lessonsCompleted: 0,
  increaseLessonsCompleted: (by = 1) =>
    set(({ lessonsCompleted }) => ({
      lessonsCompleted: lessonsCompleted + by,
    })),
  jumpToUnit: (unitNumber: number) =>
    set(({ lessonsCompleted }) => {
      const lessonsPerTile = LESSONS_PER_TILE;
      const totalLessonsToJumpToUnit = units
        .filter((unit) => unit.unitNumber < unitNumber)
        .map((unit) => unit.tiles.length * lessonsPerTile)
        .reduce((a, b) => a + b, 0);
      console.log('debug:jump:', {
        totalLessonsToJumpToUnit,
        lessonsCompleted,
        unitNumber,
        units,
      })
      return {
        lessonsCompleted: Math.max(lessonsCompleted, totalLessonsToJumpToUnit),
      };
    }),
});
