<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
import {apiGetClassify} from '../../api/apis.js'
import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'

// 分类页各分类封面图片
const classifyList = ref([])
	
const getClassify =  async () => {
	const res = await apiGetClassify({
		pageSize:15
	})
	classifyList.value = res.data
}

// 分享给朋友
onShareAppMessage((e)=>{
	return{
		title:'CoffeeLin壁纸-分类页',
		path:'/pages/classify/classify'
	}
})

//分享到朋友圈
onShareTimeline(()=>{
	return{
		title:'CoffeeLin壁纸'
	}
})

getClassify()
</script>

<style lang="scss" scoped>
.classify{
	padding: 30rpx;
	display: grid;
	gap: 15rpx;
	grid-template-columns: repeat(3,1fr);
}
</style>
