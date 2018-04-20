
import { INCREMENT,DECREMENT,LOGIN } from './types'

const mutations = {
	 [INCREMENT](state) {
	 	
		state.counter++;
		 console.log(state.counter)
	},
    [DECREMENT](state) {
    		console.log("----");
		state.counter--;
	},
	[LOGIN](state,payload) {
    	console.log("payload");
    	console.log(payload)
		state.user.login=payload.login;
	}
};

export default mutations
