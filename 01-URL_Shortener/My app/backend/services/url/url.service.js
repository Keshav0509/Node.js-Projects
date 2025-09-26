import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";

import db from "../../db/index.js";
import { urlsTable } from "../../models/url/url.model.js";
import { CustomError } from "../../utils/customError.util.js";

export const createShortenUrlService = async (data) => {
  try {
    const { code, url, userId } = data;

    const shortCode = !code?.trim() ? nanoid(6) : code.trim();
    const [result] = await db
      .insert(urlsTable)
      .values({
        shortCode,
        targetUrl: url,
        userId,
      })
      .returning({ id: urlsTable.id });

    return result.id;
  } catch (error) {
    throw new CustomError(
      `Unexpected error during create shorten url. Please try again later.`,
      error?.code
    );
  }
};

export const updateShortenUrlService = async (data) => {
  try {
    const { id, code, targetUrl, userId } = data;
    const shortCode = !code?.trim() ? nanoid(6) : code.trim();

    await db
      .update(urlsTable)
      .set({
        shortCode,
        targetUrl,
      })
      .where(and(eq(urlsTable.userId, userId), eq(urlsTable.id, id)));
  } catch (error) {
    throw new CustomError(
      `Unexpected error while getting shorten urls. Please try again later.`,
      error?.code
    );
  }
};

export const getAllShortenUrlService = async (id) => {
  try {
    if (!id) throw new CustomError(`User id missing`, 505);
    const result = await db
      .select({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
        createdAt: urlsTable.createdAt,
        updatedAt: urlsTable.updatedAt,
      })
      .from(urlsTable)
      .where(eq(urlsTable.userId, id));
    return result;
  } catch (error) {
    throw new CustomError(
      `Unexpected error while getting shorten urls. Please try again later.`,
      error?.code
    );
  }
};

export const deleteShortenUrlService = async (data) => {
  try {
    const { id, userId } = data;
    if (!id) throw new CustomError(`Url id is missing.`, 505);
    if (!userId) throw new CustomError(`User id is missing.`, 505);

    await db
      .delete(urlsTable)
      .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, userId)));
    return `success`;
  } catch (error) {
    throw new CustomError(
      `Unexpected error during URL deletion. Please try again later.`,
      error.code
    );
  }
};

export const findShortenUrlService = async (data) => {
  try {
    const { id, userId } = data;

    if (!id) return new CustomError(`Url id missing`, 400);
    if (!userId)
      throw new CustomError(`Authentication error. Please sign in again.`, 401);

    const result = await db
      .select({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
        createdAt: urlsTable.createdAt,
        updatedAt: urlsTable.updatedAt,
      })
      .from(urlsTable)
      .where(and(eq(urlsTable.userId, userId), eq(urlsTable.id, id)));
    return result;
  } catch (error) {
    throw new CustomError(
      `Unexpected error while finding shorten urls. Please try again later.`,
      error?.code
    );
  }
};
