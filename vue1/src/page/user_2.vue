<template>
	<div class="hello">
		<!-- <h1>element-ui表格</h1> -->
		<el-row class="table-grid-content">
			<el-col :span="18" class="grid">
				<el-input v-model="input" placeholder="请输入搜索内容"></el-input>
			</el-col>
			<el-col :span="3" class="grid" :gutter="1">
				<el-button type="success" icon="el-icon-search">搜索</el-button>
			</el-col>
			<el-col :span="2" class="grid" :gutter="15">
				<el-button type="primary" @click="addMembers()">增加</el-button>
			</el-col>
		</el-row>

		<el-table :data="tables" :stripe="true" :border="true" width="100%">
			<!-- <el-table-column label="寄件日期" prop="date"></el-table-column> -->
			<el-table-column label="快递公司" prop="expressCompany"></el-table-column>
			<el-table-column label="寄件人姓名" prop="senderName"></el-table-column>
			<el-table-column label="收件人姓名" prop="recipientName"></el-table-column>
			<el-table-column label="寄件人电话" prop="senderTel"></el-table-column>
			<el-table-column label="收件人电话" prop="recipientTel"></el-table-column>
			<el-table-column label="寄件人地址" prop="senderAddress"></el-table-column>
			<el-table-column label="收件人地址" prop="recipientAddress"></el-table-column>
			<el-table-column label="快递单号" prop="expressNo"></el-table-column>
			<el-table-column label="快递状态" prop="status">
				<template slot-scope="scope">
        			<span v-if="scope.row.status == 1">快递员未接单</span>
       				<span v-if="scope.row.status == 2">快递员已接单</span>
					<span v-if="scope.row.status == 3">派送中</span>
					<span v-if="scope.row.status == 4">未取件</span>
					<span v-if="scope.row.status == 5">已到达</span>
   			 </template>
			</el-table-column>
			<el-table-column label="网点" fixed="right" width="90">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-map-location" @click="showStationInfo(scope.$index, scope.row)" round></el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width="180">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit"  @click="modifyData(scope.$index, scope.row)" circle></el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deleteData(scope.$index, tableData)" circle></el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :visible.sync="StationInfoVisible">
			<el-form :label-position="position"  :model="stationForm" :disabled='true'>
				<el-form-item label="站点地址">
					<el-input v-model="stationForm.address"></el-input>
				</el-form-item>
				<el-form-item label="站点名称">
					<el-input v-model="stationForm.name"></el-input>
				</el-form-item>
				<el-form-item label="站点编号">
					<el-input v-model="stationForm.stationNo"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog :visible.sync="centerDialogVisible">
			<el-form :model="editForm">
				<!-- <el-form-item label="寄件日期" :picker-options="pickerOptions">
					<el-date-picker v-model="editForm.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item> -->
				<el-form-item label="快递公司">
					<el-input v-model="editForm.expressCompany"></el-input>
				</el-form-item>
				<el-form-item label="寄件人姓名">
					<el-input v-model="editForm.recipientName"></el-input>
				</el-form-item>
				<el-form-item label="收件人姓名">
					<el-input v-model="editForm.senderName"></el-input>
				</el-form-item>
				<el-form-item label="寄件人电话">
					<el-input v-model="editForm.senderTel"></el-input>
				</el-form-item>
				<el-form-item label="收件人电话">
					<el-input v-model="editForm.recipientTel"></el-input>
				</el-form-item>
				<el-form-item label="寄件人地址">
					<el-input v-model="editForm.senderAddress"></el-input>
				</el-form-item>
				<el-form-item label="收件人地址">
					<el-input v-model="editForm.recipientAddress"></el-input>
				</el-form-item>

				<el-form-item label="网点选择">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in Stations" :key="item.address" :label="item.name"
							:value="item.stationNo">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div>
				<el-button @click="closeDialog()">取消</el-button>
				<el-button type="primary" @click="sumbitEditRow()">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="isAddMembers">
			<el-form :model="addForm">
				<!-- <el-form-item label="寄件日期" :picker-options="pickerOptions">
					<el-date-picker v-model="addForm.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item> -->
				<el-form-item label="快递公司">
					<el-input v-model="addForm.expressCompany"></el-input>
				</el-form-item>
				<el-form-item label="寄件人姓名">
					<el-input v-model="addForm.recipientName"></el-input>
				</el-form-item>
				<el-form-item label="收件人姓名">
					<el-input v-model="addForm.senderName"></el-input>
				</el-form-item>
				<el-form-item label="寄件人电话">
					<el-input v-model="addForm.senderTel"></el-input>
				</el-form-item>
				<el-form-item label="收件人电话">
					<el-input v-model="addForm.recipientTel"></el-input>
				</el-form-item>
				<el-form-item label="寄件人地址">
					<el-input v-model="addForm.senderAddress"></el-input>
				</el-form-item>
				<el-form-item label="收件人地址">
					<el-input v-model="addForm.recipientAddress"></el-input>
				</el-form-item>
				

			</el-form>
			<div>
				<el-button @click="closeDialog()">取消</el-button>
				<el-button type="primary" @click="sumbitAddRow()">确定</el-button>
			</div>
		</el-dialog>
		<!-- <el-input v-model="id" placeholder="请输入查询的ID号"></el-input> -->


	</div>
</template>

<script>
// import { musicBroadcastingDetails } from '@/api/index.js'
import axios from 'axios'
import qs from "qs";
var _index;
export default {
	name: 'order',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
			position:'left',
			centerDialogVisible: false,
			StationInfoVisible: false,
			isAddMembers: false,
			editForm: [],
			addForm: [],
			searchData: '',
			input: '',
			id: '',
			value: '',
			Stations: [],
			StationList: [],
			stationForm: {},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			tableData: [{
				date: '2020-05-02',
				good: '小熊牌毛衣',
				sendname: '王小虎',
				rename: '王大虎',
				sendtele: '111111',
				retele: '222222',
				sendaddress: '上海市普陀区金沙江路 1515 弄',
				readdress: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2020-05-02',
				good: '大熊牌球鞋',
				sendname: '王小虎',
				rename: '王大虎',
				sendtele: '111111',
				retele: '222222',
				sendaddress: '上海市普陀区金沙江路 1515 弄',
				readdress: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2020-05-02',
				good: '戴尔笔记本电脑',
				sendname: '王小虎',
				rename: '王大虎',
				sendtele: '111111',
				retele: '222222',
				sendaddress: '上海市普陀区金沙江路 1515 弄',
				readdress: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2020-05-02',
				good: '惠普笔记本电脑',
				sendname: '王小虎',
				rename: '王大虎',
				sendtele: '111111',
				retele: '222222',
				sendaddress: '上海市普陀区金沙江路 1515 弄',
				readdress: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2020-05-02',
				good: '荣耀手机',
				sendname: '王小虎',
				rename: '王大虎',
				sendtele: '111111',
				retele: '222222',
				sendaddress: '上海市普陀区金沙江路 1515 弄',
				readdress: '上海市普陀区金沙江路 1518 弄'
			}

			]
		}
	},
	methods: {
		showStationInfo(index, row) {
			console.log(index);
			console.log(this.StationList)
			this.stationForm = this.StationList[index];
			this.StationInfoVisible = true;
		},
		async deleteData(index, row) {
			let res = await axios.post(
				this.url+"/client/deleteExpressByExpressNo",
				qs.stringify({ expressNo: this.tableData[index].expressNo })
			)
				.then(res => {
					console.log("输出response.data", res.data);
				});
			console.log("进行了删除操作")
			console.log("index的值是：" + index)
			console.log("row的值是：", row)
			this.tableData.splice(index, 1);
		},
		modifyData(index, row) {
			this.editForm = this.tableData[index];
			this.centerDialogVisible = true
			this.editForm = Object.assign({}, row); //重置对象
			this.value=this.StationList[index].stationNo;
			console.log(this.value);
			_index = index;
			console.log("index的值：" + index)
			console.log("_index的值：" + _index)
			console.log("row的值是：", this.editForm) //代表选择的这一行的数据
		},
		async sumbitEditRow() {
			console.log("editData的值" + this.editForm)
			try {
				let res = await axios.post(
					this.url+"/client/updateExpress", qs.stringify(this.editForm),
				).then(res => {
					this.init();
					this.centerDialogVisible = false;
				});
				let res1 = await axios.post(
					this.url+"/client/updateStationExpress", qs.stringify
					({
						expressNo: this.editForm.expressNo,
						stationNo: this.value
					}),
				).then(res1 => {
					console.log(this.editForm.expressNo);
					console.log(this.value)
					this.initStation();
				});
			} catch (e) {
				console.log(e);
			}
		},
		closeDialog() {
			this.centerDialogVisible = false
			this.isAddMembers = false
			console.log("editfrom", this.editForm)
			console.log("addfrom", this.addForm)

		},
		addMembers() {
			this.isAddMembers = true
			this.addForm = {}
		},
		async sumbitAddRow() {
			console.log("editData的值" + this.addForm)
			try {
				this.addForm.status=1;
				let res = await axios.post(
					this.url+"/client/updateExpress", qs.stringify(this.addForm),
				).then(res => {
					this.isAddMembers = false;
					this.$router.go(0)
				});
			} catch (e) {
				console.log(e);
			}
		},
		async init() {

			try {
				let res = await axios.post(
					this.url+"/client/getExpressBySender"
				).then(res => {
					this.tableData = res.data;
					return res;
				});
			} catch (e) {
				console.log(e);
			}

		},
		async initStation() {
			try {
				let res = await axios.post(
					this.url+"/client/getStations"
				).then(res => {
					this.Stations = res.data;
					// console.log(res);
					// console.log(this.Stations);
					return res;
				});
			} catch (e) {
				console.log(e);
			}

			axios({
				method: 'post',
				url: this.url+'/client/getStationByExpressList',
				headers: {
					'Content-Type': 'application/json' // 1
				},
				data: JSON.stringify(this.tableData) // 2
			}).then((res) => {
				console.log(res.data)
				this.StationList = res.data
			});
		},
		async order() {
			let order1 = await this.init();
			let order2 = await this.initStation();
			console.log(this.tableData);
		}
	},
	mounted() {
		this.order();
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
