import {request} from '../utils/request.js'

// 首页滚动条
export function apiGetNotice(data={}){
	return request({
		url:"/wallNewsList",
		data
	})
}

// 首页轮播图
export function apiGetBanner(){
	return request({
		url:"/homeBanner",
	})
}

// 首页每日推荐
export function apiGetRandomWall(){
	return request({
		url:"/randomWall"
	})
}

// 首页专题精选及分类页各分类封面
export function apiGetClassify(data={}){
	return request({
		url:"/classify",
		data
	})
}

// 各分类图片列表
export function apiGetClassList(data={}){
	return request({
		url:"/wallList",
		data
	})
}

// 提交评分接口
export function apiGetSetupScore(data={}){
	return request({
		url:"/setupScore",
		data
	})
}

// 下载记录接口
export function apiDownLoadRecord(data={}){
	return request({
		url:"/downloadWall",
		data
	})
}

// 获取单张壁纸详情
export function apiDetailWall(data={}){
	return request({
		url:"/detailWall",
		data
	})
}

// 用户信息
export function apiUserInfo(){
	return request({
		url:"/userInfo"
	})
}

// 下载和评分列表
export function apiGetHistoryList(data={}){
	return request({
		url:"/userWallList",
		data
	})
}

// 获取公告接口
export function apiNoticeDetail(data={}){
	return request({
		url:"/wallNewsDetail",
		data
	})
}

// 获取公告接口
export function apiSearchWall(data={}){
	return request({
		url:"/searchWall",
		data
	})
}