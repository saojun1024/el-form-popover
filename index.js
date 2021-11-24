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
		// element-ui 错误信息
		error:{
			type:Object,
			default:()=>{
				return {
					error:''
				}
			}
		},

		// 定位参考的元素
		refer:{
			type:String,
			default:'top'
		},

		// 出现位置
		placement:{
			type:String,
			default:'top'
		},

		// 最大宽度
		maxWidth:{
			type:String,
			default:'200px'
		},

		// 最小宽度
		minWidth:{
			type:String,
			default:'120px'
		},

		// 主题
		theme:{
			type:String,
			default:'light'
		},

		// 多少秒后隐藏
		hiddenAfter:{
			type:Number,
			default:0
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
