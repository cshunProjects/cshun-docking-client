<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>果蔬类</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="isChooseMainBodyDialogOpen = true">新增</v-btn>
      <v-dialog v-model="isDialogOpen" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{!!record.id ? '编辑申报' :'申报'}}</span>
          </v-card-title>
          <form>
            <v-card-text>
              <v-text-field label="县市区" v-model="record.district" required></v-text-field>
              <v-text-field label="经营主体" v-model="record.mainBody" required></v-text-field>
              <v-text-field label="主体联系人" v-model="record.principal" required></v-text-field>
              <v-text-field label="联系电话" v-model="record.contacts" required></v-text-field>
              <v-text-field label="果蔬品种" v-model="record.category" required></v-text-field>
              <v-text-field label="种植面积（亩）" v-model="record.scale" required></v-text-field>
              <v-text-field label="产量（吨）" v-model="record.production" required></v-text-field>
              <v-text-field label="上市起始日期(年-月)" mask="####-##" v-model="record.marketDateBegin" required></v-text-field>
              <v-text-field label="上市终止日期(年-月)" mask="####-##" v-model="record.marketDateEnd" required></v-text-field>
              <v-text-field label="订单销售占比" v-model="record.salesRatio" required></v-text-field>
              <v-text-field label="销售预警及措施" v-model="record.salesRoute" required></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="isDialogOpen = false">取消</v-btn>
              <v-btn color="blue darken-1" flat @click.native="createOrUpdateEnrollment(record);isDialogOpen = false">保存</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="fruitAndVegEnrollments" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.district }}</td>
        <td class="text-xs-right">{{ props.item.mainBody }}</td>
        <td class="text-xs-right">{{ props.item.category }}</td>
        <td class="text-xs-right">{{ props.item.scale }}</td>
        <td class="text-xs-right">{{ props.item.production }}</td>
        <td class="text-xs-right">{{ marketDateTransform(props.item.marketDateBegin,props.item.marketDateEnd) }}</td>
        <td class="text-xs-right">{{ props.item.salesRatio }}</td>
        <td class="text-xs-right">{{ props.item.salesRoute }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="showDialog(props.item)">
            edit
          </v-icon>
          <v-icon small>
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="isChooseMainBodyDialogOpen" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">选择主体</span>
        </v-card-title>
        <v-card-text>
          <v-select v-model="selectedMainBody" :items="mainBodies.map(({mainBody})=>mainBody)" @change="showDialogWithMainBody" box label="我的主体"></v-select>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  "enrollment"
);
export default {
  computed: {
    ...mapGetters(["fruitAndVegEnrollments"]),
    ...mapState(["mainBodies"])
  },
  data() {
    return {
      headers: [
        {
          text: "序号",
          value: "id"
        },
        { text: "县市区", value: "district" },
        { text: "经营主体", value: "mainBody" },
        { text: "果蔬品种", value: "category" },
        { text: "种植面积（亩）", value: "scale" },
        { text: "产量（吨）", value: "production" },
        { text: "上市日期", value: "marketDateBegin" },
        { text: "订单销售占比", value: "salesRatio" },
        { text: "销售预警及措施", value: "salesRoute" },
        { text: "操作", sortable: false }
      ],
      isDialogOpen: false,
      record: {
        type: "FruitAndVeg"
      },
      selectedMainBody: "",
      isChooseMainBodyDialogOpen: false
    };
  },
  methods: {
    marketDateTransform(begin, end) {
      console.log(begin,end)
      return begin.replace("-", "年") + "月 ~ " + end.replace("-", "年") + "月";
    },
    showDialogWithMainBody() {
      const mainBody = this.mainBodies.filter(_ => _.mainBody === this.selectedMainBody)[0];
      this.record = {
        type: "FruitAndVeg",
        ...mainBody,
        id:null,
        creator:mainBody.id
      };
      this.isDialogOpen = true;
      this.isChooseMainBodyDialogOpen = false;  
    },
    showDialog(data) {
      this.record = { ...data } || {
        type: "FruitAndVeg",
        id: null,
        district: null,
        mainBody: null,
        principal: null,
        contacts: null,
        category: null,
        scale: null,
        production: null,
        marketDateBegin: null,
        marketDateEnd: null,
        salesRatio: null,
        salesRoute: null
      };
      this.isDialogOpen = true;
    },
    ...mapActions(["createOrUpdateEnrollment"])
  }
};
</script>

<style>
</style>
