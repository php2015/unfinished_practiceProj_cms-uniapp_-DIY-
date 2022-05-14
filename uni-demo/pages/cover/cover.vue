<template>
	<view class="content" :style="{'background-color': page_info.page_background_color}">
		<!-- 删除 sortable -->
		<!-- <div id="del" class="sortable-panel sortable_delete" v-show="!isPhone&&isShowDelete" :class="{'': isShowDeleteStyle}">
			<image style="width: 100rpx;height: 100rpx;opacity: 0.7;" src="@/static/icon-img/delete.png" mode=""></image>
		</div> -->
		
		<view id="sort-1" class="sortable sortable-panel">
			<template v-for="(result,index) in sorts.child">
				
				<st-search v-if="result.sorts=='st-search'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-search>
				
				<st-swiper v-if="result.sorts=='st-swiper'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-swiper>
				
				<st-form v-if="result.sorts=='st-form'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-form>
				
				<st-input v-if="result.sorts == 'st-input'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-input>
				
				<st-button v-if="result.sorts == 'st-button'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-button>
				
				<st-applys v-if="result.sorts == 'st-applys'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-applys>
				
				<st-notice v-if="result.sorts == 'st-notice'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-notice>
				
				<st-shop-list v-if="result.sorts == 'st-shop-list'" :isPhone="isPhone" :dat="result" @getUnique="activeGetUnique"></st-shop-list>
				
			</template>
		</view>
	</view>
</template>

<script>
	// import draggable from 'vuedraggable'
	import Sortable from "sortablejs";
	import STsearch from '@/components/ST/ST-search/ST-search.vue';
	import STform from '@/components/ST/ST-form/ST-form.vue';
	import STswiper from '@/components/ST/ST-swiper/ST-swiper.vue';
	import STbutton from '@/components/ST/ST-button/ST-button.vue';
	import STinput from '@/components/ST/ST-input/ST-input.vue';
	import STapplys from '@/components/ST/ST-applys/ST-applys.vue';
	import STnotice from '@/components/ST/ST-notice/ST-notice.vue';
	import STshoplist from '@/components/ST/ST-shop-list/ST-shop-list.vue';
	
	export default {
		components: {
			// draggable,
			'st-search': STsearch,
			'st-form': STform,
			'st-swiper': STswiper,
			'st-button': STbutton,
			'st-input': STinput,
			'st-applys': STapplys,
			'st-notice': STnotice,
			'st-shop-list': STshoplist,
		},
		
		data() {
			return {
				// 保存页面信息
				page_info: {},
				// 保存布局的原始数据（不可改变）
				data_sorts: [],
				// 项目的布局数据（可改变）
				sorts: [],
				// 判断项目是在哪个端打开
				isPhone: false,
				// 控制删除组件显示
				isShowDelete: false,
				// 控制组件托到删除框时，删除框的样式
				isShowDeleteStyle: false,
				// 要删除的组件 unique
				delete_unique: -1,
				// 当前页面请求数据排版的id
				id: 1005,
				// 用于返回操作
				back_data: [],
				// 用于前进操作
				advance_data: [],
				// 保存最后一次返回上一步操作的数据
				back_last_data: {},
				// 后退和前进最多能保存长度
				back_advance_len: 10,
			}
		},
		mounted() {
			window.addEventListener('message', this.save);
			let isPhone = navigator.userAgent.toLowerCase();
			const _this = this;
			setTimeout(() => {
				if(isPhone.indexOf('windows') != -1) {
					_this.getEff(false);
					_this.isPhone = false;
				}
				else {
					_this.getEff(true);
					_this.isPhone = true;
				}
			}, 500)
			// _this.initSortable('del', false, -1);
			this.getPageTheme();
		},
		computed: {
			// 监听页面布局是否发生改变
			isPageChange() {
				return this.data_sorts == JSON.stringify(this.sorts);
			},
			
		},
		methods: {
			// 获取布局数据
			async getEff(flag) {
				const _this = this;
				this.http.getSortable(_this.id).then(async res => {
					_this.page_info = res;
					_this.data_sorts = res.sortable;
					_this.sorts = await JSON.parse(res.sortable);
					// console.log(_this.sorts)
					// console.log(JSON.stringify(_this.sorts))
					_this.initSortable('sort-1', flag, 1);
					_this.setPageInfo(res);
					setTimeout(() => {
						for(let k in _this.sorts.child)
						{
							if(_this.sorts.child[k].child_id) {
								_this.initSortable(_this.sorts.child[k].child_id, flag, 2);
							}
						}
					}, 100)
				})
			},
			// 初始化 sortable
			async initSortable(id, flag, level) {
				// level : -1 删除框 1 一级sortable 2 二级sortable
				// flag : true 项目是由移动端打开 false 项目是由PC端打开
				const _this = this;
				const el = await document.getElementById(id);
				let options = {};

				options = await {
					group: {
						name: 'sort',
						pull: true,
						put: false,
					},
					animation: 200,
					forceFallback: true,
					dragClass: 'choose-active',
					chosenClass: 'choose-active_1',
					disabled: flag,
					filter: '.st-item-fixed',
					scroll: false,
					handle: '.st-item-handle-1',
					onStart: (evt) => {
						_this.isShowDelete = true;
					},
					// 该方法目前争对删除框
					onAdd: (evt) => {
						// console.log('onAdd:', evt);
						let to_id = evt.to.id;
						let from_id = evt.from.id;
						let old_index = evt.oldIndex;
						let new_index = evt.newIndex;
						if(to_id == 'del') {
							let item = _this.searchByIdAndIndex(from_id, old_index);
							let obj = {
								id: from_id,
								type: 'delete',
								index: old_index,
								item,
							}
							// console.log(obj);
							_this.back_data.push(obj);
							
							_this.deleteComp(from_id, to_id, old_index, new_index);
							evt.item.style.width = 0;
							evt.item.style.height = 0;
							evt.item.style.overflow = 'hidden';
						}
						
						_this.$forceUpdate();
					},
					// 只有在盒子内可移动项的排序发生改变时才会触发
					onUpdate: (evt) => {
						// console.log('update sort', evt)
						// console.log('sort end');
						let to_id = evt.to.id;
						let from_id = evt.from.id;
						let old_index = evt.oldIndex;
						let new_index = evt.newIndex;
						_this.saveSort(new_index, old_index, id)
						_this.isShowDelete = false;
						_this.pageIsChange();
						let obj = {
							id: to_id,
							old_index: new_index,
							new_index: old_index,
							type: 'sort',
						};
						this.back_data.push(obj);
						if(this.back_data.length > this.back_advance_len) {
							this.back_data = this.back_data.slice(this.back_data.length - this.back_advance_len);
						}
						// console.log(this.back_data.length);
					}
				};
				if(level == -1) {
					options.group.pull = false;
					options.group.put = true;
				}
				if(level == 2) {
					// delete options.handle;
				}
				setTimeout(() => {
					// console.log(level, options)
					Sortable.create(el, options);
				}, 300)
			},
			// 保存排序
			async saveSort(new_index, old_index, id) {
				// evt 对象 id 表示可拖拽组的 id
				const _this = this;
				const sorts = _this.sorts;
				
				if(sorts.id == id) {
					if(old_index < new_index) {
						sorts.child.splice(new_index + 1, 0, sorts.child[old_index]);
						sorts.child.splice(old_index, 1);
					}
					else {
						sorts.child.splice(new_index, 0, sorts.child[old_index]);
						sorts.child.splice(old_index + 1, 1);
					}
				}
				else {
					for(let k in sorts.child)
					{
						let v = sorts.child[k];
						if(v.child_id == id) {
							if(old_index < new_index) {
								v.child.splice(new_index + 1, 0, v.child[old_index]);
								v.child.splice(old_index, 1);
							}
							else {
								v.child.splice(new_index, 0, v.child[old_index]);
								v.child.splice(old_index + 1, 1);
							}
						}
					}
				}
				_this.sorts = sorts;
				uni.setStorageSync('sortable', _this.sorts);
			},
			// 监听父窗口请求
			save(event) {
				// console.log(event.data);
				const _this = this;
				let dat = event.data;
				let data = dat.data;
				switch(dat.method)
				{
					case 'layoutSave':
						_this.saveLayout();
						break;
					case 'add-st':
						_this.addComponent(data);
						break;
					case 'update':
						_this.updateAttr(data);
						break;
					case 'deleteCompUnique':
						_this.deleteCompUnique();
						break;
					case 'backData':
						_this.backData();
						break;
					case 'advance':
						_this.advance();
						break;
					case 'setPageSuccess':
						_this.setPageSuccess();
						break;
					case 'updatePageTheme':
						_this.updatePageTheme();
						break;
				}
			},
			// 保存布局到数据库
			saveLayout() {
				const _this = this;
				let sorts = JSON.stringify(this.sorts);
				
				this.http.save_page(_this.id,sorts)
			},
			// 添加新组件
			addComponent(params) {
				const _this = this;
				let attr_obj = params.attr_obj;
				attr_obj.unique = Math.floor((new Date()).getTime() / 1000);
				// 当组件内部存在 sortable 盒子时，设置该盒子的 id
				if(attr_obj.child_id == -1) {
					attr_obj.child_id = Math.floor((new Date()).getTime());
				}
				// console.log(attr_obj)
				this.sorts.child.splice(0, 0, attr_obj);
				let obj = {
					id: this.sorts.id,
					type: 'add',
					index: 0,
					item: attr_obj,
				};
				this.back_data.push(obj);
				if(this.back_data.length > this.back_advance_len) {
					this.back_data = this.back_data.slice(this.back_data.length - this.back_advance_len);
				}
				// 当组件内部存在 sortable 盒子时，初始化该盒子
				if(attr_obj.child_id) {
					setTimeout(() => {
						_this.initSortable(attr_obj.child_id, this.isPhone, 2);
					}, 100)
				}
			},
			// 更新组件属性内容
			updateAttr(data) {
				// console.log('更新组件内容');
				const _this = this;
				let sorts = this.sorts;
				
				for(let k in sorts.child)
				{
					if(sorts.child[k].unique == data.unique) {
						let item = JSON.parse(JSON.stringify(sorts.child[k]));
						let obj = {
							id: sorts.id,
							type: 'update',
							unique: sorts.child[k].unique,
							item,
							new_data: data
						};
						// 当最后一次返回的数据和当前更新的数据一样则不再添加到返回上一步列表中
						if(JSON.stringify(obj.item) != JSON.stringify(this.back_last_data.item)) {
							this.back_data.push(obj);
							if(this.back_data.length > this.back_advance_len) {
								this.back_data = this.back_data.slice(this.back_data.length - this.back_advance_len);
							}
						}
						for(let kk in data)
						{
							_this.sorts.child[k][kk] = data[kk];
						}
						break;
					}
				}
				
				this.pageIsChange();
				this.$forceUpdate();
				// console.log(this.sorts)
			},
			// 使用 拖动 删除组件
			deleteComp(from_id, to_id, old_index, new_index) {
				let sorts = this.sorts;
				if(sorts.id == from_id) {
					sorts.child.splice(old_index, 1);
				}
				else {
					for(let k in sorts.child)
					{
						if(sorts.child[k].child_id == from_id) {
							sorts.child[k].child.splice(old_index, 1)
						}
					}
				}
				// console.log('删除成功')
				// this.saveLayout();
				// window.parent.postMessage({
				// 	method: 'deleteSuccess',
				// }, '*');
			},
			// 监听页面布局改变，发送信号到父窗口
			pageIsChange() {
				// let data_sorts = this.data_sorts;
				// let sorts = JSON.stringify(this.sorts);
				if(this.isPageChange) {
					window.parent.postMessage({
						method: 'pageLayoutChange',
						data: {
							flag: false,
						}
					}, '*');
				}
				else {
					window.parent.postMessage({
						method: 'pageLayoutChange',
						data: {
							flag: true,
						}
					}, '*');
				}
			},
			// 鼠标点击组件获取该组件的 unique
			activeGetUnique(item) {
				// console.log(item)
				this.delete_unique = item.unique;
				window.parent.postMessage({
					method: 'activeGetUnique',
					data: {
						// unique,
						// sorts,
						item
					}
				}, '*')
			},
			// 使用 unique 删除组件
			deleteCompUnique() {
				let sorts = this.sorts;
				// false 删除不成功 true 删除成功
				let flag = false;
				
				for(let k in sorts.child)
				{
					if(sorts.child[k].unique == this.delete_unique) {
						let obj = {
							id: sorts.id,
							type: 'delete',
							index: k,
							item: sorts.child[k],
						}
						this.back_data.push(obj);
						if(this.back_data.length > this.back_advance_len) {
							this.back_data = this.back_data.slice(this.back_data.length - this.back_advance_len);
						}
						sorts.child.splice(k, 1);
						flag = true;
						break;
					}
					else if(sorts.child[k].child && sorts.child[k].child.length) {
						for(let kk in sorts.child[k].child)
						{
							let v = sorts.child[k].child[kk];
							if(v.unique == this.delete_unique) {
								let obj = {
									id: sorts.child[k].id,
									type: 'delete',
									index: kk,
									item: v,
								}
								this.back_data.push(obj);
								sorts.child[k].child.splice(kk, 1)
								flag = true;
								break;
							}
						}
					}
					if(flag) {
						break;
					}
				}
				
				this.pageIsChange();
				// if(flag) {
				// 	window.parent.postMessage({
				// 		method: 'deleteSuccess'
				// 	}, '*');
				// }
				// else {
				// 	window.parent.postMessage({
				// 		method: 'deleteFail'
				// 	}, '*');
				// }
			},
			// 返回上一步
			backData() {
				// sort 排序时 delete 删除时 add 新增组件时 update 更新组件属性时
				if(this.back_data.length <= 0) return; 
				const _this = this;
				let sorts = this.sorts;
				let obj = this.back_data.pop();
				// console.log('obj:', JSON.parse(JSON.stringify(obj)))
				// console.log('obj:', this.back_data)
				// 前进操作数据
				this.advance_data.push(JSON.parse(JSON.stringify(obj)));
				if(this.advance_data.length > this.back_advance_len) {
					this.advance_data = this.advance_data.slice(this.advance_data.length - this.back_advance_len);
				}
				// console.log(this.advance_data)
				switch(obj.type)
				{
					case 'sort':
						this.saveSort(obj.new_index, obj.old_index, obj.id);
						break;
					case 'delete':
						if(sorts.id == obj.id) {
							this.sorts.child.splice(obj.index, 0, obj.item);
							if(obj.item.child_id) {
								setTimeout(() => {
									_this.initSortable(obj.item.child_id, _this.isPhone, 2);
								}, 100)
							}
						}
						else {
							let childs = sorts.child;
							for(let k in childs)
							{
								if(childs[k].id == obj.id) {
									this.sorts.child[k].child.splice(obj.index, 0, obj.item);
								}
							}
						}
						break;
					case 'add':
						this.sorts.child.splice(obj.index, 1);
						break;
					case 'update':
						if(sorts.id == obj.id) {
							for(let k in sorts.child)
							{
								if(sorts.child[k].unique == obj.unique) {
									for(let kk in obj.item)
									{
										this.sorts.child[k][kk] = obj.item[kk];
									}
									break;
								}
							}
						}
						// 更新到父窗口
						window.parent.postMessage({
							method: 'activeGetUnique',
							data: {
								item: JSON.parse(JSON.stringify(obj.item))
							}
						}, '*');
						this.$forceUpdate();
						break;
				}
				this.back_last_data = JSON.parse(JSON.stringify(obj));
				this.pageIsChange();
				// console.log(obj, this.back_data);
			},
			// 根据 id 和 index 查找对应项
			searchByIdAndIndex(id, index) {
				let sorts = this.sorts;
				
				if(sorts.id == id) {
					return sorts.child[index];
				}
				else {
					let childs = sorts.child;
					for(let k in childs)
					{
						if(childs[k].id == id) {
							return childs[k][index];
						}
					}
				}
				return -1;
			},
			// 前进一步
			advance() {
				// 操作type: sort 排序 delete 删除 add 新增组件 update 更新组件属性
				if(this.advance_data.length <= 0) return; 
				const _this = this;
				let sorts = this.sorts;
				let obj = this.advance_data.pop();
				// console.log('advance:', JSON.parse(JSON.stringify(obj)));
				switch(obj.type)
				{
					case 'sort':
						this.saveSort(obj.old_index, obj.new_index, obj.id);
						break;
					case 'delete':
						if(sorts.id == obj.id) {
							this.sorts.child.splice(obj.index, 1);
							if(obj.item.child_id) {
								setTimeout(() => {
									_this.initSortable(obj.item.child_id, _this.isPhone, 2);
								}, 100)
							}
						}
						else {
							let childs = sorts.child;
							for(let k in childs)
							{
								if(childs[k].child_id == obj.child_id) {
									this.sorts.child[k].child.splice(obj.index, 1);
								}
							}
						}
						break;
					case 'add':
						this.sorts.child.splice(obj.index, 0, obj.item);
						break;
					case 'update':
						if(sorts.id == obj.id) {
							for(let k in sorts.child)
							{
								if(sorts.child[k].unique == obj.unique) {
									for(let kk in obj.new_data)
									{
										this.sorts.child[k][kk] = obj.new_data[kk];
									}
									break;
								}
							}
						}
						// 更新到父窗口
						window.parent.postMessage({
							method: 'activeGetUnique',
							data: {
								item: JSON.parse(JSON.stringify(obj.new_data))
							}
						}, '*');
						this.$forceUpdate();
						break;
				}
				this.pageIsChange();
			},
			// 设置页面信息
			setPageInfo(page_info) {
				uni.setNavigationBarTitle({
					title: page_info.page_name,
				})
			},
			// 页面信息设置成功
			setPageSuccess() {
				this.getEff();
			},
			// 获取页面主题并设置
			getPageTheme(){
				this.http.getPageTheme().then(res => {
					setTimeout(() => {
						uni.setNavigationBarColor({
							backgroundColor: '#ff0000'
						})
					}, 1000)
				})
			},
			// 更新页面主题
			updatePageTheme() {
				this.getPageTheme();
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.sortable_delete {
		position: fixed;
		top: 2rpx;
		left: 2rpx;
		width: 250rpx;
		height: 250rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2rpx dotted #F56C6C;
		padding: 40rpx;
		border-radius: 20rpx;
		color: #F56C6C;
		z-index: 999;
		background-color: white;
		transition: all 1s;
		overflow: hidden;
		* {
			width: 0;
			height: 0;
			overflow: hidden;
		}
	}
	
	.content {
		min-height: calc(100vh - 44px);

		.sortable {
			width: 100%;

			>* {
				margin-top: 30rpx;
				margin-bottom: 30rpx;
				&:first-child {
					margin-top: 0;
				}
				&:last-child {
					margin-bottom: 0;
					padding-bottom: 30rpx;
				}
			}
		}
	}
</style>
