<template>
  <div class="notices">
    <h1 class="notices-title">공지 사항</h1>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NoticeView',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.notices {
  margin: 30px 60px;
}
.notices-title {
  text-align: left;

  border-bottom: 1px solid #000;

  padding: 0 0 10px;
}
</style>
