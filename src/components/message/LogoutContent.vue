<template>
  <div class="box-content">
    <span class="message-box">로그아웃 하시겠습니까?</span>

    <div class="outer">
      <button class="btn-close" @click="closeBox">취소</button>
      <button class="btn-confirm" @click="confirm">확인</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { initUser } from '@/services/auth';
import router from '@/router';

export default defineComponent({
  name: 'LogoutContent',
  setup() {
    const store = useStore();
    const { isShow } = storeToRefs(store);

    const closeBox = () => {
      isShow.value = !isShow.value;
    };

    const confirm = () => {
      initUser();

      isShow.value = !isShow.value;

      router.push({
        name: 'home',
      });
    };

    return {
      closeBox,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-content {
  height: 200px;

  padding: 50px 30px 30px 30px;

  margin: auto;
}

.outer > .btn-confirm {
  color: #24231d;
  background-color: #fcd207;
  border: 1px solid #ffbb1b;
}

.outer > .btn-confirm:hover {
  background-color: rgba(#fcd207, 0.7);
}

.outer > .btn-close {
  color: #727274;
  background-color: #c4c4c4;
  border: 1px solid #c4c4c4;
}

.outer > .btn-close:hover {
  background-color: rgba(#c4c4c4, 0.7);
}

.outer {
  position: relative;

  top: 40px;
}

button {
  width: 110px;
  height: 40px;

  cursor: pointer;
  outline: none;

  margin: 10px;
}

.message-box {
  display: block;
  overflow-x: hidden;
  max-height: 120px;
  color: #2d2e32;

  font-size: 13px;
}
</style>
