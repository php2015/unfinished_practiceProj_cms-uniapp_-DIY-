import http from '../main.js'

// 请求 Sortable
const getSortable = (id) => {
	let url = 'get_data?id=' + id;
	return http.$u.get(url).then(res => {
		return res;
	}).catch(err => {
		return err;
	})
}

// 获取页面主题
const getPageTheme = () => {
	let url = '/get_theme';
	return http.$u.get(url).then(res => {
		return res;
	}).catch(err => {
		return err;
	})
}

const save_page=(id,sorts)=>{
	uni.showToast({
		title:"仅演示"
	})
	// uni.request({
	// 	url: 'http://../',
	// 	method: 'POST',
	// 	data: {
	// 		id: id,
	// 		sortable: sorts
	// 	},
	// 	success(res) {
	// 		if(res.statusCode == 200) {
	// 			window.parent.postMessage({
	// 				method: 'saveSuccess',
	// 			}, '*');
	// 		}
	// 		else {
	// 			window.parent.postMessage({
	// 				method: 'saveFail',
	// 			}, '*');
	// 		}
	// 	}
	// })
}

export default {
	getSortable,
	getPageTheme,
	save_page
}