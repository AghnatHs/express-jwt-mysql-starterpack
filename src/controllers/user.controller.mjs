import UserService from "../services/user.service.mjs";

const UserController = {
  get: async (req, res, next) => {
    try {
      const result = await UserService.get(req);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const result = await UserService.register(req);
      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
  verify: async (req, res, next) => {
    try {
      const result = await UserService.verify(req);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
