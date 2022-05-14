<template>
	<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
		<swiper-item v-for="(item, index) in list" :key="index">
			<image class="img" :src="item.url" mode="scaleToFill"></image>
			<move-handle :isSelect="fun_select"  :isPhone="isPhone" @choose="activeGetSorts"></move-handle>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props: {
			isPhone: {
				type: Boolean,
			},
			dat: {
				type: Object,
			},
			list: {
				type: Array,
				default: () => [
					{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					},
					{
						id: 2,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					},
					{
						id: 3,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					} 
				]
			}
		},
		data () {
			return {
				
			}
		},
		computed:{
			fun_select(){
				if(this.vuex_xz.type=='swiper' && this.vuex_xz.id == this.dat.unique){
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

<style lang="scss" scoped>
//banner
.swiper {
	height: 150px;
	width: 100%;
	text-align: center;

	.img {
		width: 100%;
	}
}
</style>
