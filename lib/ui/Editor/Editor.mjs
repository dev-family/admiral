import { jsx as h } from "react/jsx-runtime";
import { useCallback as j, useMemo as r } from "react";
import { useTheme as N } from "../../theme/ThemeContext.mjs";
import E from "../../theme/useThemeVars.mjs";
import { Editor as w } from "@tinymce/tinymce-react";
import f from "classnames";
/* empty css             */
import { setupAutocompleters as P } from "./setup/autocompleters.mjs";
const V = ({
  size: e = "M",
  alert: p = !1,
  value: b,
  onChange: i,
  imageUploadUrl: c,
  onImageUpload: a,
  init: l,
  autocompleter: m,
  height: o = 300,
  locale: g,
  autoFocus: d,
  ..._
}) => {
  const { themeName: y } = N(), { varsInline: u } = E(), v = j(
    (t) => a(t.blob()),
    [a]
  ), s = r(
    () => ({
      height: o,
      setup: function(t) {
        t.on("PostRender", function() {
          const n = t.getContainer(), S = document.querySelector(
            "body > .tox.tox-tinymce-aux"
          );
          n.parentNode.appendChild(S);
        }), m && P(t, m);
      },
      auto_focus: d || "",
      menubar: !1,
      toolbar: "blocks bold italic underline strikethrough | link image charmap emoticons | alignleft aligncenter alignright alignjustify | bullist numlist blockquote table | pastetext removeformat fullscreen code",
      toolbar_mode: "floating",
      toolbar_sticky: !0,
      contextmenu: "link charmap emoticons",
      language: g,
      block_formats: "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6;",
      plugins: "link autolink lists code table image charmap emoticons fullscreen",
      paste_as_text: !0,
      link_rel_list: [
        { title: "None", value: null },
        { title: "No Follow", value: "nofollow" }
      ],
      valid_children: "+body[style]",
      advlist_bullet_styles: "default",
      custom_colors: !1,
      automatic_uploads: !0,
      images_upload_url: c,
      images_upload_handler: a ? v : void 0,
      table_appearance_options: !1,
      table_advtab: !1,
      table_cell_advtab: !1,
      table_row_advtab: !1,
      content_css: "/lib/tinymce/css/styles.css",
      formats: {
        alignleft: {
          selector: "p,h1,h2,h3,h4,h5,h6,div,img,tr,td,th",
          classes: "align-left"
        },
        aligncenter: {
          selector: "p,h1,h2,h3,h4,h5,h6,div,img,tr,td,th",
          classes: "align-center"
        },
        alignright: {
          selector: "p,h1,h2,h3,h4,h5,h6,div,img,tr,td,th",
          classes: "align-right"
        },
        alignfull: {
          selector: "p,h1,h2,h3,h4,h5,h6,div,img",
          classes: "align-justify"
        }
      },
      body_class: f("editor-body", {
        "editor-body--size-l": e === "L",
        "editor-body--size-s": e === "S",
        "editor-body--size-xs": e === "XS"
      }),
      content_style: `:root { ${u}; }`
    }),
    [u, e, c, o]
  ), k = r(() => typeof l == "function" ? l(s) : { ...s, ...l }, [l, s]), x = (t, n) => {
    i == null || i(t, n);
  }, H = r(() => ({ minHeight: o }), [o]);
  return /* @__PURE__ */ h("div", { style: H, className: f("editor", { "editor--alert": p }), children: /* @__PURE__ */ h(
    w,
    {
      tinymceScriptSrc: "/lib/tinymce/js/tinymce/tinymce.min.js",
      value: b,
      onEditorChange: x,
      init: k,
      ..._
    },
    y
  ) });
};
export {
  V as default
};
