<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<!-- <view class="swiper-item">
					<image :src="item.image_src"></image>
				</view> -->
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<image class="nav-image" :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<!-- 楼层容器 -->
		<view class="floor-list">
			<!-- 每个楼层的item项 -->
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片盒子 -->
					<!-- <view class="left-img-box">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</view> -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧4个小图片盒子 -->
					<view class="right-img-box"><!-- 
						<view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 > 0">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
						</view> -->
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 > 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据列表
				swiperList: [],
				// 分类导航数据列表
				navList: [],
				// 楼层数据列表
				floorList: [],
			};
		},
		onLoad() {
			// 调取方法获取轮播图数据
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {data: res} = await uni.$http.get("/api/public/v1/home/swiperdata")
				// if(res.meta.status !== 200) {
				// 	return uni.showToast({
				// 		title: '数据请求失败',
				// 		duration: 1500,
				// 		icon: 'none'
				// 	})
				// }
				if(res.meta.status !== 200) return uni.$showMsg()
				
				this.swiperList = res.message
				uni.$showMsg("数据请求成功")
			},
			async getNavList() {
				const {data: res} = await uni.$http.get("/api/public/v1/home/catitems")
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			navClickHandler(item) {
				if(item.name === '分类')  {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			async getFloorList() {
				const {data: res} = await uni.$http.get("/api/public/v1/home/floordata")
				if(res.meta.status !== 200) return uni.$showMsg()
				res.message.forEach(floor => {
					floor.product_list.forEach(product => {
						product.url = '/subpkg/goods_list/goods_list?' + product.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;
		.swiper-item, 
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		
		.nav-image {
			width: 128rpx;
			height: 140rpx;
		}
	}
	
	.floor-title {
		width: 100%;
		height: 60rpx;
	}
	
	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.floor-img-box {
		display: flex;
		padding-left: 10px;
	}
	
	.search-box {
		// 设置定位效果为吸顶
		position: sticky;
		// 吸顶的“位置”
		top: 0;
		// 提高层级，防止被轮播图覆盖
		z-index: 999;
	}
</style>
