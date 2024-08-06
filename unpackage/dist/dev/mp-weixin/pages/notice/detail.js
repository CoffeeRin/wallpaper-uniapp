"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_uni_tag = common_vendor.resolveComponent("uni-tag");
  _component_uni_tag();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      text: "置顶",
      type: "error",
      inverteds: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
