<template>
  <div class="studio">
    <user-card />
    <!-- 본문 내용 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import UserCard from '@/components/UserCard.vue';

export default defineComponent({
  name: 'StudioView',
  components: {
    UserCard,
  },
});
</script>

<style lang="scss" scoped>
.studio {
  display: grid;

  grid-template-columns: minmax(280px, 1fr) 3fr;
}

.studio > div {
  white-space: nowrap;
}
</style>
