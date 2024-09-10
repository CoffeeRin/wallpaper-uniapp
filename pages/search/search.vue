<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar @confirm="onSearch" @cancel="onClear" @clear="onClear" focus placeholder="搜索"
				v-model="queryParams.keyword">
			</uni-search-bar>
		</view>


		<view v-if="!classList.length||noSearch">
			<view class="history" v-if="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>

			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>
		</view>


		<view class="noSearch" v-if="noSearch">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>

		<view v-else>
			<view class="list">
				<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in classList"
					:key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>
			</view>
			<view class="loadingLayout" v-if="noData || classList.length"><uni-load-more
					:status="noData?'noMore':'loading'" /></view>
		</view>


	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		onLoad,
		onUnload,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		apiSearchWall
	} from '../../api/apis.js'

	//查询参数
	const queryParams = ref({
		pageNum: 1,
		pageSize: 12,
		keyword: ""
	})

	//搜索历史词
	const historySearch = ref(uni.getStorageSync("historyStorage") || []);

	//热门搜索词
	const recommendList = ref(["美女", "帅哥", "宠物", "卡通"]);

	//没有更多
	const noData = ref(false)
	//没有搜索结果
	const noSearch = ref(false)

	// 搜索结果列表
	const classList = ref([])

	// 初始化搜索结果classList的数据,每次搜索初始化queryParams.value.keyword的值为输入值,及恢复初始参数
	const initParams = (value = '') => {
		classList.value = []
		noData.value = false
		noSearch.value = false
		queryParams.value = {
			pageNum: 1,
			pageSize: 12,
			keyword: value || ""
		}
		console.log(queryParams.value.keyword)
	}

	// 点击搜索壁纸
	const onSearch = () => {
		// 添加搜索历史
		historySearch.value.unshift(queryParams.value.keyword)
		// 搜索历史去重
		historySearch.value = [...new Set(historySearch.value)].slice(0,10)
		// 搜索历史存入缓存
		uni.setStorageSync("historyStorage", historySearch.value)
		// 初始化搜索结果
		initParams(queryParams.value.keyword)
		// 加载中...
		uni.showLoading({})
		// 搜索壁纸操作
		searchWall()
	}

	//点击清除按钮
	const onClear = () => {
		initParams()
	}

	// 搜索壁纸操作
	const searchWall = async () => {
		try {
			// 调用接口获取搜索壁纸结果
			const res = await apiSearchWall(queryParams.value)
			// 每次分页搜索到的结果push进数组classList
			classList.value.push(...res.data)
			// 后续需要预览，存入预览页的缓存
			uni.setStorageSync("storageClassList", classList.value)
			if (queryParams.value.pageSize > res.data.length) noData.value = true
			// res没有且classList也没有时，防止没搜索时显示“没有搜索结果”
			if (res.data.length === 0 && classList.value.length === 0) noSearch.value = true
		}finally{
			// 无论成功失败都结束loading
			uni.hideLoading()
		}
	}

	// 点击标签进行搜索
	const clickTab = (value) => {
		initParams(value)
		onSearch()
	}


	// 点击清空搜索记录
	const removeHistory = () => {
		uni.showModal({
			title: "是否清空历史搜索？",
			success: res => {
				if (res.confirm) {
					uni.removeStorageSync("historyStorage")
					historySearch.value = []
				}
			}
		})
	}

	//触底加载更多
	onReachBottom(() => {
		if (noData.value) return
		// 页数+1
		queryParams.value.pageNum++
		// 再次发送网络请求
		searchWall()
	})

	//关闭有页面
	onUnload(() => {

	})
</script>

<style lang="scss" scoped>
	.searchLayout {
		.search {
			padding: 0 10rpx;
		}

		.topTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #999;
		}

		.history {
			padding: 30rpx;
		}

		.recommend {
			padding: 30rpx;
		}

		.tabs {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 20rpx;

			.tab {
				background: #F4F4F4;
				font-size: 28rpx;
				color: #333;
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}

		.list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 20rpx 5rpx;

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