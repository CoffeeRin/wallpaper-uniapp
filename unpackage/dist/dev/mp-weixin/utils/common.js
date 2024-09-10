"use strict";
require("../common/vendor.js");
function compareTimestamp(timestamp) {
  const now = /* @__PURE__ */ new Date();
  const then = new Date(timestamp);
  const diffInMilliseconds = now - then;
  const oneMinute = 60 * 1e3;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;
  const oneMonth = 30 * oneDay;
  const threeMonths = 3 * oneMonth;
  if (diffInMilliseconds < oneMinute) {
    return "1分钟";
  } else if (diffInMilliseconds < oneHour) {
    return Math.floor(diffInMilliseconds / oneMinute) + "分钟";
  } else if (diffInMilliseconds < oneDay) {
    return Math.floor(diffInMilliseconds / oneHour) + "小时";
  } else if (diffInMilliseconds < oneMonth) {
    return Math.floor(diffInMilliseconds / oneDay) + "天";
  } else if (diffInMilliseconds < threeMonths) {
    return Math.floor(diffInMilliseconds / oneMonth) + "月";
  } else {
    return null;
  }
}
exports.compareTimestamp = compareTimestamp;
