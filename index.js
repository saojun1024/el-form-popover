/*
 * formErrorMsg 错误提示插件
 * author saojun
 * date 2021-11-18
 * more detail : https://github.com/saojun1024/formErrorMsg
 * 
 **/

const PopTips = {
	// template:
	// `<div :class="['pop-tips','pop-tips__${this.placement}']">
	// 	<slot/>
	// </div>`,
	render:function(h,context){
		if(this.hiddenAfter){
			setTimeout(()=>{
				this.visible = false
			},this.hiddenAfter)
		}
		return h("div",{
			class:{
				'pop-tips':true,
				[`pop-tips__${this.placement}`]:true,
				'pop-tips--hidden':this.visible === false
			},
		},[this.$slots.default || error.error])
	},


	data(){
		return {
			visible:true
		}
	},

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
	}
}

const FormErrorMsg = {
    install:function(_Vue){
        console.log("我被执行了",_Vue)
        _Vue.component("poptips",PopTips)
    }
}
