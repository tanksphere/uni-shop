export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	// 模块的state数据
	state: () => ({
		// 购的车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品信息对象都包含如下6个属性
		// {goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	// 模块的mutations方法
	mutations: {
		addToCart(state, goods) {
			// 根据提交的商品id，查询购物车是否存在这件商品
			// 如果不存在，则findResult为undefined，否则为查询到的商品对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult) {
				// 如果购物车中没有这件商品，则push
				state.cart.push(goods)
			} else {
				// 如果购物车中存在该商品，则增加数量
				findResult.goods_count++
			}
			
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult) {
				findResult.goods_state = goods.goods_state
				
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新商品数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据id删除对应的商品
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		// 更新购物车中所有商品状态
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	
	// 模块的getters属性
	getters: {
		// 统计购物车中商品的总数量
		total(state) {
			// let c = 0
			// // 循环统计商品的数量
			// state.cart.forEach(g => c += g.goods_count)
			// return c
			
			return state.cart.reduce((total, g) => total += g.goods_count, 0)
		},
		// 勾选商品的总数量
		checkedCount(state) {
			// 先使用filter方法，从购物车中过滤已勾选的商品
			// 再使用reduce方法，将已勾选的商品总数量进行累加
			// reduce()的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选商品总价
		checkedGoodsAmount(state) {
			// 先使用filter方法，从购物车中过滤已勾选的商品
			// 再使用reduce方法，将已勾选的商品数量 * 单价后进行累加
			// reduce方法的返回值就是已勾选的商品总价
			// 最后toFixed(2)方法保留两位小数
			return state.cart.filter(x => x.goods_state)
							 .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
							 .toFixed(2)
		}
	}
}