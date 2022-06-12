import type { Widget } from '@prisma/client';

import { prisma } from '~/utils/db.server';

export const widgetsForUser = async (userId: string): Promise<Widget[]> => {
  const widgets = await prisma.widget.findMany({
    where: {
      userId,
    },
  });
  return widgets;
};
