import { useUserContext as e } from "./UserContext.mjs";
const s = () => {
  const {
    user: { identity: t }
  } = e();
  return t;
};
export {
  s as default
};
