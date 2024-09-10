"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref(null);
    const getUserInfo = async () => {
      const res = await api_apis.apiUserInfo();
      console.log(res);
      userInfo.value = res.data;
    };
    const myDownload = () => {
      common_vendor.index.navigateTo({
        url: "/pages/classlist/classlist?name=我的下载&type=download"
      });
    };
    const myScore = () => {
      common_vendor.index.navigateTo({
        url: "/pages/classlist/classlist?name=我的评分&type=score"
      });
    };
    const subscribeUpdate = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail?id=653507c6466d417a3718e94b&name=订阅更新"
      });
    };
    const question = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail?id=6536358ce0ec19c8d67fbe82&name=常见问题"
      });
    };
    getUserInfo();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value
      }, userInfo.value ? {
        b: common_vendor.unref(utils_system.getFillHeight)() + "px",
        c: common_assets._imports_0,
        d: common_vendor.t(userInfo.value.IP),
        e: common_vendor.t(userInfo.value.address.city || userInfo.value.address.province || userInfo.value.address.country),
        f: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        g: common_vendor.t(userInfo.value.downloadSize),
        h: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        i: common_vendor.o(myDownload),
        j: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        k: common_vendor.t(userInfo.value.scoreSize),
        l: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        m: common_vendor.o(myScore),
        n: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        o: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        p: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        q: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        r: common_vendor.o(subscribeUpdate),
        s: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        t: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        v: common_vendor.o(question)
      } : {
        w: common_vendor.unref(utils_system.getFillHeight)() + "px",
        x: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
