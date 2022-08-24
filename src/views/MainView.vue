<template>
  <div class="container">
    <!-- 헤더 -->
    <header>
      <nav class="main-nav">
        <ul class="left-items">
          <router-link to="/home" custom v-slot="{ navigate, href }">
            <li>
              <a :href="href" @click="navigate">DiaryStudio</a>
            </li>
          </router-link>
        </ul>
        <ul class="right-items">
          <router-link
            to="/guide"
            custom
            v-slot="{ navigate, href, isExactActive }"
          >
            <li :class="isExactActive && 'router-link-active'">
              <a :href="href" @click="navigate">제안가이드</a>
            </li>
          </router-link>
          <router-link
            to="/studio"
            custom
            v-slot="{ navigate, href, isExactActive }"
          >
            <li :class="isExactActive && 'router-link-active'">
              <a :href="href" @click="navigate">마이스튜디오</a>
            </li>
          </router-link>
        </ul>
      </nav>
    </header>
    <!-- 본문 내용 -->
    <main :class="{ 'box-show': isShow }">
      <message-box class="message-box" v-if="isShow" />
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import MessageBox from '@/components/MessageBox.vue';
import { defineComponent, computed } from '@vue/composition-api';
import { useStore } from '@/services/pinia';

export default defineComponent({
  name: 'MainView',
  components: { MessageBox },
  setup() {
    const store = useStore();
    const isShow = computed(() => store.messageBoxState.isMessageBoxShow);

    return {
      isShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 60px;
  background: #393a3e;
}

main {
  width: 1100px;
  margin: 0 auto;

  height: 100%;

  padding-top: 60px;
}

.main-nav {
  min-width: 1000px;
  height: inherit;
  box-sizing: border-box;

  margin: 0 60px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

// left
.left-items {
  text-align: left;
}

// right
.right-items {
  display: flex;
  justify-content: flex-end;
}

li {
  padding: 0 10px;
}

// router link active css
ul {
  padding-inline-start: 0;
}

a {
  color: white;
  text-decoration: none;
  flex-grow: 1;

  font-size: 15px;
}

li {
  list-style: none;
}

// .router-link-active > a {
//   border-bottom: 2px solid white;
// }

.right-items li::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  margin-top: 5px;
  background: white;
  transition: width 0.3s;
}

.right-items li:hover::after {
  width: 100%;
}

.box-show:not(.message-box) {
  opacity: 0.46;

  pointer-events: none;
  // 드래그 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
