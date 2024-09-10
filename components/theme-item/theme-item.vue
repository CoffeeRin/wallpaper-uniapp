<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id='+ item._id + '&name=' + item.name" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tab" v-if="compareTimestamp(item.updateTime)">{{compareTimestamp(item.updateTime)}}前更新</view>
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
import {compareTimestamp} from '../../utils/common.js'
	
defineProps({
	isMore:{
		type:Boolean,
		default: false
	},
	item:{
		type:Object,
		default(){
			return{
				name:"默认名称",
				picture:"../../common/images/preview_small.webp",
				updateTime:Date.now() - 1000*60*60*5
			}
		}
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