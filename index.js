/*
 * formErrorMsg 错误提示插件
 * author saojun
 * date 2021-11-18
 * more detail : https://github.com/saojun1024/formErrorMsg
 * 
 **/


var FormErrorMsg = (function(){
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
				ioInstance:null
			}
		},
	
		watch:{
			'elFormItem.validateMessage':{
				handler(newVal){
					this.visible = newVal ? true : false
					if(this.refer){
						this.hiddenPopOutside()
					}
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
			},
	
			// refer 参考元素
			refer:{
				type:String,
				default:""
			}
		},
		mounted(){
			this.inputOnFocus()
			if(this.refer){
				this.hiddenPopOutside()
			}
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

			// 设置了参考元素，则隐藏在视野之外的气泡框
			hiddenPopOutside(){
				debugger
				const referEl = document.querySelector(this.refer).getBoundingClientRect()
				const slotEl = this.$slots.default[0].elm.getBoundingClientRect()
				if(slotEl.top < referEl.top || slotEl.top < referEl.bottom){
					this.visible = false
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
			},
	
			// initIntersectionObserver(){
			// 	console.log(this.$slots)
			// 	if(this.refer){
			// 		if(IntersectionObserver){
			// 			console.log(this)
			// 			this.ioInstance = new IntersectionObserver((entry)=>{
			// 				if(entry.intersectionRatio<=0){
			// 					this.visible = false
			// 				}else{
			// 					this.visible = true
			// 				}
			// 			},{
			// 				root:document.querySelector(this.refer)
			// 			});
			// 			this.ioInstance.observe(this.$parent.$el)
			// 		}else{
			// 			console.warn("your brower does not support IntersectionObserver API")
			// 		}
			// 	}
			// }
		}
	}

	return {
		version:'1.0.0',
		install:function(_Vue){
			_Vue.component("poptips",PopTips)
		}
	}
})()
