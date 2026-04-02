import { jsx as i } from "react/jsx-runtime";
import r from "./Logo.mjs";
import m from "./LogoInversion.mjs";
import t from "./LogoWithSquare.mjs";
import s from "./LogoWithSquareInversion.mjs";
import n from "./DevFamilyLogoInversionBW.mjs";
import f from "./SpinnerIcon.mjs";
const S = ({ name: e, ...a }) => {
  let o;
  switch (o = r, e) {
    case "dev-family-logo": {
      o = r;
      break;
    }
    case "dev-family-logo-inversion": {
      o = m;
      break;
    }
    case "logo-auth": {
      o = t;
      break;
    }
    case "logo-auth-inversion": {
      o = s;
      break;
    }
    case "dev-family-logo-inversion-bw": {
      o = n;
      break;
    }
    case "spinner": {
      o = f;
      break;
    }
  }
  return /* @__PURE__ */ i(o, { ...a });
};
export {
  S as default
};
