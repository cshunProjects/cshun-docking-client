<template>

  <v-card class="ma-5" style="height:100%">
    <v-layout row style="height:100%;positive:relative;">
      <v-navigation-drawer permanent stateless style="height:100%">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>三级管理员</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile @click="(function(){})()">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>主体管理</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader>产销情况申报</v-subheader>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>果蔬类</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>畜类养殖</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>禽类养殖</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>农产品生产加工</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <div style="overflow-y:scroll;left:300px;right:0;top:0;height:100%;position:absolute;padding:1em;">

        <main-body-manager />
        <fruit-and-veg-enrollment-manager />

        <v-subheader class="mt-3">果蔬类</v-subheader>

        <v-subheader class="mt-3">畜类养殖</v-subheader>

      </div>

    </v-layout>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  "enrollment"
);
import MainBodyManager from '~/components/MainBodyManager'
import FruitAndVegEnrollmentManager from '~/components/FruitAndVegEnrollmentManager'
export default {
  components: {MainBodyManager,FruitAndVegEnrollmentManager},
  mounted() {
    setTimeout(() => {
      if (!this.$store.getters["auth/isLogin"]) {
        this.$router.push("/login");
      } else {
        this.refetchMainBodies();
        this.refetchEnrollments();
      }
    }, 500);
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["refetchMainBodies","refetchEnrollments"])
  }
};
</script>

<style>
</style>

