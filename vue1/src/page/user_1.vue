<template>
  <el-tabs :data="expressList3" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="未发货" name="first">
      <el-table :data="expressList1" style="width: 100%" max-height="2000">
        <!-- <el-table-column fixed prop="date" label="寄件日期" width="100">
        </el-table-column> -->
        <el-table-column prop="expressNo" label="快递单号" width="100">
        </el-table-column>
        <el-table-column prop="expressCompany" label="快递公司" width="100">
        </el-table-column>
        <el-table-column prop="productLink" label="商品链接" width="150">
        </el-table-column>
        <el-table-column prop="senderName" label="寄件人姓名" width="150">
        </el-table-column>
        <el-table-column prop="recipientName" label="收件人姓名" width="150">
        </el-table-column>
        <el-table-column prop="senderTel" label="寄件人电话" width="150">
        </el-table-column>
        <el-table-column prop="recipientTel" label="收件人电话" width="150">
        </el-table-column>
        <el-table-column prop="senderAddress" label="寄件人地址" width="200">
        </el-table-column>
        <el-table-column prop="recipientAddress" label="收件人地址" width="200">
        </el-table-column>
        <el-table-column prop="status" label="快递状态" width="200">
          <template slot-scope="scope">
        			<span v-if="scope.row.status == 1">快递员未接单</span>
       				<span v-if="scope.row.status == 2">快递员已接单</span>
					<span v-if="scope.row.status == 3">派送中</span>
					<span v-if="scope.row.status == 4">未取件</span>
					<span v-if="scope.row.status == 5">已到达</span>
   			 </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow1(scope.$index, expressList1)" type="text" size="small">
              取消订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="运输中" name="second">
      <el-table :data="expressList3" style="width: 100%" max-height="2000">
        <!-- <el-table-column fixed prop="date" label="寄件日期" width="100">
        </el-table-column> -->
        <el-table-column prop="expressNo" label="快递单号" width="100">
        </el-table-column>
        <el-table-column prop="expressCompany" label="快递公司" width="100">
        </el-table-column>
        <el-table-column prop="productLink" label="商品链接" width="150">
        </el-table-column>
        <el-table-column prop="senderName" label="寄件人姓名" width="150">
        </el-table-column>
        <el-table-column prop="recipientName" label="收件人姓名" width="150">
        </el-table-column>
        <el-table-column prop="senderTel" label="寄件人电话" width="150">
        </el-table-column>
        <el-table-column prop="recipientTel" label="收件人电话" width="150">
        </el-table-column>
        <el-table-column prop="senderAddress" label="寄件人地址" width="200">
        </el-table-column>
        <el-table-column prop="recipientAddress" label="收件人地址" width="200">
        </el-table-column>
        <el-table-column prop="status" label="快递状态" width="200">
          <template slot-scope="scope">
        			<span v-if="scope.row.status == 1">快递员未接单</span>
       				<span v-if="scope.row.status == 2">快递员已接单</span>
					<span v-if="scope.row.status == 3">派送中</span>
					<span v-if="scope.row.status == 4">未取件</span>
					<span v-if="scope.row.status == 5">已到达</span>
   			 </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="待取件" name="third">
      <el-table :data="expressList4" style="width: 100%" max-height="2000">
        <!-- <el-table-column fixed prop="date" label="寄件日期" width="100">
        </el-table-column> -->
        <el-table-column prop="expressNo" label="快递单号" width="100">
        </el-table-column>
        <el-table-column prop="expressCompany" label="快递公司" width="100">
        </el-table-column>
        <el-table-column prop="productLink" label="商品链接" width="150">
        </el-table-column>
        <el-table-column prop="senderName" label="寄件人姓名" width="150">
        </el-table-column>
        <el-table-column prop="recipientName" label="收件人姓名" width="150">
        </el-table-column>
        <el-table-column prop="senderTel" label="寄件人电话" width="150">
        </el-table-column>
        <el-table-column prop="recipientTel" label="收件人电话" width="150">
        </el-table-column>
        <el-table-column prop="senderAddress" label="寄件人地址" width="200">
        </el-table-column>
        <el-table-column prop="recipientAddress" label="收件人地址" width="200">
        </el-table-column>
        <el-table-column prop="status" label="快递状态" width="200">
          <template slot-scope="scope">
        			<span v-if="scope.row.status == 1">快递员未接单</span>
       				<span v-if="scope.row.status == 2">快递员已接单</span>
					<span v-if="scope.row.status == 3">派送中</span>
					<span v-if="scope.row.status == 4">未取件</span>
					<span v-if="scope.row.status == 5">已到达</span>
   			 </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow3(scope.$index, expressList3)" type="text" size="small">
              已取件
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-tab-pane>
  </el-tabs>
</template>
  
<script>
import axios from "axios";
import qs from "qs";


export default {
  name: "user_1",
  methods: {    //这里需要有三个获取列表中数据的函数（未发货，运输中，待取件）
    async getExpressList4() {
      try {
        let res = await axios.post(
         this.url+"/client/getNotPickedUpExpress"
        );
        this.expressList4 = res.data;
        console.log(this.expressList4)
      } catch (e) {
        console.log(e);
      }
    },
    async getExpressList1() {
      try {
        let res = await axios.post(
         this.url+"/client/getNotStartExpress"
        );
        this.expressList1 = res.data;
        console.log(this.expressList1)
      } catch (e) {
        console.log(e);
      }
    },
    async getExpressList3() {
      try {
        let res = await axios.post(
         this.url+"/client/getTransExpress"
        );
        this.expressList3 = res.data;
        console.log(this.expressList3)
      } catch (e) {
        console.log(e);
      }
    },


    deleteRow1(index, rows) {
      rows.splice(index, 1);
    },
    deleteRow2(index, rows) {
      rows.splice(index, 1);
    },
    async deleteRow3(index, rows) {
      rows.splice(index, 1);
      let res = await axios.post(
       this.url+"/client/doPickUpExpress",
        qs.stringify({ expressNo: this.expressList4[index].expressNo })
      )
      .then(res => {
                console.log("输出response.data", res.data);
              });
      this.expressList4.splice(index,1);
  },

  handleClick(tab, event) {
    console.log(tab, event);
  },
},
data() {
  return {
    activeName: "second",
    expressList1: [],
    expressList4: [],
    expressList3: [],
  };
},
mounted() {
  this.getExpressList3();
  this.getExpressList1();
  this.getExpressList4();
  console.log(this.expressList1)
  console.log(this.expressList4)
  console.log(this.expressList3)
},
};

</script>