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
			title=""
			trigger="manual"
			:popper-class="'pop-tips'+' pop-tips--'+ theme"
			:placement="placement"
			:width="width"
			:content="errorMsg"
			v-model="visible"
			@show="showPopover">
			<template slot="reference">
				<slot></slot>
			</template>
		</el-popover>
	`,
	inject:['elFormItem'],
	data(){
		return {
			once:false,
			inputEl:null,
			visible:false,
			errorMsg:'',
			popoverStyle:{
				padding:'8px',
				background:'red',
				color:'white'
			}
		}
	},

	watch:{
		'elFormItem.validateMessage':{
			handler(newVal){
				this.visible = newVal ? true : false
				this.errorMsg = newVal
				this.once = this.errorMsg ? false : true
			}
		}
	},

	props:{
		// hidden-after不为0时重新显示错误信息的触发方式
		trigger:{
			type:String,
			default:'change'
		},

		// 出现位置 支持 top bottom right
		placement:{
			type:String,
			default:'top'
		},

		// 宽度 数值或者设置成auto等
		width:{
			type:Number|String,
			default:'auto'
		},

		// 主题 danger 以及light
		theme:{
			type:String,
			default:'danger'
		},

		// 多少秒后隐藏
		hiddenAfter:{
			type:Number,
			default:0
		},

		// 自动隐藏,当设置成hiddenAfter以及trigger时，以后事件触发后会不会再次自动隐藏
		autoHidden:{
			type:Boolean,
			default:false
		}
	},
	mounted(){
		this.inputOnFocus()
	},

	beforeDestroy(){
		this.inputEl.$off(this.trigger)
	},

	methods:{
		// 设置了过多少毫秒后需要监听focus事件来重新显示错误信息
		inputOnFocus(){
			if(this.hiddenAfter){
				this.inputEl = this.$children[0].$children[0]
				this.inputEl.$on(this.trigger,()=>{
					if(this.errorMsg){
						this.visible = true
					}
				})
			}
		},

		showPopover(){
			if(this.hiddenAfter){
				if(this.autoHidden){
					setTimeout(()=>{
						this.visible = false
					},this.hiddenAfter)
				} else {
					if(this.once === false){
						setTimeout(()=>{
							this.visible = false
							this.once = true
						},this.hiddenAfter)
					}
				}
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
