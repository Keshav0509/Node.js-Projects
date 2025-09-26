import {
  getAllUsersService,
  getAllURLsService,
} from "../../services/admin/admin.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const data = await getAllUsersService();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: error?.code });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const data = await getAllURLsService();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: error?.code });
  }
};
