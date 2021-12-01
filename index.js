/*
 * formErrorMsg 错误提示插件
 * author saojun
 * date 2021-11-18
 * more detail : https://github.com/saojun1024/formErrorMsg
 * 
 **/

const PopTips = {
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
			style:{
				'min-width':`${this.minWidth}px`
			}
		},[this.$slots.default])
	},

	inject: {
		elForm: {
			default: ''
		},
		elFormItem: {
			default: ''
		}
	},

	data(){
		return {
			visible:true
		}
	},

	props:{
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

		// 最小宽度
		minWidth:{
			type:Number,
			default:120
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
	mounted(){
		console.log(this.elFormItem)
	}
}

const FormErrorMsg = {
    install:function(_Vue){
        console.log("我被执行了",_Vue)
        _Vue.component("poptips",PopTips)
    }
}
