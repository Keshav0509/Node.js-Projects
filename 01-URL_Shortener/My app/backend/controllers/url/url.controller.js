import {
  createShortURLPostRequestUserSchema,
  updateShortenURLPatchRequestUserSchema,
  deleteShortenURLDeleteRequestUserSchema,
} from "../../validations/request.validation.js";
import {
  createShortenUrlService,
  getAllShortenUrlService,
  updateShortenUrlService,
  deleteShortenUrlService,
} from "../../services/url/url.service.js";

export const createShortURL = async (req, res) => {
  try {
    const parsed = await createShortURLPostRequestUserSchema.safeParseAsync(
      req.body
    );

    if (!parsed.success) {
      return res.status(400).json({
        error: `Validation failed during create short url.`,
        details: parsed.error.format(),
      });
    }

    const data = parsed.data;
    data.userId = req.user.id;
    // console.log("data for create shorten code (controller function):", data);
    const result = await createShortenUrlService(data);

    return res.status(200).json({ status: `success`, id: result });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      code: error.code,
    });
  }
};

export const getAllShortenUrl = async (req, res) => {
  try {
    const data = await getAllShortenUrlService(req.user.id);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message, code: error.code });
  }
};

export const updateShortenUrl = async (req, res) => {
  try {
    const urlId = req.params.id;
    if (!urlId) {
      return res.status(401).json({ error: `URL id is missing.!` });
    }

    const parsed = await updateShortenURLPatchRequestUserSchema.safeParseAsync(
      req.body
    );

    if (!parsed.success) {
      return res.status(400).json({
        error: `Validation failed during update short url.`,
        details: parsed.error.format(),
      });
    }

    const data = parsed.data;
    data.id = urlId;
    data.userId = req.user.id;

    await updateShortenUrlService(data);

    return res.status(200).json({ status: `success` });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      code: error.code,
    });
  }
};

export const deleteShortenUrl = async (req, res) => {
  try {
    const id = req.params.id;

    const parsed =
      await deleteShortenURLDeleteRequestUserSchema.safeParseAsync(id);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: `Invalid Shorten url id. Please try again later.` });
    }

    const { data } = parsed;
    data.userId = req.user.id;

    const result = await deleteShortenUrlService(data);

    return res.status(200).json({ status: result });
  } catch (error) {
    return res.status(500).json({ error: error.message, code: error.code });
  }
};

export const findShortenUrl = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id)
      return res
        .status(400)
        .json({ error: `Url id is missing. Please try again later` });

    const data = {};
    data.id = id;
    data.userId = req.user.id;

    const result = await getAllShortenUrlService(data);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message, code: error.code });
  }
};
