<template>
  <div class="container">
    <div
      v-if="isLoading"
      class="d-flex justify-content-center mb-3 loading"
    >
      <b-spinner
        variant="primary"
        label="Loading..."
      />
    </div>
    <Header />
    <CoupleList class="center" />
    <Footer />
  </div>
</template>

<script>
import Header from './../components/common/Header'
import Footer from './../components/common/Footer'
import CoupleList from './../components/CoupleList'
import { mapGetters } from "vuex";


export default {
    name: 'Home',
    components: {
        Header,
        CoupleList,
        Footer
    },
    computed: mapGetters('couple', [
        'isLoading'
    ]),
}
</script>

<style scoped>
    .center {
        position: relative;
        margin-bottom: 5em;
    }
    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform: -webkit-translate(-50%, -50%);
        transform: -moz-translate(-50%, -50%);
        transform: -ms-translate(-50%, -50%);
        z-index: 9999;
        background-color: rgba(255,255,255,0.8);
    }
</style>