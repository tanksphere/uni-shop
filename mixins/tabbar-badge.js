

// 按需导入 mapGetters 辅助方法
import { mapGetters } from 'vuex'

export default {
	
	computed: {
		// 将m_cart模块中的total映射当前页面的计算属性
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		this.setBabge()
	},
	watch: {
		total() {
			this.setBabge()
		}
	},
	methods: {
		setBabge() {
			// 调用uni.setTabBarBadge()方法，为购物车设置右上角徽标
			uni.setTabBarBadge({
				index: 2,
				// text值必须是字符串，不能是数字
				text: this.total + ''
			})
		}
	}
}