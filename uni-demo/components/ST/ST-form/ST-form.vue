<template>
	<view>
		<u-form :model="form" ref="uForm">
			<view :id="dat.child_id"  class="sortable-panel">
				<template v-for="res in dat.child">
					<u-form-item label="1 姓名" v-if="res.sorts==1">
						<u-input v-model="form.name" />
						<move-handle :isPhone="isPhone" :level="2" @choose="activeGetSorts(res.unique)"></move-handle>
					</u-form-item>
					<u-form-item label="2 简介" v-if="res.sorts==2">
						<u-input v-model="form.intro" />
						<move-handle :isPhone="isPhone" :level="2" @choose="activeGetSorts(res.unique)"></move-handle>
					</u-form-item>
					<u-form-item label="3 性别" v-if="res.sorts==3">
						<u-input v-model="form.sex" />
						<move-handle :isPhone="isPhone" :level="2" @choose="activeGetSorts(res.unique)"></move-handle>
					</u-form-item>
					<u-form-item label="4 水果" v-if="res.sorts==4">
						<u-checkbox-group>
							<u-checkbox v-model="item.checked" v-for="(item, ind) in checkboxList" :key="ind" :name="item.name">
								{{ item.name }}
							</u-checkbox>
						</u-checkbox-group>
						<move-handle :isPhone="isPhone" :level="2" @choose="activeGetSorts(res.unique)"></move-handle>
					</u-form-item>
					<u-form-item label="5 味道" v-if="res.sorts==5">
						<u-radio-group v-model="radio">
							<u-radio v-for="(item, ind) in radioList" :key="ind" :name="item.name" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
						<move-handle :isPhone="isPhone" :level="2" @choose="activeGetSorts(res.unique)"></move-handle>
					</u-form-item>
					<u-form-item label="6 开关" v-if="res.sorts==6">
						<u-switch slot="right" v-model="switchVal"></u-switch>
						<move-handle :isPhone="isPhone" :level="2" @choose="activeGetSorts(res.unique)"></move-handle>
					</u-form-item>
				</template>
			</view>
			<move-handle :isSelect="fun_select" :isPhone="isPhone" @choose="activeGetSorts"></move-handle>
		</u-form>
	</view>
</template>

<script>
	export default {
		props: {
			isPhone: {
				type: Boolean,
			},
			dat: {
				type: Object,
			}
		},
		data () {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				},
				checkboxList: [{
						name: '苹果',
						checked: false,
						disabled: false
					},
					{
						name: '雪梨',
						checked: false,
						disabled: false
					},
					{
						name: '柠檬',
						checked: false,
						disabled: false
					}
				],
				radioList: [{
						name: '鲜甜',
						disabled: false
					},
					{
						name: '麻辣',
						disabled: false
					}
				],
				radio: '',
				switchVal: false,
			}
		},
		created() {
			// console.log(this.dat)
		},
		computed:{
			fun_select(){
				if(this.vuex_xz.type=='form' && this.vuex_xz.id == this.dat.unique){
					return true;
				}
				return false;				
			}
		},
		methods: {
			// 鼠标点击组件获取该组件的 unique
			activeGetSorts() { 
				this.$emit('getUnique', this.dat);
			},
		}
	}
</script>

<style>
</style>
