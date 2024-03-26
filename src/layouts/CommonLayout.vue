<template>
  <div id="commonLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <NavBarHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.example.com" target="_blank"> YG's Page </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#commonLayout {
}

#commonLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#commonLayout .content {
  background: linear-gradient(to right, #aaa, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

#commonLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import NavBarHeader from "@/components/NavBarHeader.vue";
</script>
