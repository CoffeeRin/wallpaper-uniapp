<template>
	<view class="themeItem">
		<navigator url="/pages/classlist/classlist" class="box" v-if="!isMore">
			<image class="pic" src="../../common/images/preview_small.webp" mode="aspectFill"></image>
			<view class="tab">20小时前更新</view>
			<view class="mask">猫猫狗狗</view>
		</navigator>

		<!-- 跳转到tabBar页面，open-type="switchTab" -->
		<navigator url="/pages/classify/classify" open-type="switchTab" class="box more" v-else>
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
defineProps({
	isMore:{
		type:Boolean,
		default: false
	}
})
</script>

<style lang="scss" scoped>
	.themeItem {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}

			.tab {
				position: absolute;
				top: 0;
				left: 0;
				color: #fff;
				border-radius: 0 0 20rpx 0;
				background: rgba(250, 129, 90, 0.7);
				backdrop-filter: blur(20rpx); //添加磨砂滤镜效果
				font-size: 22rpx;
				transform: scale(0.8);
				transform-origin: left top; //左上为基准
				padding: 6rpx 10rpx;
			}

			.mask {
				position: absolute;
				width: 100%;
				height: 70rpx;
				bottom: 0;
				left: 0;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx);
				font-weight: 600;
				font-size: 30rpx;
			}
		}

		// 既有box又有more类名时
		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				flex-direction: column;
			}
			.text{
				font-size: 28rpx;
			}
		}
	}
</style>