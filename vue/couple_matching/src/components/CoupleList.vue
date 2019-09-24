<template>
  <div id="couple-list">
    <div class="pannel clear-fix">
      <span class="total float-left">Total : {{ len }}</span>
      <Selector class="selector float-right" />
    </div>
    <div>
      <b-table
        :items="couples"
        :fields="fields"
        :tbody-tr-class="rowClass"
      />
    </div>
    <b-alert
      v-if="errMsg !== ''"
      show
    >
      {{ errMsg }}
    </b-alert>
  </div>
</template>
<script>
import Selector from './common/Selector'
import { mapGetters, mapActions } from "vuex";
import CONST from './../constants'

export default {
  name: 'CoupleList',
  components: {
    Selector
  },
  data() {
    return {
      fields: ['matched', 'left', 'right']
    }
  },
  // computed 속성은 종속 대상을 따라 저장(캐싱)된다는 것
  computed: mapGetters('couple', [
      'couples',
      'len',
      'errMsg',
  ]),
  created() {
      this.$store.dispatch('couple/initCouples', { size: CONST.API_REQUEST_SIZE })
  },
  // 메소드를 호출하면 렌더링을 다시 할 때마다 항상 함수를 실행
  methods: {
    rowClass(item, type) {
      if (!item) return
      if (item.status === 'awesome') return 'table-success'
    }
  },
}
</script>
<style scoped>
    .pannel {
       padding: 0 2%;
    }
    .total {
        line-height: 38px;
        vertical-align: middle;
        display: inline-block;
    }
    .selector {
        line-height: 38px;
        vertical-align: middle;
    }
    .float-left {
        float: left;
    }
    .float-right {
        float: right;
    }
    .clear-fix::after {
        content: "";
        clear: both;
        display: table;
    }
</style>