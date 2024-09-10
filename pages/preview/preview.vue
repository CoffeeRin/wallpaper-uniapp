<template>
	<view class="preview" v-if="currentInfo">
		<swiper circular :current="currentIndex" @change="onChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<!-- index和当前索引值相等才加载 -->
				<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="mask" v-show="maskState">
			<view class="goback" :style="{top:getStatusBarHeight() + 'px'}" @click="goback">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">{{currentIndex+1}} / {{classList.length}}</view>
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
					<view class="text">{{currentInfo.score}}分</view>
				</view>
				<view class="box" @click="clickDownload">
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
					<view class="content" v-if="currentInfo">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text class="value" selectable>{{currentInfo._id}}</text>
						</view>

						<!-- <view class="row">
							<view class="label">分类：</view>
							<text class="value class">1212312312312</text>
						</view> -->

						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{currentInfo.nickname}}</text>
						</view>

						<view class="row">
							<view class="label">评分：</view>
							<view class="value rateBox">
								<uni-rate readonly touchable :value="currentInfo.score" size="16" />
								<text class="score">{{currentInfo.score}}分</text>
							</view>
						</view>

						<view class="row">
							<view class="label">摘要：</view>
							<view class="value">{{currentInfo.description}}</view>
						</view>

						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="item in currentInfo.tabs">{{item}}</view>
							</view>
						</view>

						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="ratePopup" :is-mask-click="false">
			<view class="ratePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{isScore?"评分过了~":"壁纸评分"}}</view>
					<view class="close" @click="closeRatePopup">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate allowHalf v-model="userScore" @change="onChange" :readonly="isScore" />
					<text class="text">{{userScore}}分</text>
				</view>

				<view class="footer">
					<button @click="submitScore" :disabled="!userScore || isScore" type="default" size="mini"
						plain>确认评分</button>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		getStatusBarHeight
	} from '@/utils/system.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		apiGetSetupScore,
		apiDownLoadRecord,
		apiDetailWall
	} from '../../api/apis.js'
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'

	// 用户评分
	const userScore = ref(0)
	// 是否已评分
	const isScore = ref(false)

	// 壁纸信息
	const currentInfo = ref(null)

	//遮罩层
	const maskState = ref(true)
	const maskChange = () => {
		maskState.value = !maskState.value
	}

	// 信息弹窗
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
		// 打开弹窗时判断是否已评分
		if (currentInfo.value.userScore) {
			isScore.value = true
			userScore.value = currentInfo.value.userScore
		}
		ratePopup.value.open()
	}
	const closeRatePopup = () => {
		ratePopup.value.close()
		// 关闭评分弹窗后初始化用户评分和评分状态
		userScore.value = 0
		isScore.value = false
	}

	// 提交评分
	const submitScore = async () => {
		uni.showLoading({
			title: "加载中..."
		})
		const {
			classid,
			_id: wallId
		} = currentInfo.value
		const res = await apiGetSetupScore({
			classid,
			wallId,
			userScore: userScore.value
		})
		uni.hideLoading()

		// 返回成功弹框
		if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
				icon: "success"
			})
			classList.value[currentIndex.value].userScore = userScore.value
			uni.setStorageSync("storageClassList", classList.value)
		}

		// 关闭评分弹窗
		closeRatePopup()
		// console.log(currentInfo.value)
	}

	//返回按钮
	const goback = () => {
		uni.navigateBack({
			success: () => {
			},
			fail: () => {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		})
	}

	// 点击下载
	const clickDownload = async () => {
		// #ifdef H5
		uni.showModal({
			content: "请长按或右键保存",
			showCancel: false
		})
		// #endif

		// #ifndef H5
		try {
			uni.showLoading({
				title: '下载中...',
				mask: true
			})

			const {
				classid,
				_id: wallId
			} = currentInfo.value

			const res = await apiDownLoadRecord({
				classid,
				wallId
			})

			// 出现错误，抛出错误信息
			if (res.errCode !== 0) throw res

			uni.getImageInfo({
				src: currentInfo.value.picurl,
				success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: (res) => {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							})
						},
						fail: (err) => {
							// 已授权但取消下载
							if (err.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title: '保存失败',
									icon: "none"
								})
								return
							}

							// 未授权
							uni.showModal({
								title: "授权提示",
								content: "需要授权相册",
								success: (res) => {
									if (res.confirm) {
										uni.openSetting({
											success(setting) {
												// 是否授权
												if (setting
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: "授权成功",
														icon: 'none'
													})
												} else {
													uni.showToast({
														title: "授权失败",
														icon: 'none'
													})
												}
											}
										})
									}
								}
							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}
			})
		} catch (err) {
			console.log(err)
			uni.hideLoading()
		}
		// #endif
	}

	// 获取缓存数据
	const storageClassList = uni.getStorageSync("storageClassList") || []
	const classList = ref([])
	classList.value = storageClassList.map(item => {
		return {
			...item,
			picurl: item.smallPicurl.replace("_small.webp", ".jpg")
		}
	})
	// console.log(classList.value);

	//获取路由参数
	// 当前图片id
	const currentId = ref(null)
	// 当前索引值
	const currentIndex = ref(null)
	// 已读图片数组
	const readImgs = ref([])
	// 将当前已读图片索引加入数组
	const readImgsFun = () => {
		readImgs.value.push(
			currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
		)
		// 去重
		readImgs.value = [...new Set(readImgs.value)]
		// console.log(readImgs.value)
	}
	onLoad(async (e) => {
		currentId.value = e.id
		// 当前页面是分享得到的
		if (e.type === 'share') {
			const res = await apiDetailWall({
				id: currentId.value
			})
			classList.value = res.data.map(item => {
				return {
					...item,
					picurl: item.smallPicurl.replace("_small.webp", ".jpg")
				}
			})
		}
		// 根据currentId找到匹配的图片索引
		currentIndex.value = classList.value.findIndex(item => item._id === currentId.value)
		// 获取当前壁纸信息
		currentInfo.value = classList.value[currentIndex.value]
		// 将当前已读图片索引加入数组
		readImgsFun()
	})
	// 滚动事件
	const onChange = (e) => {
		// 获取当前图片索引值
		currentIndex.value = e.detail.current
		// 获取当前壁纸信息
		currentInfo.value = classList.value[currentIndex.value]
		// 将当前已读图片索引加入数组
		readImgsFun()
	}

	// 分享单张图给朋友
	onShareAppMessage((e) => {
		return {
			title: `CoffeeLin壁纸`,
			path: `/pages/preview/preview?id=${currentId.value}&type=share`
		}
	})

	//分享到朋友圈
	onShareTimeline(() => {
		return {
			title: 'CoffeeLin壁纸',
			query: `id=${currentId.value}&type=share`
		}
	})
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
				background: rgba(0, 0, 0, 0.5);
				margin-left: 0;
				border-radius: 50%;
				backdrop-filter: blur(10rpx);
				border: 1rpx solod rgba(255, 255, 255, 0.3);
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