<template>
	<view class="st-shop-list">
		<template v-if="dat.list_type!='list-type-6'">
			<view class="shop-list" :class="[list_type[dat.list_type]]">
				<template v-for="(item,index) in list">
					<view class="shop">
						<view class="img">
							<image class="image" :class="[shop_shape[dat.shop_shape]]" :src="item.img_url" :mode="dat.list_type=='list-type-1'?'top':''"></image>
						</view>
						<view class="main">
							<view class="shop-body">
								<view class="title" v-if="dat.is_show_title">{{item.title}}</view>
								<view class="desc" v-if="dat.is_show_description">{{item.desc}}</view>
							</view>
							<view class="shop-foot">
								<view><text v-if="dat.is_show_price">{{item.price}}</text></view>
								<view><u-button v-if="dat.is_show_button" :type="dat.button_type" size="mini">{{dat.button_text}}</u-button></view>
							</view>
						</view>
					</view>
				</template>
			</view>
		</template>
		<template v-else>
			<view class="water-fall">
				<view class="shop-list shop-list-6">
					<template v-for="(item,index) in list_1">
						<view class="shop">
							<view class="img">
								<img class="image" :class="[shop_shape[dat.shop_shape]]" :src="item.img_url"></img>
							</view>
							<view class="main">
								<view class="shop-body">
									<view class="title" v-if="dat.is_show_title">{{item.title}}</view>
									<view class="desc" v-if="dat.is_show_description">{{item.desc}}</view>
								</view>
								<view class="shop-foot">
									<view><text v-if="dat.is_show_price">{{item.price}}</text></view>
									<view><u-button v-if="dat.is_show_button" :type="dat.button_type" size="mini">{{dat.button_text}}</u-button></view>
								</view>
							</view>
						</view>
					</template>
				</view>
				<view class="shop-list shop-list-6">
					<template v-for="(item,index) in list_2">
						<view class="shop">
							<view class="img">
								<img class="image" :class="[shop_shape[dat.shop_shape]]" :src="item.img_url"></img>
							</view>
							<view class="main">
								<view class="shop-body">
									<view class="title" v-if="dat.is_show_title">{{item.title}}</view>
									<view class="desc" v-if="dat.is_show_description">{{item.desc}}</view>
								</view>
								<view class="shop-foot">
									<view><text v-if="dat.is_show_price">{{item.price}}</text></view>
									<view><u-button v-if="dat.is_show_button" :type="dat.button_type" size="mini">{{dat.button_text}}</u-button></view>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
		</template>
		<move-handle :isSelect="fun_select" :isPhone="isPhone" @choose="activeGetSorts"></move-handle>
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
				// 列表样式表
				list_type: {
					'list-type-1': 'shop-list-1',
					'list-type-2': 'shop-list-2',
					'list-type-3': 'shop-list-3',
					'list-type-4': 'shop-list-4',
					'list-type-5': 'shop-list-5',
					'list-type-6': 'shop-list-6',
				},
				// 图片角样式表
				shop_shape: {
					'square': 'shop-shape',
					'circle': 'shop-circle'
				},
				// 当样式为瀑布流时
				list_1: [],
				list_2: [],
				list: [
					{
						img_url: require('./img/11.jpeg'),
						title: '这是标题',
						desc: '这是商品的描述',
						price: 16.5,
					},
					{
						img_url: require('./img/12.jpeg'),
						title: '这是标题这是标题这是标题这是是标题这是标题',
						desc: '这是商品的描述这是商品的描述这是描述这是商品的描述这是商品的描述',
						price: 16.5,
					},
					{
						img_url: require('./img/13.jpeg'),
						title: '这是标题这题这是标题这是标题这是标题',
						desc: '这是商品的描述这是描这是商品的描述这是商品的描述',
						price: 16.5,
					},
					{
						img_url: require('./img/14.jpeg'),
						title: '这是标题这是是标题这是标题',
						desc: '这是商品的描述这是商品的描述这这是商品的描述这是商品的描述',
						price: 16.5,
					} 
				]
			}
		},
		watch: {
			is_list_type() {}
		},
		computed: {
			is_list_type() {
				if(this.dat.list_type == 'list-type-6') {
					this.waterFallInit();
					return true;
				}
				return false;;
			},
			fun_select(){
				if(this.vuex_xz.type=='shop-list' && this.vuex_xz.id == this.dat.unique){
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
			// 当样式为瀑布流时
			waterFallInit() {
				for(let k in this.list)
				{
					if(k % 2 == 0) {
						this.list_1.push(this.list[k]);
					}
					else {
						this.list_2.push(this.list[k]);
					}
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.st-shop-list {
	width: 100vw;
	padding: 10rpx;
	
	.shop-list {
		display: flex;
		width: calc(750upx - 20rpx);
		.shop {
			.img {
				overflow: hidden;
				.image {
					width: 100%;
					height: 100%;
				}
			}
			.main {
				.shop-body {
					.title {
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.desc {
						color: #777;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						font-size: 0.8rem;
					}
				}
				.shop-foot {
					display: flex;
					justify-content: space-between;
					align-items: center;
					>view {
						color: red;
						>text {
							&::before {
								content: "￥";
								font-size: 0.7rem;
							}
						}
						>button {
							margin: 0;
						}
					}
				}
			}
		}
		
		&-1 {
			flex-direction: column;
			.shop {
				margin-bottom: 20rpx;
				.img {
					width: calc(750upx - 20rpx);
					height: calc(750upx - 320rpx);
				}
				.main {
					margin-top: 10rpx;
					.shop-body {
						.title {
							margin-bottom: 10rpx;
						}
						.desc {
							margin-bottom: 10rpx;
						}
					}
				}
			}
		}
		
		&-2 {
			flex-wrap: wrap;
			width: calc(750upx - 20rpx);
			.shop {
				display: flex;
				flex-direction: column;
				align-items: center;
				// width: 50%;
				// modify
				width: 49%;
				&:nth-child(2n-1) {
					margin-right: 2%;
				}
				// modify end
				margin-bottom: 20rpx;
				padding: 10rpx;
				>view {
					width: 100%;
				}
				.img {
					width: calc(750upx / 2 - 20rpx - 10rpx);
					height: calc(750upx / 2 - 20rpx - 10rpx);
				}
				.main {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex-grow: 1;
					margin-top: 10rpx;
					.shop-body {
						.title {
						}
						.desc {
							margin: 10rpx 0;
						}
					}
					.shop-foot {
						margin-top: 10rpx;
					}
				}
			}
		}
		
		&-3 {
			overflow-x: scroll;
			.shop {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: calc(750upx / 3 - 10rpx);
				margin-bottom: 20rpx;
				padding: 10rpx;
				>view {
					width: 100%;
				}
				.img {
					width: calc(750upx / 3 - 20rpx - 10rpx);
					height: calc(750upx / 3 - 20rpx - 10rpx);
				}
				.main {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex-grow: 1;
					margin-top: 10rpx;
					.shop-body {
						.title {
						}
						.desc {
							margin: 10rpx 0;
						}
					}
					.shop-foot {
						margin-top: 10rpx;
					}
				}
			}
		}
		
		&-4 {
			flex-direction: column;
			.shop {
				display: flex;
				margin-bottom: 15rpx;
				.img {
					width: 150rpx;
					height: 150rpx;
					margin-right: 15rpx;
					flex-shrink: 0;
					.image {
						height: 100%;
						width: 100%;
					}
				}
				.main {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: calc(100% - 150rpx - 15rpx);
					.shop-body {
						width: 100%;
						.title {
							width: 100%;
						}
						.desc {
							font-size: 0.8rem;
							margin-top: 10rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
					.shop-foot {
						width: 100%;
						margin-top: 10rpx;
						
					}
				}
			}
		}
		
		&-5 {
			flex-wrap: wrap;
			width: calc(750upx - 20rpx);
			.shop {
				display: flex;
				flex-direction: column;
				align-items: center;
				// width: calc(750upx / 3 - 10rpx);
				// modify
				width: 33%;
				margin-right: 0.5%;
				&:nth-child(3n) {
					margin-right: 0;
				}
				// modify end
				margin-bottom: 20rpx;
				padding: 10rpx;
				>view {
					width: 100%;
				}
				.img {
					width: calc(750upx / 3 - 20rpx - 10rpx);
					height: calc(750upx / 3 - 20rpx - 10rpx);
				}
				.main {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex-grow: 1;
					margin-top: 10rpx;
					.shop-body {
						.title {
						}
						.desc {
							margin: 10rpx 0;
						}
					}
					.shop-foot {
						margin-top: 10rpx;
					}
				}
			}
		}
		
		&-6 {
			width: 50%;
			display: block;
			.shop {
				margin-bottom: 20rpx;
				padding: 10rpx;
				// modify
				width: 98%;
				margin-right: 2%;
				// modify end
				>view {
					width: 100%;
				}
				.img {
					width: 100%;
					.image {
						width: 100%;
					}
				}
				.main {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex-grow: 1;
					margin-top: 10rpx;
					.shop-body {
						.title {
						}
						.desc {
							margin: 10rpx 0;
						}
					}
					.shop-foot {
						margin-top: 10rpx;
					}
				}
			}
		}
	}
	
	.water-fall {
		width: 100%;
		display: flex;
	}
}

// 图片角形状
.shop-square {
	border-radius: 0;
}
.shop-circle {
	border-radius: 10rpx;
}
// 图片角形状 end

// 商品样式
.main-1 {
	
}
.main-2 {
	.shop {
		background-color: white;
		padding: 0 !important;
		.img {
			width: 100% !important;
			.image {
				width: 100%;
			}
		}
		.main {
			padding: 10rpx;
		}
	}
}
.main-3 {
	// box-shadow: 0 0 20rpx #eee;
}
// 商品样式 end

</style>
