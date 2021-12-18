/*
 * formErrorMsg 错误提示插件
 * author saojun
 * date 2021-11-18
 * more detail : https://github.com/saojun1024/formErrorMsg
 * 
 **/

const PopTips = {
	template:`
	<el-popover
   	 	placement="bottom"
    	title="标题"
    width="200"
    trigger="manual"
    :content="msg"
    v-model="visible">
	<template slot="reference">
	<slot></slot>
	</template>
	
  	</el-popover>
`,
	inject:['elFormItem'],
	data(){
		return {
			visible:false,
			msg:''
		}
	},

	watch:{
		'elFormItem.validateMessage':{
			handler(newVal){
				this.visible = newVal ? true : false
				this.msg = newVal
			}
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
