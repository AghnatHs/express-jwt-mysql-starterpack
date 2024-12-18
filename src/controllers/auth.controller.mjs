import AuthService from "../services/auth.service.mjs";

const AuthController = {
  login: async (req, res, next) => {
    try {
      const result = await AuthService.login(req, res);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const result = await AuthService.logout(req, res);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const result = await AuthService.refresh(req, res);
      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
