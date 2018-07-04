class CONSTANT{
	static getCouragement( daysNum){

		 let baseTip = "您已经签到"+daysNum+"天"
		switch(daysNum){ 
			case 1:  baseTip+=",签到第一天，加油哦";return baseTip;
			case 2: baseTip+= " ,不错，第二天了";return baseTip;
		}
	    
	    if(daysNum>5&&daysNum<10){
	    	baseTip+= "经过大数据分析，培养一种习惯，一周是一个坎，坚持了这一周，你离成功更近了三分之一的距离，GoodLuck!";return baseTip;
	    }

	    return baseTip;

	}
}


module.exports = CONSTANT;