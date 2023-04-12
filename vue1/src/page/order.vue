<template>
	<div class="hello">


		<el-menu  class="el-menu-demo" mode="horizontal" background-color="#545c64"
			text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">快递管理</el-menu-item>
		</el-menu>

		<!-- <h1>element-ui表格</h1> -->
		<el-row class="table-grid-content">
			<el-col :span="18" class="grid">
				<el-input v-model="input" placeholder="请输入搜索内容"></el-input>
			</el-col>
			<el-col :span="3" class="grid" :gutter="1">
				<el-button type="success" icon="el-icon-search">搜索</el-button>
			</el-col>
			<!-- <el-col :span="2" class="grid" :gutter="15">
				<el-button type="primary" @click="addMembers()">增加</el-button>
			</el-col> -->
		</el-row>

		<el-table :data="tables" :stripe="true" :border="true" width="100%">
			<!-- <el-table-column label="寄件日期" prop="date"></el-table-column> -->

			<el-table-column label="寄件人姓名" prop="senderName"></el-table-column>
			<el-table-column label="寄件人电话" prop="senderTel"></el-table-column>
			<el-table-column label="寄件人地址" prop="senderAddress"></el-table-column>
			<el-table-column label="收件人姓名" prop="recipientName"></el-table-column>
			<el-table-column label="收件人电话" prop="recipientTel"></el-table-column>
			<el-table-column label="收件人地址" prop="recipientAddress"></el-table-column>
			<el-table-column label="快递单号" prop="expressNo"></el-table-column>
			<el-table-column label="快递公司" prop="expressCompany"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click="modifyData(scope.$index, scope.row)">分配</el-button>
					<el-button type="danger" @click="deleteData(scope.$index, tableData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>


		<el-dialog :visible.sync="centerDialogVisible">
			<el-form :model="editForm">

				<el-form-item label="快递员">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in Couriers" :key="item.courierNo" :label="item.realName" :value="item.courierNo">
						</el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<div>
				<el-button @click="closeDialog()">取消</el-button>
				<el-button type="primary" @click="sumbitEditRow()">确定</el-button>
			</div>
		</el-dialog>


		<!-- <el-dialog :visible.sync="isAddMembers">
			<el-form :model="addForm"> -->
		<!-- <el-form-item label="寄件日期" :picker-options="pickerOptions">
					<el-date-picker v-model="addForm.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item> -->
		<!-- <el-form-item label="商品">
					<el-input v-model="editForm.good"></el-input>
				</el-form-item>
				<el-form-item label="寄件人姓名">
					<el-input v-model="editForm.sendname"></el-input>
				</el-form-item>
				<el-form-item label="收件人姓名">
					<el-input v-model="editForm.rename"></el-input>
				</el-form-item>
				<el-form-item label="寄件人电话">
					<el-input v-model="editForm.sendtele"></el-input>
				</el-form-item>
				<el-form-item label="收件人电话">
					<el-input v-model="editForm.retele"></el-input>
				</el-form-item>
				<el-form-item label="寄件人地址">
					<el-input v-model="editForm.sendaddress"></el-input>
				</el-form-item>
				<el-form-item label="收件人地址">
					<el-input v-model="editForm.readdress"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button @click="closeDialog()">取消</el-button>
				<el-button type="primary" @click="sumbitAddRow()">确定</el-button>
			</div>
		</el-dialog> -->

	</div>
</template>

<script>
// import { musicBroadcastingDetails } from '@/api/index.js'
import axios from 'axios'
import qs from'qs'
var _index;
export default {
	name: 'order',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
			activeIndex2:true,
			centerDialogVisible: false,
			isAddMembers: false,
			editForm: [],
			addForm: [],
			searchData: '',
			input: '',
			id: '',
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			tableData: [
			],
			value:{},
			Couriers:[],
			_index:''
		}
	},
	methods: {

		async getExpressList() {
			try {
				let res = await axios.post(
					this.url+"/manager/getExpress"
				).then(res => {
					this.tableData = res.data;
					console.log(this.tableData)
				});
			} catch (e) {
				console.log(e);
			}
		},
		async initCouriers() {

			try {
				console.log(111)
				let res = await axios.post(
					this.url+"/manager/getCouriers"
				).then(res => {
					this.Couriers = res.data.data;
					console.log(this.Couriers);
					return res;
				});
			} catch (e) {
				console.log(e);
			}

		},

		deleteData(index, row) {
			this.tableData.splice(index, 1)
			console.log("进行了删除操作")
			console.log("index的值是：" + index)
			console.log("row的值是：", row)
		},
		modifyData(index, row) {
			this.value = "无	"
			this.centerDialogVisible = true
			_index = index;
			console.log("index的值：" + index)
			console.log("_index的值：" + _index)
			console.log("row的值是：", this.tableData.at(index)) //代表选择的这一行的数据
		},
		async sumbitEditRow() {
			let res = await axios.post(
					this.url+"/manager/allotExpressToCourier",qs.stringify({expressNo:this.tableData.at(this._index).expressNo,courierNo:this.value})
				).then(res => {
					this.Couriers = res.data.data;
					console.log(this.Couriers);
					this.$router.go(0);
					return res;
				});
			this.centerDialogVisible = false;
		},
		closeDialog() {
			this.centerDialogVisible = false
			this.isAddMembers = false
			console.log("editfrom", this.editForm)
			console.log("addfrom", this.addForm)

		},
		addMembers() {
			this.isAddMembers = true
			this.addForm = {
				name: '',
				date: '',
				address: ''
			}
		},
		sumbitAddRow() {
			this.tableData = this.tableData || []
			console.log("表格是:" + this.tableData)
			this.tableData.push({
				name: this.addForm.name,
				date: this.addForm.date,
				address: this.addForm.address
			})
			this.isAddMembers = false;
			console.log("新增的日期：" + this.addForm.date)
		}
	},
	mounted() {
		this.getExpressList();
		this.initCouriers();
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
</style>
