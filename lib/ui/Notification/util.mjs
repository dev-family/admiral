function r(a, e, o) {
  let t;
  switch (a) {
    case "top":
      t = {
        left: "50%",
        transform: "translateX(-50%)",
        right: "auto",
        top: e,
        bottom: "auto"
      };
      break;
    case "topLeft":
      t = {
        left: 0,
        top: e,
        bottom: "auto"
      };
      break;
    case "topRight":
      t = {
        right: 0,
        top: e,
        bottom: "auto"
      };
      break;
    case "bottom":
      t = {
        left: "50%",
        transform: "translateX(-50%)",
        right: "auto",
        top: "auto",
        bottom: o
      };
      break;
    case "bottomLeft":
      t = {
        left: 0,
        top: "auto",
        bottom: o
      };
      break;
    default:
      t = {
        right: 0,
        top: "auto",
        bottom: o
      };
      break;
  }
  return t;
}
function n(a) {
  return {
    motionName: `${a}-fade`,
    motionAppear: !0,
    motionEnter: !0,
    motionLeave: !0,
    // This handler makes rc-motion inject `transition: none` inline during STEP_START so the
    // browser commits the invisible initial state before STEP_ACTIVE fires the CSS transition.
    // NB: CSSMotionList does not forward onEnterPrepare (it is absent from its
    // MOTION_PROP_NAMES) — passing it would leak the prop onto the DOM node.
    onAppearPrepare: () => {
    },
    onLeaveStart: (e) => {
      const { offsetHeight: o } = e;
      return { height: o };
    },
    onLeaveActive: () => ({ height: 0, opacity: 0, margin: 0 })
  };
}
export {
  n as getMotion,
  r as getPlacementStyle
};
