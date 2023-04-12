<template>
    <div class="goodsindex">
        <!-- 搜索条件 -->
        <el-row :gutter="20" class="goodsindex-queryInfo">
            <!-- 商品名称搜索 -->
            <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
                <el-input class="goodsindex-queryInfo-li" v-model="queryInfo.value" clearable size="small" placeholder="请输入检索信息"></el-input>
            </el-col>
            <!-- 商品分类搜索 -->
            <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
                 <el-select  class="goodsindex-queryInfo-li" v-model="queryInfo.type" size="small" clearable placeholder="请选择产品分类">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
                <el-button type="primary" class="goodsindex-queryInfo-li" size="small" v-on:click="getorderbycondi">搜索</el-button>
            </el-col>
            
        </el-row>
        <!-- 检索结果 -->
        <el-row :gutter="20" class="goodsindex-list">
            <el-col :span="24">
                <el-table
                    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    border
                    size='small'
                    style="width: 100%"
                    @row-click='handleEdit'>
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
                    <el-table-column
                    label="操作"
                    width="120">
                        <el-row>
                            <el-button type="success" plain @click="finish">确认完成</el-button>
                        </el-row>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- 分页 -->
        <el-row :gutter="20" class="goodsindex-list">
            <el-col :span="24" class="goodsindex-page-box">
                <el-pagination
                    :hide-on-single-page="false"
                    :total="total"
                    :page-size="pageSize"
                    background
                    :page-sizes="[10, 20, 50, 100]"
                    :current-page="currentPage"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = "http://172.17.170.29:8080/";
export default {
    data(){
        return {
            queryInfo:{
                value: "",
                type: ""
            },
            options: [
                {
                    label: 1,
                    value: '用户 id'
                },
                {
                    label: 2,
                    value: '服务员 id'
                },
                {
                    label: 3,
                    value: '服务 id'
                }
            ],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            activatedRow: null,
            tableData: []
        }
    },
    methods:{
        handleSizeChange(pageSize){
            this.pageSize = pageSize
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage;
        },
        handleEdit(row){
            this.activatedRow = row
            //console.log(this.activatedRow)
        },
        finish(evt){
            let mythis = this;
            setTimeout(function(){
                console.log(mythis.activatedRow);
                let currentRow = mythis.activatedRow;

                axios.post('/order/doneorder',
                            {"id": currentRow['id']},
                            {
                                headers: {
                                    'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMzlhNGY5Ny05YTgyLTRmMmItYmQzZi1mMTEwZWQ0MzQ2ZDYiLCJpYXQiOjE2ODA0OTQ1NzEsImlzcyI6Inh4eCIsImV4cCI6MTcxMjAzMDU3MSwidXNlcklkIjoiNzU3In0.fJ1EcOCxYAoNCMOB89FPbizVAvTax3FTC9PJPhZmnSU'
                                }
                            }
                            ).then((res) =>  {
                                console.log(res);
                                if(res.data.code == 1){
                                    //删除成功
                                    let data = mythis.tableData
                                    for (let i = data.length - 1; i >= 0; i--) {
                                        if (data[i]['id'] == currentRow['id']) {
                                            data.splice(i, 1);
                                            mythis.total -= 1;
                                            break;
                                        }
                                    }

                                    //取消焦点
                                    console.log(evt);
                                    let target = evt.target;
                                    if(target.nodeName == "SPAN"){
                                        target = evt.target.parentNode;
                                    }
                                    target.blur()
                                }
                                
                            }).catch((error) => {
                                console.log(error);
                            })
            }, 100)
        },
        getorderbycondi(){
            console.log(this.queryInfo);
            let param = {};
            if(this.queryInfo["value"] != ""){
                if(this.queryInfo["type"] == "用户 id"){
                    param["uid"] = this.queryInfo["value"]; 
                }else if(this.queryInfo["type"] == "服务员 id"){
                    param["sid"] = this.queryInfo["value"];
                }else if(this.queryInfo["type"] == "服务 id"){
                    param["pid"] = this.queryInfo["value"]
                }
            }
            //进行条件搜索
            axios.post("/order/getorderbycondi",
                param,
                {
                    headers: {
                        'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNzU1ZjYwNy1lZGZhLTQwNzktOWIxYi04MDI5OGJhYTkxODQiLCJpYXQiOjE2ODA0Mjc5OTksImlzcyI6Inh4eCIsImV4cCI6MTcxMTk2Mzk5OSwidXNlcklkIjoiNzU3In0.JgmZ8TcLtWF9py4nUwl0c9t9RzjdmQE3eOBoCdtIujI'
                    }
                }
            ).then((res) => {
                console.log(res)
                let data = res.data
                for (let i = data.length - 1; i >= 0; i--) {
                    if (data[i]['state'] == '已完成') {
                        data.splice(i, 1);
                    }
                }

                this.tableData = data
                this.total = res.data.length;
            }).catch((error) => {
                console.log(error);
            })
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
            console.log(res)
            let data = res.data
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i]['state'] == '已完成') {
                    data.splice(i, 1);
                }
            }

            this.tableData = data
            this.total = res.data.length;
        }).catch((error) => {
            console.log(error);
        })
    },
    mounted: function(){
        console.log(this.total)
        console.log(this.currentPage)
        console.log(this.pageSize)
    }
}
</script>

<style scoped>
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
