"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const userScore = common_vendor.ref(0);
    const maskState = common_vendor.ref(true);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const infoPopup = common_vendor.ref(null);
    const openInfo = () => {
      infoPopup.value.open();
    };
    const closeInfoPopup = () => {
      infoPopup.value.close();
    };
    const ratePopup = common_vendor.ref(null);
    const openRatePopup = () => {
      ratePopup.value.open();
    };
    const closeRatePopup = () => {
      ratePopup.value.close();
    };
    const submitScore = () => {
    };
    const goback = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(8, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(maskChange),
        c: common_assets._imports_0$1,
        d: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        e: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        f: common_vendor.o(goback),
        g: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        h: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        i: common_vendor.p({
          type: "info",
          size: "23"
        }),
        j: common_vendor.o(openInfo),
        k: common_vendor.p({
          type: "star",
          size: "23"
        }),
        l: common_vendor.o(openRatePopup),
        m: common_vendor.p({
          type: "download",
          size: "23"
        }),
        n: maskState.value,
        o: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        p: common_vendor.o(closeInfoPopup),
        q: common_vendor.o(_ctx.onChange),
        r: common_vendor.o(($event) => _ctx.value = $event),
        s: common_vendor.p({
          modelValue: _ctx.value
        }),
        t: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        v: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        w: common_vendor.p({
          type: "bottom"
        }),
        x: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        y: common_vendor.o(closeRatePopup),
        z: common_vendor.o(_ctx.onChange),
        A: common_vendor.o(($event) => userScore.value = $event),
        B: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        C: common_vendor.t(userScore.value),
        D: common_vendor.o(submitScore),
        E: !userScore.value,
        F: common_vendor.sr(ratePopup, "2dad6c07-9", {
          "k": "ratePopup"
        }),
        G: common_vendor.p({
          ["is-mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
