
 function isPC() {
         var userAgentInfo = navigator.userAgent;
         var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
         var flag = true;
         for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
               flag = false;
               break;
            }
         }
         return flag;
    }
 var ispc = isPC();
console.log(ispc);

if(isPC()){
 document.documentElement.style.fontSize=50+'px';

}else{
	console.log("phone");
		
	document.documentElement.style.fontSize = document.documentElement.clientWidth /7.5 + 'px';
window.addEventListener('resize',function(){
  document.documentElement.style.fontSize=
  document.documentElement.clientWidth/7.5+'px';
  })
}

