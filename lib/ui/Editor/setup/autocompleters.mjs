function O(e, t) {
  const r = Array.isArray(t) ? t : [t], a = (n, i, c) => {
    e.selection.setRng(i), e.insertContent(c), n.hide();
  }, m = (n, i) => n.filter((c) => c.text.toLowerCase().indexOf(i.toLowerCase()) !== -1);
  r.forEach((n) => {
    const {
      id: i,
      trigger: c = "@",
      minCharsToTrigger: u = 0,
      items: o,
      highlightOnSearch: l = !0,
      filterOnInput: d = !1,
      mode: h = "cardmenuitem",
      includeValueInTitle: p = !0,
      columns: f = 1
    } = n;
    e.ui.registry.addAutocompleter(i, {
      ch: c,
      minChars: u,
      columns: f,
      onAction: a,
      fetch: (g) => new Promise((y) => {
        const C = (d ? m(o, g) : o).map((s) => {
          switch (h) {
            case "cardmenuitem":
              return I(s, p);
            case "autocompleteitem":
              return A(s);
            default:
              return null;
          }
        });
        y(C);
      }),
      ...l && { highlightOn: ["item_name"] }
    });
  });
}
function A({ value: e, text: t, icon: r }) {
  return {
    type: "autocompleteitem",
    value: e,
    text: t,
    icon: r ?? e
  };
}
function I({ value: e, text: t }, r) {
  return {
    type: "cardmenuitem",
    value: e,
    label: t,
    items: [
      {
        type: "cardcontainer",
        direction: "vertical",
        items: [
          {
            type: "cardtext",
            text: r ? `${t} ${e}` : `${t}`,
            name: "item_name"
          }
        ]
      }
    ]
  };
}
export {
  O as setupAutocompleters
};
