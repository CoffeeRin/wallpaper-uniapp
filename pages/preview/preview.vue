<template>
	<view class="preview">
		<swiper circular>
			<swiper-item v-for="item in 8">
				<image @click="maskChange" src="../../common/images/preview1.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="mask" v-show="maskState">
			<view class="goback" :style="{top:getStatusBarHeight() + 'px'}" @click="goback">
				<uni-icons type="back" color="#fff" size="20"></uni-icons> 
			</view>
			<view class="count">3 / 8</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="openInfo">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="openRatePopup">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">评分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">
						壁纸信息
					</view>
					<view class="close" @click="closeInfoPopup">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text class="value" selectable>1212312312312</text>
						</view>

						<view class="row">
							<view class="label">分类：</view>
							<text class="value class">1212312312312</text>
						</view>

						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">1212312312312</text>
						</view>

						<view class="row">
							<view class="label">评分：</view>
							<view class="value rateBox">
								<uni-rate v-model="value" @change="onChange" />
								<text class="score">5分</text>
							</view>
						</view>

						<view class="row">
							<view class="label">摘要：</view>
							<view class="value">1212312312312</view>
						</view>

						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="item in 3">标签</view>
							</view>
						</view>

						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="ratePopup" :is-mask-click="false">
			<view class="ratePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="closeRatePopup">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate allowHalf v-model="userScore" @change="onChange" />
					<text class="text">{{userScore}}分</text>
				</view>

				<view class="footer">
					<button @click="submitScore" :disabled="!userScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {getStatusBarHeight} from '@/utils/system.js'

	const userScore = ref(0)

	//遮罩层
	const maskState = ref(true)
	const maskChange = () => {
		maskState.value = !maskState.value
	}

	//信息弹窗
	const infoPopup = ref(null)
	const openInfo = () => {
		infoPopup.value.open()
	}
	const closeInfoPopup = () => {
		infoPopup.value.close()
	}

	//评分弹窗
	const ratePopup = ref(null)
	const openRatePopup = () => {
		ratePopup.value.open()
	}
	const closeRatePopup = () => {
		ratePopup.value.close()
	}
	
	//提交评分
	const submitScore = () => {
		
	}
		
	//返回按钮
	const goback = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.preview {
		position: relative;

		swiper {
			height: 100vh;
			width: 100%;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.mask {

			//紧邻的子元素view
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				width: fit-content;
				margin: auto;
				color: #fff;
			}

			.goback {
				top: 0;
				left: 30rpx;
				width: 38px;
				height: 38px;
				background: rgba(0,0,0,0.5);
				margin-left: 0;
				border-radius: 50%;
				backdrop-filter: blur(10rpx);
				border: 1rpx solod rgba(255,255,255,0.3);
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.count {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				backdrop-filter: blur(10rpx);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
			}

			.time {
				top: calc(10vh + 80rpx);
				font-size: 140rpx;
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				background: rgba(255, 255, 255, 0.8);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);

				.box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 2rpx 10rpx; //增加触控区域

					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}

		//共用头部样式
		.popHeader {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				color: $text-font-color-2;
				font-size: 26rpx;
			}

			.close {
				padding: 6rpx;
			}
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;



			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							flex: 1;
							width: 0;

							&.rateBox {
								display: flex;
								align-items: center;

								.score {
									font-size: 26rpx;
									color: $text-font-color-2;
									padding-left: 10rpx;
								}
							}

							&.tabs {
								display: flex;
								flex-wrap: wrap;

								.tab {
									border: 1px solid $brand-theme-color;
									color: $brand-theme-color;
									font-size: 22rpx;
									padding: 10rpx 30rpx;
									border-radius: 40rpx;
									line-height: 1em;
									margin: 0 10rpx 10rpx 0;
								}
							}

							&.class {
								color: $brand-theme-color;
							}
						}
					}

					.copyright {
						font-size: 28rpx;
						padding: 20rpx;
						background: #F6F6F6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}
				}
			}
		}

		.ratePopup {
			background: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;

			.content {
				padding: 30rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					color: #FFCA3E;
					padding-left: 10rpx;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
				}
			}

			.footer {
				padding: 10rpx 0;
				display: flex;
				justify-content: center;
				align-self: center;
			}
		}
	}
</style>