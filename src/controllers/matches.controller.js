import {
  createMatchSchema,
  listMatchesQuerySchema,
} from "../validation/matches.validation.js";
import { db } from "../db/db.js";
import { matches } from "../db/schema.js";
import { desc } from "drizzle-orm";

const MAX_LIMIT = 100;
export const getMatches = async (req, res) => {
  const parsed = listMatchesQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      details: parsed.error.flatten(),
    });
  }

  const limit = Math.min(parsed.data.limit ?? 50, MAX_LIMIT);

  try {
    const data = await db
      .select()
      .from(matches)
      .orderBy(desc(matches.createdAt))
      .limit(limit);

    return res.json({ data }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to list matches",
    });
  }
};

export const handleCreateMatch = async (req, res) => {
  const parsed = createMatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      details: JSON.stringify(parsed.error),
    });
  }
  try {
    const [event] = await db.insert(matches).values({
      ...parsed.data,
      startTime: new Date(parsed.data.startTime),
    });
  } catch (e) {
    res.status(500).json({
      error: "Failed to create match",
      details: JSON.stringify(parsed.error),
    });
  }
};
