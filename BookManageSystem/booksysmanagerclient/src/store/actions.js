import * as types from './types'

export default {

	increment: ({
		commit
	}) => {
		commit(types.INCREMENT);
	
	},
	decrement: ({
		commit
	}) => {
		commit(types.DECREMENT);
	},
	login:({
		commit
	},payload) => {
		commit(types.LOGIN,payload);
	},
	/*clickOdd: ({
		commit,
		state
	}) => {
		if (state.mutations.count % 2 == 0) {
			commit(types.INCREMENT);
		}
	},
	clickAsync: ({
		commit
	}) => {
		new Promise((resolve) => {
			setTimeout(function(){
				commit(types.INCREMENT);
			}, 1000);
		})
	}*/
}