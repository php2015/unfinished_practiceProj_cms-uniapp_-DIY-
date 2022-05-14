<template>
	<div class="right-menu">
		<div class="menu" @click="back">
			<img class="img-icon" src="@/assets/icom-img/back.png" alt="">
			<!-- <span class="tip">后退</span> -->
		</div>
		<div class="menu" @click="advance">
			<img class="img-icon" src="@/assets/icom-img/advance.png" alt="">
			<!-- <span class="tip">前进</span> -->
		</div>
		<div class="menu" @click="refreshPhone">
			<img class="img-icon" src="@/assets/icom-img/refresh.png" alt="">
			<!-- <span class="tip">刷新</span> -->
		</div>
		<div class="menu" @click="deleteComp">
			<img class="img-icon" src="@/assets/icom-img/delete.png" alt="">
			<!-- <span class="tip">删除</span> -->
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			// 刷新 iframe
			refreshPhone() {
				this.$emit('refreshPhone');
			},
			// 删除选中的组件
			deleteComp() {
				this.$emit('deleteComp');
			},
			// 后退
			back() {
				this.$emit('backData');
			},
			// 前进
			advance() {
				this.$emit('advance');
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>

.right-menu {
	position: absolute;
	top: 10vh;
	right: 2px;
	width: 100px;
	height: 70vh;
	// padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	// background-color: white;
	box-shadow: none !important;

	>* {
		box-shadow: 0 0 10px #999;
		cursor: pointer;
		margin-bottom: 15px;
	}
	
	.menu {
		position: relative;
		border-radius: 50%;
		width: 45px;
		height: 45px;
		transition: all 0.5s;
		&:hover {
			.tip {
				animation: tipEff 1s ease-in;
				animation-fill-mode: forwards;
				display: block;
			}
		}
		
		.img-icon {
			width: 100%;
			height: 100%;
		}
		
		.tip {
			position: absolute;
			display: none;
			left: -40px;
			top: 10px;
			z-index: 9999;
			color: #777;
		}
		@keyframes tipEff {
			0% {
				opacity: 1;
				top: 10px;
			}
			100% {
				opacity: 0;
				top: -50px;
				display: none;
			}
		}
	}
}
</style>
