<template>
	<div class="page-list">
		<div class="title">页面列表</div>
		<div class="operation">
			<img class="icon-img" @click="showAddPage" src="../assets/icom-img/add-1.png" alt="">
		</div>
		<ul class="scrollbar">
			<li v-for="(item,index) in page_list" :key="index" @click="changePage(index, item.path, item.type, item.id)" :class="{'li-active': index==page_list_index}">
				<span>{{item.name}}</span>
				<div class="img">
					<img v-if="item.type != 'index' && item.type != 'article' && item.type != 'us'" class="icon-img" @click.stop="deletePage(item.id)" src="../assets/icom-img/delete-1.png" alt="">
				</div>
			</li>
		</ul>
		
		<!-- 添加新页面弹框 -->
		<el-dialog title="添加新页面" :visible.sync="addDialogVisible" width="30%">
			<el-form label-width="120px">
				<el-form-item label="页面名称">
					<el-input v-model="form.name" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="移动端页面名称">
					<el-input v-model="form.page_name" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="页面类型" class="text-left">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option v-for="(item,index) in page_type_list" :key="index" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button type="success" @click="addPage">保存</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import sortableModel from '../api/sortable.js'
	
	export default {
		props: {
			page_list: {
				type: Array
			},
			page_list_index: {
				type: Number
			}
		},
		data() {
			return {
				form: {
					name: '',
					page_name: '',
					type: 'cover',
					page_background_color: '#fff',
					path: '',
					sortable: '{"id": "sort-1","level": 1,"child": [],"disable": false}',
				},
				page_type_list: [
					{value: 'cover', label: 'cover'},
					{value: 'article_list', label: 'article_list'},
					{value: 'pic_list', label: 'pic_list'},
				],
				addDialogVisible: false,
			}
		},
		methods: {
			changePage(index, url, type, id) {
				this.$emit('changePage', index, url, type, id)
			},
			// 显示添加新页面弹框
			showAddPage() {
				this.addDialogVisible = true;
			},
			// 添加页面
			addPage() {
				// console.log(this.form)
				const _this = this;
				this.addDialogVisible = false;
				
				sortableModel.getRunPath().then(res => {
					let arr = res.data.filter(item => item.key == 'run_path');
					_this.form.path = arr[0].value + 'pages/' + _this.form.type + '/' + _this.form.type;
					sortableModel.addPage(_this.form).then(res => {
						if(res.status == 200) {
							this.$message({
								message: '添加成功',
								type: 'success'
							})
							// 初始化表单
							_this.form.name = '';
							_this.form.page_name = '';
							_this.form.type = 'cover';
							// 初始化表单 end
							this.$emit('updatePage');
						}
						else {
							this.$message({
								message: '添加失败',
								type: 'error'
							})
						}
					})
				})
			},
			// 删除页面
			deletePage(id) {
				this.$confirm('删除不可恢复，是否继续', '提示', {
					type: 'warning'
				}).then(() => {
					sortableModel.deletePage(id).then(res => {
						if(res.status == 200) {
							this.$message({
								message: '删除成功',
								type: 'success'
							})
							this.$emit('updatePage');
						}
						else {
							this.$message({
								message: '删除失败',
								type: 'error'
							})
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

	.page-list {
		position: absolute;
		top: 0;
		left: 0;
		width: 250px;
		height: 70vh;
		background-color: #fefefe;
		padding: 10px;
		color: #888;
		box-shadow: 0 0 7px #ccc;

		.title {
			text-align: center;
			font-weight: 600;
			margin-bottom: 10px;
			color: #aaa;
		}

		.operation {
			display: flex;
			justify-content: flex-end;
			margin-bottom: 10px;

			.icon-img {
				width: 20px;
			}
		}

		ul {
			// 34px 是标题的高度
			height: calc(100% - 34px);
			overflow-y: auto;
			list-style: none;
			margin: 0;
			padding: 0;

			li {
				padding: 8px;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				cursor: pointer;
				transition: all 0.5s;
				border: 1px solid white;
				margin-bottom: 2px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				&:hover {
					border: 1px solid rgba(64, 158, 255, .3);
					background-color: rgba(64, 158, 255, .1);
					.img {
						
						.icon-img {
							display: block;
						}
					}
				}
				
				.img {
					height: 100%;
					padding: 0 10px;
					&:hover {
						
						.icon-img {
							animation: Rotation 0.3s linear;
						}
					}
					
					.icon-img {
						display: none;
						width: 10px;
						height: 10px;
						flex-shrink: 0;
					}
					
					@keyframes Rotation {
						0% {
							transform: rotate(0deg);
						}
						100% {
							transform: rotate(90deg);
						}
					}
				}
			}

			.li-active {
				border: 1px solid rgba(64, 158, 255, .3);
				background-color: rgba(64, 158, 255, .1);
			}
		}
	}
	
	.text-left {
		text-align: left;
	}
</style>
