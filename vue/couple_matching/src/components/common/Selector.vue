<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      @change="onChangeSelected"
    />
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
    name: 'Selector',
    data() {
        return {
            selected: 'ALL',
        }
    },
    computed: {
      options() {
          let opntions = [{ item: 'ALL', name: 'ALL' }];
          let alphabet;
          for (let i=65; i<=90; i++) {
            alphabet = String.fromCharCode(i);
            opntions.push({ item: alphabet, name: alphabet })
          }
          return opntions;
      }
    },
    methods: {
        ...mapMutations('couple', [
            'setSelected'
        ]),
        onChangeSelected(val) {
          this.setSelected(val);
        }
    }
}
</script>

<style scoped>

</style>