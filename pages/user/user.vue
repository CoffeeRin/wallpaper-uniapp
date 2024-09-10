<template>
	<view class="userLayout pageBg" v-if="userInfo">
		<view :style="{height:getFillHeight()+'px'}"></view>
		<view class="userInfo">
			<view class="avatar">
				<image src="../../static/images/xxmLogo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">{{userInfo.IP}}</view>
			<view class="address">来自于：{{userInfo.address.city || userInfo.address.province || userInfo.address.country}}
			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row" @click="myDownload">
					<view class="left">
						<uni-icons type="download-filled" size="20"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">{{userInfo.downloadSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>

				<view class="row" @click="myScore">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">{{userInfo.scoreSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>

				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact"></button>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<button @click="clickContact"></button>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row" @click="subscribeUpdate">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				<view class="row" @click="question">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>

	<view class="loadingLayout" v-else>
		<view :style="{height:getFillHeight()+'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	import {
		getFillHeight
	} from '../../utils/system.js'
	import {
		apiUserInfo
	} from '../../api/apis.js'
	import {
		ref
	} from 'vue'

	//点击拨打电话
	const clickContact = () => {
		uni.makePhoneCall({
			phoneNumber: "13267725312"
		})
	}

	// 获取用户信息
	const userInfo = ref(null)
	const getUserInfo = async () => {
		const res = await apiUserInfo()
		console.log(res)
		userInfo.value = res.data
	}
	
	// 我的下载
	const myDownload = () => {
		uni.navigateTo({
			url:"/pages/classlist/classlist?name=我的下载&type=download"
		})
	}
	
	// 我的评分
	const myScore = () =>{
		uni.navigateTo({
			url:"/pages/classlist/classlist?name=我的评分&type=score"
		})
	}
	
	// 订阅更新
	const subscribeUpdate = () =>{
		uni.navigateTo({
			url:"/pages/notice/detail?id=653507c6466d417a3718e94b&name=订阅更新"
		})
	}
	
	// 常见问题detail
	const question = () => {
		uni.navigateTo({
			url:"/pages/notice/detail?id=6536358ce0ec19c8d67fbe82&name=常见问题"
		})
	}

	getUserInfo()
</script>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: #aaa;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

			.list {
				.row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30rpx;
					height: 100rpx;
					border-bottom: 1px solid #eee;
					position: relative;
					background: #fff;

					&:last-child {
						border-bottom: 0
					}

					.left {
						display: flex;
						align-items: center;

						:deep() {
							.uni-icons {
								color: $brand-theme-color !important;
							}
						}

						.text {
							padding-left: 20rpx;
							color: #666
						}
					}

					.right {
						display: flex;
						align-items: center;

						.text {
							font-size: 28rpx;
							color: #aaa;

						}
					}

					button {
						position: absolute;
						top: 0;
						left: 0;
						height: 100rpx;
						width: 100%;
						opacity: 0;
					}
				}
			}
		}
	}
</style>