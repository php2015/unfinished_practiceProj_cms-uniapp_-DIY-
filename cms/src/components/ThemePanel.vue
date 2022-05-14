<template>
	<div class="theme-panel" @click.stop="stop">
		<div class="title">主题设置</div>
		<div class="tip">提示：设置主题所有的页面都将生效</div>
		<div class="theme">
			<!-- 分类 -->
			<div class="category">
				<template v-for="(item,index) in category">
					<div class="cate-item" :key="index" :class="{'cate-item-active':index==category_index}" @click="changeCategory(index)">{{item}}</div>
				</template>
			</div>
			<!-- 主题列表 -->
			<div class="theme-list scrollbar">
				<template>
					<div class="theme-item" v-for="(item,index) in theme_list" :key="index" :class="{'theme-item-active':theme_index==index}" @click="choosetheme(index, item.value)">{{item.name}}</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import sortableModel from '@/api/sortable.js'
	
	export default {
		data () {
			return {
				category: [
					'全部',
					'红色',
					'黄色',
					'绿色',
					'蓝色',
					'紫色',
					'其他',
					'自定义',
				],
				// 模拟数据
				theme_list: [
					{name: '红色', value: '#f00'},
					{name: '蓝色', value: '#00f'},
					{name: '绿色', value: '#0f0'},
					{name: '橙色', value: '#f50'},
				],
				// 当前选中的类型
				category_index: 0,
				// 当前选中的主题
				theme_index: -1,
				// 页面主题内容
				page_theme: {},
			}
		},
		mounted() {
			this.getTheme();
		},
		methods: {
			stop() {
				
			},
			// 切换分类
			changeCategory(index) {
				this.category_index = index;
			},
			// 获取页面主题
			getTheme() {
				const _this = this;
				//手动演示
				const demo_data=[{
					"id": 1000,
					"path": "http://diy.qytocent.com/h5",
					"name": "index",
					"sortable": "{\"id\":\"sort-1\",\"level\":1,\"child\":[{\"sorts\":\"st-button\",\"name\":\"按钮\",\"img_url\":\"/img/st-button.b7626e7e.png\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"button_text\":\"\",\"theme_type\":\"error\",\"button_size\":\"mini\",\"button_shape\":\"square\",\"button_plain\":\"false\",\"unique\":1610789322},{\"sorts\":\"st-input\",\"name\":\"输入框\",\"img_url\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATQAAADICAYAAABmph1JAAAIt0lEQVR4nO3dv4vU+R3H8dVFRIwggoUgWFgI2cbCxsbGysbKSgj4DxwkOY4cJBeSXCMEbExtZSB8Kwk4MHjzen3mm/ULJ8OmsLjCwrBgIRyCiMhxet8U+938dE9n5/Odz8x7ng94tTefD8c9WT7M3q7Z/rvtljHGlnzbayZojLEYI2iMsTAjaIyxMCNojLEwI2iMsTAjaIyxMCNojLEwI2iMsTAjaIyxMCNojLEwI2iMsTAjaIyxMCNojLEwI2iMsTDbXrO9td9/gKSvbf+OMcZyTFLyjEGb5Se022sAkEkXNoIGYPkRNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhEDQAYRA0AGEQNABhrGzQJP1WUtrPbP+x1LkB7G1lg2b7LzOc+0GpcwPYG0EjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWEQNIIGhEHQCBoQBkEjaEAYBI2gAWFI+jNBI2jA0rP9ue0fCBpBA5bWZDI5ZLua4b9nglbq3AD+ra7rk7YfZYgZQQNQjqQNSc8yxYygAShD0lVJrzPGjKABmL+U0hee7fGfoBE0oKzBYHDYeR7/CRpBA8qp6/qU7a0eY0bQAPTP9nlJz3uOGUED0C/b12y/mUPMCBqA/tj+ck4hI2ilzg1E1zTNEdv35hwzggYgr+7x/3GBmBE0APnYvjCnx3+CRtCA/ki6Lum7gjEjaABm07btAds3C4dstYMmaVjq3EAUtn9i+68LELLdrWbQzE9owExsn7b9Tc4gSXqbUrpP0AgaMDcppYuSvs0cs5fj8fiS+ZsCBA2YF0nXbX+fM2a2n45Go7Nra/yRlP2em6ABU2jb9qCkWxkj1nrnJ7OHto/vfo4JGkED+jQcDo/afpArYruTdKeqqvX//CwTNIIG9GU0Gp1x/sf/dymlX7zv80zQCBrQh+6R/kXOmNl+JenyXp9pgkbQgNxs35D0NmPIWtvbks594HMJ2j5G0ID3qKpq3fbtjBHb3aOmaU586PNN0AgakMPm5uYxSSljxHZ3dzKZHPqYM5igETRgVqPR6KztJxkj1kp6Z/tX05zDBI2gAbMYj8eXJL3MHLPXKaUr056FoBE0YN9SSp/kfvyX9EzSxn7OQ9AIGjC1qqrWJd3JGbJuj+q6Prnfc5mgETRgGraPd79ylCtiu6s+9vH/R862skG71l1+6qWUflbq3EBJdV3/VNI/eojZb3Kcb2WDBmA6ki7bfpU5ZG8kXc11RoIG4IMk/bL7GkW2mEl6Zvt8znMSNAB76r75fzdnyLptzfL4vxeCBuC9mqY50dPj/73BYHC4jzMTNAD/R9KG7e3cMZP0hz7PTdAA/JeU0hVJrzOH7Dvb1/o+O0ED8C+2P+/h8f+57QtzOj9BA1bdZDI5ZLvKGbJuj+u6PjWvexA0YMXVdX3S9qPcMZN0v2maI/O8C0EDVpikje77YFljZvtm27YH5n0fggasKElX+3j8l3S91J0IGrCCUkpf2P4hc8y+9Zwe//dC0IAVMhgMDrufx/9vbJ8ufT+CBqyIuq5P2d7qIWYPhsPh0dL3W1sjaMBKsH2++z5Y1phJutW27cHS99tF0IDgvPP//nuTOWbf275R+m7/i6ABgdn+MnPIWtsvUkoXS9/tfQgaEFDTNEds3+shZk9Go9GZ0vfbC0EDguke/x/njpmktLm5eaz0/X4MQQMCsX2hj8d/23+qqmq99P0+hKABQUi63v1verKFrPubmzdK3+1jETRgybVte8D2zZwh62L2cjweXyp9v2kQNGCJDYfDo5Lu546Z7aej0ehs6ftNi6ABS8r2ae/8ylHWmElKto+Xvt9+EDRgCaWULna/DJ47ZncW6Zv/0yJowJKRdN0739TPGbK3tn9e+m6zImjAkmjb9qCkWzlD1u2VpMul75cDQQOWwHA4PGr7QQ8x25Z0rvT9ciFowIIbjUZn3M/j/8OmaU6Uvl9OBA1YYOPx+JLtF7ljZvvuMnzzf1oEDVhQtm90j/XZQibpXUrps9J36wtBAxZMVVXrtm/nDFkXs9cppSul79cnggYskM3NzWPdF1uzxsw7j/8bpe/XN4IGLIjRaHTW9pMeYvYo2uP/XggasADG4/ElSS97iFk1mUwOlb7fvBA0oLCU0ie5H/+98zc3f136bvNG0IBCqqpal3Qnc8ha228kXS19vxIIGlCA7eOSHuaOmaRnts+Xvl8pBA2YM0nnbD/NHTPbW3Vdnyx9v5IIGjBHki7bftVDzO4NBoPDpe9XGkED5sT2p5Le5Y6ZpN+XvtuiIGhAz7pv/t/NHTLv/DX0a6Xvt0gIGtCjpmlO9PT4/9wr/Pi/F4IG9ETShu3t3DGz/biu61Ol77eICBrQg5TSFUmvc8dM0v2maY6Uvt+iyhG0rRn+5XzdHYCxSPvKO9/UbzPvbwtwt4XejL/YP/NPaIwxtigjaIyxMCNojLEwI2iMsTAjaIyxMCNojLEwI2iMsTAjaIyxMCNojLEwI2iMsTAjaIyxMCNojLEwI2iMsTAjaIyxMCNojLEw2/4nlTk/EJnl9GwAAAAASUVORK5CYII=\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"input_type\":\"text\",\"default_value\":\"\",\"placeholder\":\"\",\"unique\":1610794355},{\"sorts\":\"st-notice\",\"name\":\"公告\",\"img_url\":\"/img/st-notice.9c167792.png\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"theme_type\":\"error\",\"notice_scroll\":\"vertical\",\"notice_join\":\"true\",\"notice_speed\":\"160\",\"notice_volume_icon\":\"true\",\"unique\":1610945166},{\"sorts\":\"st-input\",\"name\":\"输入框\",\"placeholder\":\"\",\"default_value\":\"\",\"img_url\":\"data:image/png;base64,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\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"unique\":1610780380}],\"disable\":false}",
					"type": "index",
					"page_name": "自定义首页",
					"page_background_color": "#F9FBFB"
				}]
				_this.page_theme = demo_data; 
				
				//走接口
				// sortableModel.getPageTheme().then(res => {
				// 	_this.page_theme = res.data;
				// 	_this.theme_index = _this.theme_list.findIndex((item) => {
				// 		return item.value == res.data.value
				// 	})
				// })
			},
			// 选中主题
			choosetheme(index, color) {
				const _this = this;
				this.theme_index = index;
				sortableModel.setPageTheme(color).then(res => {
					if(res.status == 200) {
						this.$message({
							message: '页面主题设置成功',
							type: 'success'
						})
						_this.$emit('updatePageTheme');
					}
					else {
						this.$message({
							message: '页面主题设置失败',
							type: 'error'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.theme-panel {
	width: 400px;
	height: 70vh;
	background-color: #fefefe;
	padding: 10px;
	color: #888;
	box-shadow: 0 0 10px #ccc;
	z-index: 999;
	
	.title {
		text-align: center;
		font-weight: 600;
		margin-bottom: 15px;
		color: #aaa;
	}
	
	.theme {
		width: 100%;
		height: 100%;
		margin-top: 20px;
		
		.category {
			display: flex;
			flex-wrap: wrap;
			
			.cate-item {
				margin-bottom: 5px;
				border: 1px solid #eee;
				padding: 5px 10px;
				margin-right: 5px;
				border-radius: 5px;
				transition: all 0.3s;
				
				&-active {
					border: 1px solid #409EFF;
					color: #409EFF;
				}
			}
		}
		
		.theme-list {
			width: calc(100% - 10px);
			height: calc(100% - 160px);
			border-top: 1px solid #eee;
			margin-top: 10px;
			padding: 10px 22px;
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			overflow: auto;
			
			.theme-item {
				width: 100px;
				height: 100px;
				border: 1px solid #eee;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10px;
				margin-bottom: 10px;
				transition: all 0.3s;
				&:hover {
					border: 1px solid #60b2ff;
					color: #60b2ff;
				}
				&:nth-child(3n) {
					margin-right: 0;
				}
				
				&-active {
					position: relative;
					border: 1px solid #409EFF;
					&::before {
						content: "✔";
						position: absolute;
						right: 14px;
						bottom: 20px;
						width: 0;
						height: 0;
						z-index: 999;
						color: white;
					}
					&::after {
						content: "";
						position: absolute;
						right: 0;
						bottom: 0;
						width: 0;
						height: 0;
						border-left: 30px solid transparent;
						border-bottom: 30px solid #409EFF;
					}
				}
			}
		}
	}
}
</style>
