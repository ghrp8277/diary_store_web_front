<template>
  <div class="container">
    <!-- 헤더 -->
    <header>
      <nav class="main-nav">
        <ul class="left-items">
          <router-link to="/home" custom v-slot="{ navigate, href }" tag="li">
            <li>
              <a :href="href" @click="navigate"
                ><span class="logo">DiaryStudio</span></a
              >
            </li>
          </router-link>
        </ul>
        <ul class="right-items">
          <router-link
            to="/faq"
            custom
            v-slot="{ navigate, href, isExactActive }"
          >
            <li :class="isExactActive && 'router-link-active'">
              <a :href="href" @click="navigate">FAQ</a>
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
    <main>
      <router-view />
    </main>

    <footer>
      <span>Copyright Diary Studio Corp.All rights resered.</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainView',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: calc(100% - 67px);
}

header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 60px;
  background: #393a3e;

  z-index: 10;
}

main {
  width: 1100px;
  height: 100%;
  margin: 0 auto;

  padding-top: 60px;

  min-height: 100%;
}

footer {
  z-index: 1;
  background: #393a3e;

  width: 100%;
  height: 60px; /* footer의 높이 */
  position: fixed;
  left: 0;
  bottom: -60px;

  text-align: left;
  text-indent: 30px;
  line-height: 57px;

  span {
    color: #6f6f6f;

    font-size: 13px;
    font-weight: 500;
  }
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

  line-height: 25px;

  .logo {
    transition: all 0.5s;
    --webkit-text-stroke: 4px #d6f4f4;
    font-variation-settings: 'wght' 100, 'ital' 0;
    text-shadow: none;
  }

  .logo:hover {
    font-variation-settings: 'wght' 900, 'ital' 1;

    text-shadow: 3px 3px 0px #07bccc, 5px 5px 0px #e601c0, 7px 7px 0 #e9019a,
      9px 9px 0 #f40468, 11px 11px 10px #482896;
  }
}

// right
.right-items {
  display: flex;
  justify-content: flex-end;

  line-height: 25px;
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
</style>
