export function compareTimestamp(timestamp) {  
    const now = new Date();  
    const then = new Date(timestamp);  
    const diffInMilliseconds = now - then;  
  
    const oneMinute = 60 * 1000;  
    const oneHour = 60 * oneMinute;  
    const oneDay = 24 * oneHour;  
    const oneMonth = 30 * oneDay; // 简化计算，认为一个月是30天  
    const threeMonths = 3 * oneMonth;  
  
    if (diffInMilliseconds < oneMinute) {  
        return '1分钟';  
    } else if (diffInMilliseconds < oneHour) {  
        return Math.floor(diffInMilliseconds / oneMinute) + '分钟';  
    } else if (diffInMilliseconds < oneDay) {  
        return Math.floor(diffInMilliseconds / oneHour) + '小时';  
    } else if (diffInMilliseconds < oneMonth) {  
        return Math.floor(diffInMilliseconds / oneDay) + '天';  
    } else if (diffInMilliseconds < threeMonths) {  
        return Math.floor(diffInMilliseconds / oneMonth) + '月';  
    } else {  
        return null;  
    }  
}

// 页面参数有误返回首页
export function gotoHome(){
	uni.showModal({
		title:"提示",
		content:'页面参数有误将返回首页',
		showCancel:false,
		success: (res) => {
			if(res.confirm){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	})
}