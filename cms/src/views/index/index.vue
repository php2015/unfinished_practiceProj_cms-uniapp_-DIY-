<template>
		<div id="index" @mousedown="showStMask" @mouseup="hideStMask">
						<!-- 顶部功能栏 -->
						<top-function :page_list="page_list" :page_list_index="page_list_index" @changePage="changePage" @save="save"
						 @setPage="setPage" @updatePageTheme="updatePageTheme" @updatePage="updatePage"></top-function>
						<!-- 主体区 -->
						<div class="main">
							<!-- 组件栏 -->
							<left-tool :page_type="page_type"></left-tool>
							<div class="phone">
								<!-- 页面列表 -->
								<!-- <page-list :page_list="page_list" :page_list_index="page_list_index" @changePage="changePage"></page-list> -->
								<!-- 模拟手机 -->
								<div class="iframe_param">
									<iframe v-if="show_iframe" name="iframe_name" ref="iframe" class="iframe" :src="iframe_url" frameborder="0"></iframe>
									<div class="st-mask" v-show="isStMask">
										<sortable v-model="sortable_arr" :options="sortable_options" class="sortable" @add="sortableEnd"></sortable>
									</div>
									<!-- 鼠标点击的箭头 -->
									<!-- <img v-if="scroll_y" class="left-arrow" :style="{'top':scroll_y+'px'}" src="@/assets/icom-img/left-arrow.png"
									 alt=""> -->
								</div>
								<!-- 中间右侧操作栏 -->
								<phone-right-menu @refreshPhone="refreshPhone" @deleteComp="deleteComp" @backData="backData" @advance="advance"></phone-right-menu>
							</div>
							<!-- 菜单栏 -->
							<right-menu :chang="rightFresh" :init_attr="init_attr" :is_set_page="is_set_page" :page_type="page_type"
							 :page_item="page_list[page_list_index]" @save="save" @setPageSuccess="setPageSuccess"></right-menu>
						</div>


						<!-- 提示弹框 -->
						<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" style="width: 100%;">
							<span>检测到您改变了页面布局，是否保存？</span>
							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisibleConfirm(0)">取 消</el-button>
								<el-button type="primary" @click="dialogVisibleConfirm(1)">确 定</el-button>
							</span>
						</el-dialog>
					</div>
</template>
<script>
	import sortableModel from '../../api/sortable.js' 
	import CompList from '../../common/st-data.js'
	import LeftTool from '@/components/LeftTool.vue'
	import RightMenu from '@/components/RightMenu.vue'
	import PhoneRightMenu from '@/components/PhoneRightMenu.vue'
	import TopFunction from '@/components/TopFunction.vue'

	export default {
		data() {
			return {
				drawer: false,
				length: 1,
				sortable_arr: [],
				show_iframe: true,
				iframe_url: '',
				isStMask: false,
				sortable_options: {
					group: {
						name: 'sort',
						pull: true,
					},
					sort: false,
					animation: 200,
				},
				// 控制菜单栏刷新
				rightFresh: true,
				// 页面列表
				page_list: [],
				// 控制当前显示的页面列表中的样式
				page_list_index: 0,
				// 标识iframe当前页面是否改变
				is_page_change: false,
				dialogVisible: false,
				// iframe要跳转下一个页面路径
				next_page_path: '',
				// iframe要跳转下一个页面在页面列表的坐标
				next_page_index: -1,
				// iframe要跳转下一个页面的id
				next_page_id: -1,
				// 初始化 右侧 组件属性设置对象
				init_attr: false,
				// 标识鼠标点击的元素距离顶部的高度
				scroll_y: 0,
				// 当前页面的页面类型
				page_type: '',
				// iframe要跳转下一个页面的页面类型
				next_page_type: '',
				// 是否是页面设置
				is_set_page: false,
			}
		},
		components: { 
			LeftTool,
			RightMenu,
			PhoneRightMenu,
			TopFunction,
		},
		mounted() { 
			window.addEventListener('message', this.acceptMessage, false);
			this.getPageList();
		},
		methods: {
			get_img(e) {
				this.drawer = false
				for (let k in e) {
					const v = e[k]
					this.img_list.push(v)
					this.addform.img_id = v.id
				}
				this.length = 6 - this.img_list.length
				// console.log('get_img_end:', e, this.img_list)
				// console.log(this.addform)
			},
			// 获取页面列表
			getPageList() {
				const _this = this;
				//手动演示
				const demo_data=[{
					"id": 1000,
					"path": this.$uni_url,
					"name": "index",
					"sortable": "{\"id\":\"sort-1\",\"level\":1,\"child\":[{\"sorts\":\"st-button\",\"name\":\"按钮\",\"img_url\":\"/img/st-button.b7626e7e.png\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"button_text\":\"\",\"theme_type\":\"error\",\"button_size\":\"mini\",\"button_shape\":\"square\",\"button_plain\":\"false\",\"unique\":1610789322},{\"sorts\":\"st-input\",\"name\":\"输入框\",\"img_url\":\"data:image/png;base64,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\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"input_type\":\"text\",\"default_value\":\"\",\"placeholder\":\"\",\"unique\":1610794355},{\"sorts\":\"st-notice\",\"name\":\"公告\",\"img_url\":\"/img/st-notice.9c167792.png\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"theme_type\":\"error\",\"notice_scroll\":\"vertical\",\"notice_join\":\"true\",\"notice_speed\":\"160\",\"notice_volume_icon\":\"true\",\"unique\":1610945166},{\"sorts\":\"st-input\",\"name\":\"输入框\",\"placeholder\":\"\",\"default_value\":\"\",\"img_url\":\"data:image/png;base64,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\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"unique\":1610780380}],\"disable\":false}",
					"type": "index",
					"page_name": "自定义首页",
					"page_background_color": "#F9FBFB"
				}]
				_this.changePage(0, demo_data[0].path);
				_this.page_type = demo_data[0].type;
				_this.page_list = demo_data;

				//走接口
				// sortableModel.getSortableAll().then(res => {
				// 	// console.log(res) 
				// 	_this.changePage(0, res[0].path);
				// 	_this.page_type = res[0].type;
				// 	_this.page_list = res;
				// })
			},
			// 保存布局
			save(flag) {
				// flag: 0 保存布局 1 设置属性数据
				// this.$refs.iframe.contentWindow.save();
				// window.frames['iframe_name'].save();
				// console.log(this.$refs.iframe)
				let dat = {};
				if (flag == 1) {
					dat = JSON.parse(localStorage.getItem('attr_obj'));
					this.$refs.iframe.contentWindow.postMessage({
						method: 'update',
						data: dat,
					}, '*');
				} else {
					this.$refs.iframe.contentWindow.postMessage({
						method: 'layoutSave',
					}, '*');
				}
			},
			// 监听 iframe 中方法
			acceptMessage(event) {
				let dat = event.data;
				switch (dat.method) {
					case 'saveSuccess':
						this.saveSuccess();
						break;
					case 'saveFail':
						this.saveFail();
						break;
					case 'deleteSuccess':
						this.deleteSuccess();
						break;
					case 'deleteFail':
						this.deleteFail();
						break;
					case 'pageLayoutChange':
						this.pageLayoutChange(dat.data);
						break;
					case 'activeGetUnique':
						this.activeGetUnique(dat.data);
						break;
					case 'getScrollY':
						this.getScrollY(dat.data);
						break;
				}
			},
			// 保存成功回调
			saveSuccess() {
				const _this = this;
				// console.log('is_page_change', this.is_page_change, this.page_list[this.page_list_index])
				if (this.is_page_change) {
					this.is_page_change = false;
					if (this.next_page_index != -1) {
						this.page_list_index = this.next_page_index;
						setTimeout(() => {
							_this.changePage(_this.next_page_index || _this.page_list_index, _this.next_page_path || _this.page_list[_this
								.page_list_index].path, _this.next_page_type || _this.page_type, _this.next_page_id || _this.page_list[
								_this.page_list_index].id);
						}, 100)
					}

				}
				this.$notify({
					title: '保存成功',
					type: 'success',
				})
				this.refreshPhone();
				this.hideLeftArrow();
			},
			// 保存失败回调
			saveFail() {
				console.log('保存失败')
				this.refreshPhone();
				this.$notify({
					title: '保存失败',
					type: 'error',
				})
				this.hideLeftArrow();
			},
			// 删除组件成功回调
			deleteSuccess() {
				// this.refreshPhone();
				this.$notify({
					title: '删除成功',
					type: 'success',
				})
				this.hideLeftArrow();
			},
			// 删除组件失败回调
			deleteFail() {
				// this.refreshPhone();
				this.$notify({
					title: '删除失败',
					type: 'error',
				})
				this.hideLeftArrow();
			},
			// 监听 iframe 页面布局改变
			pageLayoutChange(data) {
				// console.log('布局改变: ', data)
				this.is_page_change = data.flag;
				// this.hideLeftArrow();
			},
			// 刷新页面
			refreshPhone() {
				console.log('重新加载页面')
				const _this = this;
				_this.show_iframe = false;
				_this.initRightAttr();
				setTimeout(() => {
					_this.show_iframe = true;
					// 保证 iframe 先渲染完成
					setTimeout(() => {
						// 每次刷新页面都要传 id，否则请求不到数据
						_this.sendID(_this.page_list[_this.page_list_index].id);
					}, 500)
				}, 10)
				this.hideLeftArrow();
			},
			// 显示遮罩
			showStMask() {
				this.isStMask = true;
			},
			// 隐藏遮罩
			hideStMask() {
				this.isStMask = false;
			},
			// 监听组件被拉入 iframe 中
			sortableEnd(evt) {
				let data_sorts = evt.clone.dataset.sorts;
				let attr_obj = {};
				// let attr_obj = JSON.parse(localStorage.getItem('attr_obj'));
				for (let k in CompList) {
					if (CompList[k].sorts == data_sorts) {
						attr_obj = CompList[k];
						break;
					}
				}
				// 让组件移动到 iframe 上之后隐藏
				evt.item.style.display = 'none';
				// 让组件移动到 iframe 上之后隐藏 end
				this.isStMask = false;
				// this.rightFresh = !this.rightFresh;
				this.is_page_change = true;
				this.$refs.iframe.contentWindow.postMessage({
					method: 'add-st',
					data: {
						attr_obj,
					}
				}, '*');
				this.hideLeftArrow();
			}, 
			// 切换页面
			changePage(index, url, type) {
				// console.log('url', url)
				if(this.is_page_change) {
					this.dialogVisible = true;
					this.next_page_index = index;
					this.next_page_path = url;
					this.next_page_type = type;
					return;
				}
				this.initRightAttr();
				this.page_list_index = index;
				this.iframe_url = url;
				this.next_page_index = -1;
				this.next_page_path = '';
				this.hideLeftArrow();
				this.page_type = type;
				this.is_set_page = false;
			},
			// 弹框确定取消按钮
			dialogVisibleConfirm(flag) {
				// flag: 1 保存布局 0 不保存
				this.dialogVisible = false;
				if (flag == 1) {
					this.save(0);
				} else {
					this.is_page_change = false;
					this.changePage(this.next_page_index, this.next_page_path, this.next_page_type, this.next_page_id);
				}
			},
			// 鼠标点击 iframe 中组件获取该组件的 unique
			activeGetUnique(data) {
				// console.log('fu:', data);
				let item = data.item;
				localStorage.setItem('attr_obj', JSON.stringify(item));
				this.rightFresh = !this.rightFresh;
				this.is_set_page = false;
				// console.log(item);
			},
			// 通过 unique 删除 iframe 组件
			deleteComp() {
				this.initRightAttr();
				this.$refs.iframe.contentWindow.postMessage({
					method: 'deleteCompUnique'
				}, '*');
				this.hideLeftArrow();
			},
			// 初始化右侧属性设置框
			initRightAttr() {
				this.init_attr = !this.init_attr;
			},
			// 接收鼠标点击的位置
			getScrollY(data) {
				this.scroll_y = data.scroll_y + 30;
			},
			// 隐藏指向鼠标点击的向左箭头
			hideLeftArrow() {
				this.scroll_y = 0;
			},
			// 返回上一步
			backData() {
				// console.log('back data')
				this.$refs.iframe.contentWindow.postMessage({
					method: 'backData'
				}, '*');
				this.hideLeftArrow();
			},
			// 前进
			advance() {
				// console.log('advance')
				this.$refs.iframe.contentWindow.postMessage({
					method: 'advance'
				}, '*');
				this.hideLeftArrow();
			},
			// 页面设置
			setPage() {
				this.is_set_page = true;
				this.hideLeftArrow();
			},
			// 页面信息设置成功
			setPageSuccess() {
				this.$refs.iframe.contentWindow.postMessage({
					method: 'setPageSuccess'
				}, '*');
			},
			// 更新页面主题
			updatePageTheme() {
				this.$refs.iframe.contentWindow.postMessage({
					method: 'updatePageTheme'
				}, '*');
			},
			// 更新页面列表
			updatePage() {
				const _this = this;
				sortableModel.getSortableAll().then(res => {
					_this.page_list = res.data;
				})
			},
			// 将 id 传到子窗口去
			sendID(id) {
				const _this = this;
				let loading = this.$loading({
					lock: true,
					text: '正在等待移动端加载完成 ...',
					spinner: 'el-icon-loading',
					background: 'rgba(255, 255, 255, 0.1)'
				})
				setTimeout(() => {
					_this.$refs.iframe.contentWindow.postMessage({
						method: 'sendID',
						data: {
							id
						}
					}, '*');
					loading.close();
				}, 1000)
			},

		}
	}
</script>



<style lang="scss">
	#index {
		height: 100%;
		width: 100%;

		>div {
			&:nth-child(1) {
				height: 60px;
			}
		}

		.main {
			display: flex;
			height: calc(100vh - 60px);
			overflow: hidden;

			>div {
				padding: 20px;

				&:nth-child(3) {
					width: 50%;
				}
			}

			.phone {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
				background-color: #ddd;
				box-shadow: 0 0 10px #999 inset;
				display: flex;
				justify-content: center;

				>div {
					box-shadow: 0 0 10px #999;
				}

				.iframe_param {
					position: relative;
					width: 416px;
					height: 738px;

					.iframe {
						width: 100%;
						height: 100%;
					}

					.st-mask {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;

						.sortable {
							width: 100%;
							height: 100%;

							>* {
								display: none;
							}
						}
					}
				}

				.left-arrow {
					position: absolute;
					top: 0;
					right: 0px;
					width: 30px;
					height: 30px;
					animation: ant 1.5s linear infinite;
				}

				@keyframes ant {
					0% {
						right: -30px;
					}

					25% {
						right: -33px;
					}

					50% {
						right: -35px;
					}

					75% {
						right: -33px;
					}

					100% {
						right: -30px;
					}
				}
			}
		}
	}
</style>
