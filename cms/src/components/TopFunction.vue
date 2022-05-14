<template>
	<div class="top-function">
		
		<div class="left">
			<div class="panel border-right" @click.stop="showPageList">
				<img src="@/assets/top-function-icon-img/page.png" alt="">
				<span>页面列表</span>
				<img src="@/assets/top-function-icon-img/down.png" alt="">
				<!-- 页面列表 -->
				<div @click.stop="stopBubbling">
					<page-list v-if="is_show_page_list" class="page-list" :page_list="page_list" :page_list_index="page_list_index" @changePage="changePage" @hidePageList="hidePageList" @updatePage="updatePage"></page-list>
				</div>
			</div>
			<div class="panel border-right" @click.stop="showThemePanel">
				<img src="@/assets/top-function-icon-img/theme.png" alt="">
				<span>主题设置</span>
				<img src="@/assets/top-function-icon-img/down.png" alt="">
				<!-- 页面主题面板 -->
				<theme-panel @updatePageTheme="updatePageTheme" v-if="is_show_theme_panel" class="theme-panel"></theme-panel>
			</div>
		</div>
		
		<div class="right">
			<div class="panel border-left" @click="setPage">
				<img src="@/assets/top-function-icon-img/set.png" alt="">
				<span>页面设置</span>
			</div>
			<div class="panel border-left" @click="save">
				<img src="@/assets/top-function-icon-img/save.png" alt="">
				<span>保存</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import PageList from '@/components/PageList.vue'
	import ThemePanel from '@/components/ThemePanel.vue'
	
	export default {
		props: {
			page_list: {
				type: Array
			},
			page_list_index: {
				type: Number
			}
		},
		components: {
			PageList,
			ThemePanel,
		},
		data () {
			return {
				is_show_page_list: false,
				is_show_theme_panel: false,
			}
		},
		methods: {
			stopBubbling(){},
			// 保存布局
			save() {
				this.$emit('save');
			},
			// 显示页面列表
			showPageList() {
				this.is_show_page_list = !this.is_show_page_list;
				this.hideThemePanel();
			},
			// 隐藏页面列表
			hidePageList() {
				this.is_show_page_list = false;
			},
			// 更改页面
			changePage(index, url, type, id) {
				this.$emit('changePage', index, url, type, id)
			},
			// 显示主题设置
			showThemePanel() {
				this.is_show_theme_panel = !this.is_show_theme_panel;
				this.hidePageList();
			},
			// 隐藏主题设置
			hideThemePanel() {
				this.is_show_theme_panel = false;
			},
			// 页面设置
			setPage() {
				this.$emit('setPage');
			},
			// 更新页面主题
			updatePageTheme() {
				this.$emit('updatePageTheme');
			},
			// 更新页面列表
			updatePage() {
				this.$emit('updatePage');
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.top-function {
	box-shadow: 0 0 10px #ddd;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	
	>div {
		display: flex;
		
		.panel {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			padding: 0 30px;
			font-size: 14px;
			transition: all 0.2s;
			color: #888;
			&:hover {
				color: #444;
				// color: rgba(64, 158, 255, 1);
				
				i {
					color: #444;
					// color: rgba(64, 158, 255, 1);
				}
			}
			
			>img {
				width: 17px;
				height: 17px;
				&:nth-child(1) {
					margin-right: 5px;
				}
				&:nth-child(3) {
					margin-left: 5px;
				}
			}
			
			.page-list {
				position: absolute;
				top: 55px;
				left: 0;
			}
			
			.theme-panel {
				position: absolute;
				top: 55px;
				left: -100px;
			}
		}
	}
	
	div.border-right {
		border-right: 1px solid #ddd;
	}
	
	div.border-left {
		border-left: 1px solid #ddd;
	}
	
	.submit-btn {
		padding: 20px;
	}
}
</style>
