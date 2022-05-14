import http from '../common/axios.js'
import { Message } from 'element-ui' 
const check_demo = () => {
	Message({
	  message: "演示", 
	  duration: 5 * 1000
	})
  }


// 获取所有的 sortable
// 获取页面列表
const getSortableAll = () => {
	let url = '/get_data';
	return http.get(url).then(res => {
		return res;
	})
} 

// 设置页面信息
const setPageInfo = (data) => {
	//check_demo()
	let url = '/set_page';
	return http.post(url, data).then(res => {
		return res;
	})
}

// 获取页面主题
const getPageTheme = () => {
	let url = '/get_theme';
	return http.get(url).then(res => {
		return res;
	})
}

// 设置页面主题
const setPageTheme = (data) => {
	check_demo()
	// let url = '/set_theme';
	// return http.post(url, data).then(res => {
	// 	return res;
	// })
}

// 获取移动端运行环境
const getRunPath = () => {
	check_demo()
}

// 添加新页面
const addPage = (data) => {
	let url = '/zt/add_sor';
	return http.post(url, data).then(res => {
		return res;
	})
}

// 删除页面
const deletePage = (id) => {
	let url = '/zt/del_sor';
	return http.del(url, {'id': id}).then(res => {
		return res;
	})
}


export default {
	getSortableAll,
	setPageInfo,
	getPageTheme,
	setPageTheme,
	getRunPath,
	addPage,
	deletePage,
}