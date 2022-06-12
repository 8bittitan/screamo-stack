import type { Vital } from '@prisma/client';

export type GroupedByName = Record<string, Vital[]>;

export const groupByName = (vitals: Vital[]): GroupedByName => {
  return vitals.reduce((acc: GroupedByName, cur): GroupedByName => {
    if (!acc[cur.name]) {
      acc[cur.name] = [];
    }

    acc[cur.name].push(cur);
    return acc;
  }, {});
};

export const estimatedMax = (vitals: Vital[]): number =>
  vitals.reduce((max, curr) => {
    if (curr.value > max) {
      return curr.value;
    }

    return max;
  }, 0);
