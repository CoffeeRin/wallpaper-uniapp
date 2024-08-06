const System_Info = uni.getSystemInfoSync()
//状态栏高度
export const getStatusBarHeight = () => System_Info.statusBarHeight || 15

//顶部navbar高度
export const getTitleBarHeight = () => {
	// #ifndef H5
	if (uni.getMenuButtonBoundingClientRect()) {
		//胶囊按钮到顶部距离和胶囊按钮高度
		const {top,height} = uni.getMenuButtonBoundingClientRect()
		return (top - getStatusBarHeight()) * 2 + height
	} 
	// #endif
	
	return 40
}

//填充区高度
export const getFillHeight = () => getStatusBarHeight() + getTitleBarHeight()

//适配抖音小程序图标遮挡字体
export const getLeftIconLeft = ()=> {
	// #ifdef MP-TOUTIAO
		let {leftIcon:{left,width}}  = tt.getCustomButtonBoundingClientRect();
		return left+ parseInt(width);
	// #endif
	
	// #ifndef MP-TOUTIAO
		return 0
	// #endif	
}