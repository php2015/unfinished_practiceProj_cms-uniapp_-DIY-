/**
 * attr_len: 公共属性数量
 * public_list: 该文件保存所有组件的公共属性和必要属性
 * 公共属性：每个组件必须要有的属性
 * 必要属性：在特定条件下必须要有的属性，如组件内部存在 sortable 盒子时必须要有 level、child、child_id 等属性，这些属性我称为必要属性
 */

const attr_len = 5;

const public_list = [
	'sorts',	// 公共属性
	'name',		// 公共属性
	'img_url',	// 公共属性
	'type',		// 公共属性
	'unique',	// 公共属性（在 st-data.js 文件没有体现，该属性由系统自动生成）
	'level',	// 当内部有 sortable 时必要属性
	'child',	// 当内部有 sortable 时必要属性
	'child_id',	// 当内部有 sortable 时必要属性
]

export default {
	attr_len,
	public_list
} 