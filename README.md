## el-form-popover
一款使用 element-ui el-popover 气泡组件来展示表单验证错误的组件。

## 为什么开发此插件

element-ui 表单验证错误提示默认展示于输入框下面，或者可以通过配置与输入框一行展示。在页面空间有限情况下，例如表格单元格内有表单情况下，这种展示方式却不太适合，而使用气泡框来展示就最适合不过了。


## 使用条件
你的项目需要使用的是 vue2 技术和 element-ui 组件库来实现表单验证。




## 组件配置
|  属性   | 默认值  | 可选值 |描述 |
|  ----  | ----  | ---- | ---- |
| placement  | top | top/bottom/right | 气泡出现的方向，继承自 el-popover 组件，但只支持top/bottom/right |
| theme  | danger | danger/light | 气泡风格，默认红色背景，白色文字 |
| width  | auto | auto或者设置一个固定宽度，例如200px | 气泡宽度 |
| hiddenAfter  | 0 | 可选一个毫秒数 | 出现错误后，多少毫秒后消失，一般要搭配 trigger 属性一起使用 |
| trigger  | '' | 事件名称，例如change,focus | 当hiddenAfter不为0时，重新显示错误的事件触发方式 |
| refer  | '' | querySelector方法传入的参数 | 参考dom元素,用于控制不在此元素可视区域内的气泡不显示 |
| open-io  | false | 是否开启交叉观察器 | 用于控制出现滚动条时，隐藏不在可视区域的气泡组件 |

## 使用方法

### 基础使用
```html
<el-form :model="formData" :rules="rules" label-width="80px" ref="ruleForm" :show-message="false">
    <el-form-item label="姓名" prop="username">
        <el-form-popover placement="top">
            <el-input v-model="formData.username" style="width:240px"></el-input>
        </el-form-popover>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
        <el-form-popover placement="top">
            <el-radio-group v-model="formData.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio label="">未知</el-radio>
            </el-radio-group>
        </el-form-popover>	
    </el-form-item>

    <el-form-item label="手机号" prop="telphone" style="width:320px">
        <el-form-popover placement="right">
            <el-input v-model="formData.telphone"></el-input>
        </el-form-popover>
    </el-form-item>

    <el-form-item>
        <el-button type="info" @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
</el-form>
```

### 滚动只展示可视区域
```html
<el-form :model="stuInfo" :rules="rules" label-width="80px" ref="ruleForm2" :show-message="false">
    <el-table :data="stuInfo.tableData" style="width:1000px" border :height="300" ref="table" id="myTable">
        <el-table-column label="姓名" prop="username">
            <template slot-scope="scope">
                <el-form-item 
                :prop="'tableData.' + scope.$index + '.username'"  
                :rules="{
                    required: true, message: '不能为空', trigger: 'blur'
                }">
                    <el-form-popover placement="bottom" refer="#myTable .el-table__body-wrapper" :open-io="true">
                        <el-input v-model="scope.row.username" @input="handleInput"></el-input>
                    </el-form-popover>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex">
            <template slot-scope="scope">
                <el-radio-group v-model="scope.row.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                </el-radio-group>
            </template>
        </el-table-column>
        <el-table-column label="电话" prop="telphone">
            <template slot-scope="scope">
                <el-input v-model="scope.row.telphone"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
                <el-button type="danger" @click="deletes(scope)">删除</el-button>
                <el-button type="primary">修改</el-button>
                <el-button v-if="scope.$index === stuInfo.tableData.length-1" type="success" @click="add">增加</el-button>
            </template>
        </el-table-column>
    </el-table>
</el-form>
```










