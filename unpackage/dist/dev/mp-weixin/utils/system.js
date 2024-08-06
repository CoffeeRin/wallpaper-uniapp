"use strict";
const common_vendor = require("../common/vendor.js");
const System_Info = common_vendor.index.getSystemInfoSync();
const getStatusBarHeight = () => System_Info.statusBarHeight || 15;
const getTitleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect()) {
    const { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
    return (top - getStatusBarHeight()) * 2 + height;
  }
  return 40;
};
const getFillHeight = () => getStatusBarHeight() + getTitleBarHeight();
const getLeftIconLeft = () => {
  return 0;
};
exports.getFillHeight = getFillHeight;
exports.getLeftIconLeft = getLeftIconLeft;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
