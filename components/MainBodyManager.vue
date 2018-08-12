<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>主体管理</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="isDialogOpen" persistent max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2" @click="showDialog(null)">新增</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{!!record.id ? '编辑主体' :'新增主体'}}</span>
          </v-card-title>
          <form>
            <v-card-text>
              <v-text-field label="县市区" v-model="record.district" required></v-text-field>
              <v-text-field label="经营主体" v-model="record.mainBody" required></v-text-field>
              <v-text-field label="主体联系人" v-model="record.principal" required></v-text-field>
              <v-text-field label="联系电话" v-model="record.contacts" required></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="isDialogOpen = false">取消</v-btn>
              <v-btn color="blue darken-1" flat @click.native="createOrUpdateMainBody(record);isDialogOpen = false">保存</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="mainBodies" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.district }}</td>
        <td class="text-xs-right">{{ props.item.mainBody }}</td>
        <td class="text-xs-right">{{ props.item.principal }}</td>
        <td class="text-xs-right">{{ props.item.contacts }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="showDialog(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  "enrollment"
);
export default {
  computed: mapState(["mainBodies"]),
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
        { text: "操作", sortable: false }
      ],
      isDialogOpen: false,
      record: {}
    };
  },
  methods: {
    showDialog(data) {
      this.record = { ...data } || {
        id: null,
        district: null,
        mainBody: null,
        principal: null,
        contacts: null
      };
      this.isDialogOpen = true;
    },
    deleteItem(data) {
      if (window.confirm("你确定要删除吗？")) this.deleteMainBody(data);
    },
    ...mapActions(["createOrUpdateMainBody", "deleteMainBody"])
  }
};
</script>

<style>
</style>
