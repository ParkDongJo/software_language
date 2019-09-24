<template>
  <div class="header">
    <div>
      <b-nav>
        <b-nav-item active>
          <router-link to="/">
            Home
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/about">
            About
          </router-link>
        </b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  .header {
      position: relative;
      padding: 3% 0 3%;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
  }
</style>