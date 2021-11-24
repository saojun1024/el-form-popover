/*
 * formErrorMsg 错误提示插件
 * author saojun
 * date 2021-11-18
 * more detail : https://github.com/saojun1024/formErrorMsg
 * 
 **/

const PopTips = {
	template:
	`<div class="pop-tips">
		<slot/>
	</div>`,
	props:{
		error:{
			type:Object,
			default:()=>{
				return {
					error:''
				}
			}
		}
	},
  data(){
    return {
			popStyle:{
				position:'absolute',
				left:0,
				bottom:"100%"
			}
    }
  }
}

const FormErrorMsg = {
    install:function(_Vue){
        console.log("我被执行了",_Vue)
        _Vue.component("poptips",PopTips)
    }
}
