<template>

    <v-layout row>
      <v-layout column>
        <v-toolbar flat color="white">
          <v-toolbar-title>果蔬类</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="isDialogOpen" persistent max-width="500px">
            <v-btn slot="activator" color="primary" dark class="mb-2" @click="showDialog(null)">自定义筛选</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">自定义筛选</span>
              </v-card-title>
              <form>
                <v-card-text>
                  <!-- <v-text-field label="县市区" v-model="record.district" required></v-text-field>
                <v-text-field label="经营主体" v-model="record.mainBody" required></v-text-field>
                <v-text-field label="主体联系人" v-model="record.principal" required></v-text-field>
                <v-text-field label="联系电话" v-model="record.contacts" required></v-text-field>
                <v-text-field label="果蔬品种" v-model="record.category" required></v-text-field>
                <v-text-field label="种植面积（亩）" v-model="record.scale" required></v-text-field>
                <v-text-field label="产量（吨）" v-model="record.production" required></v-text-field>
                <v-text-field label="上市起始日期(年-月)" mask="####-##" v-model="record.marketDateBegin" required></v-text-field>
                <v-text-field label="上市终止日期(年-月)" mask="####-##" v-model="record.marketDateEnd" required></v-text-field>
                <v-text-field label="订单销售占比" v-model="record.salesRatio" required></v-text-field>
                <v-text-field label="销售预警及措施" v-model="record.salesRoute" required></v-text-field> -->
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="createOrUpdateEnrollment(record);isDialogOpen = false">确定</v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <v-data-table :headers="headers" :items="this['enrollment/fruitAndVegEnrollments']" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.district }}</td>
            <td class="text-xs-right">{{ props.item.mainBody }}</td>
            <td class="text-xs-right">{{ props.item.principal }}</td>
            <td class="text-xs-right">{{ props.item.contacts }}</td>
            <td class="text-xs-right">{{ props.item.category }}</td>
            <td class="text-xs-right">{{ props.item.scale }}</td>
            <td class="text-xs-right">{{ props.item.production }}</td>
            <td class="text-xs-right">{{ marketDateTransform(props.item.marketDateBegin,props.item.marketDateEnd) }}</td>
            <td class="text-xs-right">{{ props.item.salesRatio }}</td>
            <td class="text-xs-right">{{ props.item.salesRoute }}</td>
          </template>
        </v-data-table>
      </v-layout>
    </v-layout>

</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: { ...mapGetters(["enrollment/fruitAndVegEnrollments"]) },
  mounted() {
    setTimeout(() => {
      if (!this.$store.getters["auth/isLogin"]) {
        this.$router.push("/login");
      } else {
        this["enrollment/refetchEnrollments"]();
      }
    }, 500);
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
        { text: "主体联系人", value: "principal" },
        { text: "联系电话", value: "contacts" },
        { text: "果蔬品种", value: "category" },
        { text: "种植面积（亩）", value: "scale" },
        { text: "产量（吨）", value: "production" },
        { text: "上市日期", value: "marketDateBegin" },
        { text: "订单销售占比", value: "salesRatio" },
        { text: "销售预警及措施", value: "salesRoute" }
      ]
    };
  },
  methods: {
    marketDateTransform(begin, end) {
      console.log(begin, end);
      return begin.replace("-", "年") + "月 ~ " + end.replace("-", "年") + "月";
    },
    ...mapActions(["enrollment/refetchEnrollments"])
  }
};
</script>

<style>
</style>

