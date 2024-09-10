<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay
				:interval="3000" :duration="1000" circular>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill" @click="gotoNewPage(item.url)"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/detail?id='+item._id">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#ccc"></uni-icons>
			</view>
		</view>

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="switchTab" class="more">More+</navigator>
				</template>
			</common-title>

			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		apiGetNotice,
		apiGetBanner,
		apiGetRandomWall,
		apiGetClassify
	} from '../../api/apis.js'
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'

	// 公告数据
	const noticeList = ref([])
	const getNotice = async () => {
		const res = await apiGetNotice({
			select: true
		})
		noticeList.value = res.data
	}

	// 轮播图数据
	const bannerList = ref([])
	const getBanner = async () => {
		const res = await apiGetBanner()
		bannerList.value = res.data
	}

	// 跳转到新小程序
	const gotoNewPage = (url) =>{
		uni.navigateTo({
			url:`/pages/classlist/classlist?${url}`
		})
	}

	// 随机图
	const randomList = ref([])

	const getRandomWall = async () => {
		const res = await apiGetRandomWall()
		randomList.value = res.data
	}

	// 专题精选分类
	const classifyList = ref([])

	const getClassify = async () => {
		const res = await apiGetClassify({
			select: true
		})
		classifyList.value = res.data
	}

	// 专题精选是否还有更多
	const isMore = ref(true)

	// 每日推荐跳转预览图片
	const goPreview = (id) => {
		// 将每日推荐数据存入缓存
		uni.setStorageSync("storageClassList", randomList.value)
		uni.navigateTo({
			url: `/pages/preview/preview?id=${id}`
		})
	}

	// 分享给朋友
	onShareAppMessage((e) => {
		return {
			title: 'CoffeeLin壁纸',
			path: '/pages/index/index'
		}
	})

	//分享到朋友圈
	onShareTimeline(() => {
		return {
			title: 'CoffeeLin壁纸',
		}
	})

	getNotice()
	getBanner()
	getRandomWall()
	getClassify()
</script>

<style lang="scss" scoped>
	.homeLayout {
		.banner {
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;
				box-sizing: border-box;
				padding: 0 30rpx;

				&-item {
					image {
						width: 100%;
						height: 100%;
						border-radius: 15rpx;
					}
				}
			}
		}

		.notice {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 auto;
			background: #f9f9f9;
			border-radius: 80rpx;
			display: flex;

			.left {
				width: 140rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}

				.text {
					color: $brand-theme-color;
					font-weight: bold;
					font-size: 28rpx;
				}
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						height: 100%;
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.right {
				width: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.select {
			margin-top: 50rpx;

			.date {
				display: flex;
				align-items: center;

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}

				.text {
					margin-left: 5rpx;
					color: $brand-theme-color;
				}
			}

			.content {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 15rpx;
						}

						&:last-child {
							margin-right: 30rpx;
						}
					}
				}
			}
		}

		.theme {
			margin-top: 50rpx;

			.more {
				font-size: 32rpx;
				color: #888;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>