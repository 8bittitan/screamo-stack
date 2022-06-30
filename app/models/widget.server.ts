import type { Widget } from '@prisma/client';
import type { CreateWidgetParams } from '~/schemas/widget.server';

import { prisma } from '~/utils/db.server';
import { createWidgetSchema } from '~/schemas/widget.server';

export const widgetsForUser = async (userId: string): Promise<Widget[]> => {
  const widgets = await prisma.widget.findMany({
    where: {
      userId,
    },
  });
  return widgets;
};

export const getWidgetForUser = async (
  widgetId: Widget['id'],
  userId: string,
): Promise<Widget | null> => {
  try {
    const widget = await prisma.widget.findFirst({
      where: {
        id: widgetId,
        userId,
      },
    });

    return widget;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createWidget = async (widgetParams: CreateWidgetParams) => {
  try {
    const data = createWidgetSchema.parse(widgetParams);

    const widget = await prisma.widget.create({
      data,
    });

    return widget;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteWidget = async (
  widgetId: Widget['id'],
  userId: string,
): Promise<boolean | void> => {
  try {
    const widget = await getWidgetForUser(widgetId, userId);

    if (!widget) {
      throw new Error('Not authorized to delete this widget');
    }

    await prisma.widget.delete({
      where: {
        id: widget.id,
      },
    });

    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
