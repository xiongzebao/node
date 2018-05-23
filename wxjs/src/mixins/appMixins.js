import wepy from 'wepy'

export default class appMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {

     onInput(v){
      console.log("hi, "+v);
    },
     bindKeyInput(e){
      console.log("mixin input");
    }
  }

  onShow() {
     
  //console.log( this.methods.onInput);

  }

  onLoad() {
  
  }

   

  
}
