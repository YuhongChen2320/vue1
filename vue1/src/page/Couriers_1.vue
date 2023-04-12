<template>
	<div class="hello">
		<el-row class="table-grid-content">
			<el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
				<el-input class="goodsindex-queryInfo-li" v-model="input"  clearable size="small" placeholder="请输入服务名称"></el-input>
			</el-col>
			<el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
				<el-button type="primary" class="goodsindex-queryInfo-li"  size="small" >搜索</el-button>
			</el-col>
		</el-row>

        
		<el-row :gutter="20" class="goodsindex-list">
            <el-col :span="24">
		        <el-table :data="tables.slice((currentPage-1)*pageSize,currentPage*pageSize)" :stripe="true" :border="true" size='small' width="100%">
			        <el-table-column
                    type="index"
                    label="序"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="uid"
                    label="用户编号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="sid"
                    label="服务员编号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="sname"
                    label="服务员"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="aid"
                    label="地址"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="价格"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="orderno"
                    label="订单编号"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="状态"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="starttime"
                    label="开始时间"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="endtime"
                    label="结束时间"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="pid"
                    label="服务编号"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="pname"
                    label="服务名称"
                    width="80">
                    </el-table-column>
		        </el-table>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="centerDialogVisible">
			<el-form :model="editForm">
				<el-form-item label="序">
					<el-input v-model="editForm.index"></el-input>
				</el-form-item>
				<el-form-item label="用户编号">
					<el-input v-model="editForm.uid"></el-input>
				</el-form-item>
				<el-form-item label="服务员编号">
					<el-input v-model="editForm.isd"></el-input>
				</el-form-item>
				<el-form-item label="服务员">
					<el-input v-model="editForm.sname"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="editForm.aid"></el-input>
				</el-form-item>
				<el-form-item label="价格">
					<el-input v-model="editForm.price"></el-input>
				</el-form-item>
				<el-form-item label="订单编号">
					<el-input v-model="editForm.orderno"></el-input>
				</el-form-item>
                <el-form-item label="状态">
					<el-input v-model="editForm.state"></el-input>
				</el-form-item>
                <el-form-item label="开始时间">
					<el-input v-model="editForm.starttime"></el-input>
				</el-form-item>
                <el-form-item label="结束时间">
					<el-input v-model="editForm.endtime"></el-input>
				</el-form-item>
                <el-form-item label="服务编号">
					<el-input v-model="editForm.pid"></el-input>
				</el-form-item>
                <el-form-item label="服务名称">
					<el-input v-model="editForm.pname"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
        <!-- 分页 -->
        <el-row :gutter="20" class="goodsindex-list">
            <el-col :span="24" class="goodsindex-page-box">
                <el-pagination
                    :hide-on-single-page="false"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>

	</div>
</template>

<script>
	// import { musicBroadcastingDetails } from '@/api/index.js'
	import axios from 'axios'
	var _index;
	export default {
		name: 'order',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				centerDialogVisible: false,
				isAddMembers: false,
				editForm: [],
				addForm: [],
				searchData: '',
				input: '',
				id:'',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
                queryInfo:{
                    pname: '',
                    pclass: '',
                    page: 1 ,
                    pageSize: 10
                },
                tableData: [],
                total: 0,
                currentPage: 1,
                pageSize: 10
			}
		},
		methods: {
            handleSizeChange(pageSize){
                this.pageSize = pageSize
            },
            handleCurrentChange(currentPage){
                this.currentPage = currentPage;
            },
		},
		computed: {
			tables() {
				const input = this.input
				if (input) {
					console.log("input输入的搜索内容：" + this.input)
					return this.tableData.filter(data => {
						console.log("object:" + Object.keys(data))
						return Object.keys(data).some(key => {
							return String(data[key]).toLowerCase().indexOf(input) > -1
						})
					})
				}
				return this.tableData
			}
		},
        beforeCreate: function(){
            axios.post('order/getorderbycondi',
                {},
                {
                    headers: {
                        'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNzU1ZjYwNy1lZGZhLTQwNzktOWIxYi04MDI5OGJhYTkxODQiLCJpYXQiOjE2ODA0Mjc5OTksImlzcyI6Inh4eCIsImV4cCI6MTcxMTk2Mzk5OSwidXNlcklkIjoiNzU3In0.JgmZ8TcLtWF9py4nUwl0c9t9RzjdmQE3eOBoCdtIujI'
                    }
                }
            ).then((res) =>  {
                console.log(res);
                let data = res.data;
                this.tableData = data;
                this.total = res.data.length;
            }).catch((error) => {
                console.log(error);
            })
        }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.table-grid-content {
		border-radius: 4px;
		height: 50 px;
		background: #ebeef5;
		padding: 10px;
    }
.goodsindex{
    width: 100%;
    min-height: 100%;
    padding: 15px;
    box-sizing: border-box;
}
/* 搜索 */
.goodsindex-queryInfo{
    margin-bottom: 10px;
}
.goodsindex-queryInfo-li{
    width: 100%;
    height: auto;
}
/* 列表 */
.goodsindex-list{
    width: 100%;
    height: auto;
    margin-bottom: 20px;
}
/* 分页 */
.goodsindex-page-box{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
}
</style>
