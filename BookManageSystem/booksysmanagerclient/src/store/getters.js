/*Vuex 允许我们在 store 中定义『getters』
（可以认为是 store 的计算属性）。就像计算属性一样，
getters的返回值会根据它的依赖被缓存起来，
且只有当它的依赖值发生了改变才会被重新计算。*/


export default {
	count: (state) => {
		return state.counter+1000;
	},
	name: (state) => {
		return state.name+"好牛逼哦";
	},

	login:(state)=>{
		console.log(state)
		return state.user.login;
	}
}