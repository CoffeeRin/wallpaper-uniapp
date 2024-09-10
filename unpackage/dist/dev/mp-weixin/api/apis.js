"use strict";
const utils_request = require("../utils/request.js");
function apiGetNotice(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
}
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner"
  });
}
function apiGetRandomWall() {
  return utils_request.request({
    url: "/randomWall"
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
function apiGetClassList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
function apiGetSetupScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
function apiDownLoadRecord(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
}
function apiDetailWall(data = {}) {
  return utils_request.request({
    url: "/detailWall",
    data
  });
}
function apiUserInfo() {
  return utils_request.request({
    url: "/userInfo"
  });
}
function apiGetHistoryList(data = {}) {
  return utils_request.request({
    url: "/userWallList",
    data
  });
}
function apiNoticeDetail(data = {}) {
  return utils_request.request({
    url: "/wallNewsDetail",
    data
  });
}
function apiSearchWall(data = {}) {
  return utils_request.request({
    url: "/searchWall",
    data
  });
}
exports.apiDetailWall = apiDetailWall;
exports.apiDownLoadRecord = apiDownLoadRecord;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetHistoryList = apiGetHistoryList;
exports.apiGetNotice = apiGetNotice;
exports.apiGetRandomWall = apiGetRandomWall;
exports.apiGetSetupScore = apiGetSetupScore;
exports.apiNoticeDetail = apiNoticeDetail;
exports.apiSearchWall = apiSearchWall;
exports.apiUserInfo = apiUserInfo;
