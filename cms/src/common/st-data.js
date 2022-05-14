/**
 * 初始化组件：
{
	sorts: // 组件的专属 sorts，该在字段不能与其他组件值相同
	name: // 组件名称
	img_url: // 为组件的图片，后期换成图标，可以为空
	// type 表示该组件可以在哪些类型的页面可以拖拽，其值是页面的类型
	type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
}
 */
/**
 * 若组件中有 child_id，则设置其默认值为 -1，否则会出错
 * 若组件中有默认值，则命名为: default_value
 * 若组件中有6种主题类型，则命名为: theme_type
 * 若组件中有输入提示，则命名为: placeholder
 */


let list = [
	// 按钮
	{
		sorts: 'st-button',
		name: '按钮',
		img_url: require('@/assets/icon-component/st-button.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
		// 按钮文字
		button_text: '',
		// 主题类型
		theme_type: 'default',
		// 按钮尺寸
		button_size: 'default',
		// 按钮的形状
		button_shape: 'square',
		// 按钮是否镂空
		button_plain: 'false',
	},
	// banner
	{
		sorts: 'st-swiper',
		name: 'Banner',
		img_url: require('@/assets/icon-component/st-swiper.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
	},
	// 商品列表
	{
		sorts: 'st-shop-list',
		name: '商品列表',
		img_url: require('@/assets/icon-component/st-shop-list.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
		// 列表样式
		list_type: 'list-type-2',
		// 商品角的形状
		shop_shape: 'square',
		// 是否显示商品名称
		is_show_title: true,
		// 是否显示商品描述
		is_show_description: true,
		// 是否显示商品价格
		is_show_price: true,
		// 是否显示按钮
		is_show_button: true,
		// 按钮文字
		button_text: '抢购',
		// 按钮颜色
		button_type: 'default',
	},
	//日历
	// {
	// 	sorts: 'st_calender',
	// 	name: '日历',
	// 	img_url: require('@/assets/icon-component/st-calender.png'),
	// 	type: ['index', 'cover','article', 'article_list', 'pic_list', 'us'],
	// 	//日历是否显示
	// 	calender_show:'false'
	// },
	//输入框
	{
		sorts: 'st-input',
		name: '输入框',
		img_url: require('@/assets/icon-component/st-input.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
		//输入框类型
		input_type:'text',
		// 输入框默认值
		default_value: '',
		// 提示文字
		placeholder: '',
	},
	// 搜索
	{
		sorts: 'st-search',
		name: '搜索框',
		img_url: require('@/assets/icon-component/st-search.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
		// 搜索文字
		default_value:'',
		// 搜索框形状
		search_shape:"round",
		// 搜索框提示内容
		placeholder:'请输入关键词',
		// 是否显示右侧控件
		search_show_action:'true',
		// 右边字符
		search_action_text:'搜索',
		//文字对齐方式
		search_input_align:'left',
		//是否启用清除控件
		search_clearabled:'true'
	},
	//公告
	{
		sorts: 'st-notice',
		name: '公告',
		img_url: require('@/assets/icon-component/st-notice.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
		//公告主题
		theme_type: "warning",
		//滚动模式
		notice_scroll:"vertical",
		//是否衔接
		notice_join:'true',
		//速度
		notice_speed:'160',
		//是否显示小喇叭团
		notice_volume_icon:'true'
	},
]

export default list