// 1. 导入 Vue和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车的vuex模块
import moduleCart from './cart.js'
// 导入用户的vuex模块
import moduleUser from './user.js'

// 2. 将vuex安装为Vue插件
Vue.use(Vuex)

// 3. 创建Store的实例对象
const store = new Vuex.Store({
	modules: {
		//  挂载购物车的vuex模块，模块内成员的访问路径被调整为m_cart，例如
		// 购物车模块中 cart 数组的访问路径是m_cart/cart
		'm_cart': moduleCart,
		// 挂载用户的vuex模块，访问路径为m_user
		'm_user': moduleUser,
	}
})

export default store