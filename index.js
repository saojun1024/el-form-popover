/*
 * ElFormPopover 错误提示插件
 * author saojun
 * date 2021-11-18
 * more detail : https://github.com/saojun1024/elformpopover
 * 
 **/


var ElFormPopover = (function(){
	let io = null
	const ElFormPopover = {
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
				default:''
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
			},

			// 开启交叉观察器
			openIo:{
				type:Boolean,
				default:false
			}
		},
		
		mounted(){
			this.inputEl = this.$children[0].$children[0]
			if(this.refer){
				this.hiddenPopOutside()
			}
			if(!this.hiddenAfter){
				if(this.openIo){
					io = new IntersectionObserver((entries)=>{
						entries.forEach((item)=>{
							if(item.intersectionRatio <= 0 && this.errorMsg){
								this.visible = false
							}
							if(item.intersectionRatio > 0 && this.errorMsg){
								this.visible = true
							}
						})
					});
					io.observe(this.inputEl.$el)
				}
			}else{
				this.inputOnFocus()
			}
		},
	
		beforeDestroy(){
			this.inputEl.$off(this.trigger)
			if(io){
				io.unobserve(this.inputEl.$el);
			}
		},
	
		methods:{
			// 设置了过多少毫秒后需要监听focus事件来重新显示错误信息
			inputOnFocus(){
				// if(this.hiddenAfter){
				// 	this.inputEl = this.$children[0].$children[0]
				// 	this.inputEl.$el.addEventListener(this.trigger,()=>{
				// 		if(this.errorMsg){
				// 			this.visible = true
				// 			if(this.hiddenAfter && this.hiddenAfter>0){
				// 				setTimeout(()=>{
				// 					this.visible = false
				// 				},this.hiddenAfter)
				// 			}
				// 		}
				// 	})
				// }
				
				if(this.trigger){
					this.inputEl.$el.addEventListener(this.trigger,()=>{
						if(this.errorMsg){
							this.visible = true
							if(this.hiddenAfter && this.hiddenAfter>0){
								setTimeout(()=>{
									this.visible = false
								},this.hiddenAfter)
							}
						}
					})
				}
			},

			// 设置了参考元素，则隐藏在视野之外的气泡框
			hiddenPopOutside(){
				const referEl = document.querySelector(this.refer).getBoundingClientRect()
				const slotEl = this.$slots.default[0].elm.getBoundingClientRect()
				const isVisible = (referEl.top<=slotEl.top) && (slotEl.top <= referEl.bottom)
				if(!isVisible){
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
			}
			
		}
	}

	return {
		version:'1.0.0',
		install:function(_Vue){
			_Vue.component("ElFormPopover",ElFormPopover)
		}
	}
})()























