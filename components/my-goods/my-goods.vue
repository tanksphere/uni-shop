<template>
	<view>
		<view class="goods-item">
			<!-- 左侧盒子 -->
			<view class="goods-item-left">
				<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
			</view>
			<!-- 右侧盒子 -->
			<view class="goods-item-right">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
					<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 定义props属性，用来接收外界传递到当前组件的数据
		props: {
			// 商品的信息对象
			goods: {
				type: Object,
				default: {}
			},
			// 是否展示左侧的radio
			showRadio: {
				type: Boolean,
				// 如果外界没有指定show-radio属性的值，则默认不展示radio组件
				default:false
			},
			showNum: {
				type: Boolean,
				default: false 
			}
		},
		name:"my-goods",
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			// radio组件的点击事件处理函数
			radioClickHandler(e) {
				// 通过this.$emit()触发外界通过@绑定的radio-change事件
				// 同时把商品的id和勾选状态作为参数传递给radio-change事件处理函数
				this.$emit('radio-change', {
					// 商品id 
					goods_id: this.goods.goods_id,
					// 商品勾选状态
					goods_state: !this.goods.goods_state
				})
			},
			// 监听到num-box组件数量变化事件
			numChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #F0F0F0;
		
		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		
		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			
			.goods-name {
				font-size: 13px;
			}
			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
