<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
	
	<view class="loadingLayout" v-if="classList.length || noData">
		<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
	</view>
	
	<!-- 底部安全区 -->
	<view class="safe-area-inset-bottom">
	</view>
</template>

<script setup>
import {ref} from 'vue'
import {apiGetClassList,apiGetHistoryList} from '../../api/apis.js'
import {onLoad,onUnload,onReachBottom} from '@dcloudio/uni-app'
import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
import {gotoHome} from '../../utils/common.js'

// 传递的参数
const queryParams = {
	pageNum:1,
	pageSize:12
}

// 是否没有数据了
const noData = ref(false)

let pageName

// 获取路由参数
onLoad((e)=>{
	const {id=null,name=null,type=null} = e
	if(type) queryParams.type = type
	if(id) 	queryParams.classid = id
	/* // 参数异常时
	if(id === null) gotoHome() */
	pageName = name
	// 当前页面标题
	uni.setNavigationBarTitle({
		title:name
	})
	// onLoad在setup后执行
	getClassList()
})

// 触底加载
onReachBottom(()=>{
	// 根据标志判断有无数据
	if(noData.value) return
	// 页数加1
	queryParams.pageNum++
	getClassList()
	// console.log("下拉了")
})

// 各分类的图片列表
const classList = ref([])

// 获取当前分类列表数据
const getClassList = async () => {
	let res
	// 根据有无classid和type调用不同接口
	if(queryParams.classid) res = await apiGetClassList(queryParams)
	if(queryParams.type) res = await apiGetHistoryList(queryParams)
	classList.value = [...classList.value,...res.data]
	// 存入本地
	if(	queryParams.pageSize > res.data.length) noData.value = true
	uni.setStorageSync("storageClassList",classList.value)
	// console.log(classList.value)
}

// 分享给朋友
onShareAppMessage((e)=>{
	return{
		title:`CoffeeLin壁纸-${pageName}`,
		path:`/pages/classlist/classlist?id=${queryParams.classid}&name=${pageName}`
	}
})

// 分享到朋友圈
onShareTimeline(()=>{
	return{
		title:'CoffeeLin壁纸',
		query:`id=${queryParams.classid}&name=${pageName}`
	}
})

// 退出页面清除缓存
onUnload(()=>{
	uni.removeStorageSync("storageClassList")
})
</script>

<style lang="scss" scoped>
	.classlist {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>