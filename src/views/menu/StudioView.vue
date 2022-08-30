<template>
  <div class="studio">
    <user-card />
    <!-- 본문 내용 -->
    <div class="container">
      <router-view />
    </div>
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
  min-height: 700px;
  display: grid;

  grid-template-columns: minmax(280px, 1fr) 3fr;
}

.container {
  border: 1px solid #e6e6e6;
  margin: 10px;

  background-color: white;
}
</style>
