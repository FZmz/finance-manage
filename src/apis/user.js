import { req,pretty } from "@/utils/request";

export const login = (user) => {
  return pretty(req.post("/user/login", {
    account: user.username,
    password: user.password,
  }));
};
export const logout = () => {
  return pretty(req.post("/user/logout"));
};

