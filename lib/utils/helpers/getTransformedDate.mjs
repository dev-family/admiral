import { formatISO as o } from "date-fns";
const s = ({ type: t, date: r }) => {
  switch (t) {
    case "iso":
      return o(r);
    case "utc":
      return r.toISOString();
  }
};
export {
  s as getTransformedDate
};
