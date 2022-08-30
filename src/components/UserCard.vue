<template>
  <div class="card-box">
    <!-- 유저 정보들 -->
    <div class="user-info">
      <img class="user-img" src="@/assets/logo.png" />
      <h4 class="user-id">test@test.com</h4>
      <button class="logout">로그아웃</button>
    </div>
    <!-- 메뉴 버튼들 -->
    <div class="menus">
      <router-link :to="{ name: 'audition' }" tag="div" class="menu">
        <font-awesome-icon icon="fa-lightbulb" />
        <span class="menu-title">이모티콘 제안</span>
      </router-link>
      <router-link :to="{ name: 'proposals' }" tag="div" class="menu">
        <font-awesome-icon icon="fa-pencil-square" />
        <span class="menu-title">제안 관리</span>
      </router-link>
      <router-link :to="{ name: 'notice' }" tag="div" class="menu">
        <font-awesome-icon icon="fa-clipboard" />
        <span class="menu-title">공지사항</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserCard',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.card-box {
  margin: 10px;
  border: 1px solid #e6e6e6;
  background-color: white;

  height: 370px;
}

// 유저정보
.user-info {
  margin: 20px;
}

.user-img {
  width: 100px;
  border: 1px solid black;
  border-radius: 50%;
}

.user-id {
  margin: 10px 0;

  font-weight: 500;

  line-height: 19px;
  font-family: 'NotoSans-Light';
}

.logout {
  height: 25px;
  background-color: transparent;

  border: 1px solid #c4c4c4;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;

  padding: 0 7px;

  color: #727274;
}
// 메뉴정보
.menus {
  margin: 10px 35px;
}

.menu {
  width: 100%;
  display: flex;
  cursor: pointer;

  justify-content: left;
  padding: 15px 0;

  border-top: 1px solid #f1f1f1;

  color: black;
  font-size: small;
}

.router-link-active {
  color: orange;
}

.router-link-active > .menu-title {
  font-weight: bold;
}

.menu > svg {
  padding-inline-end: 10px;

  font-size: 16px;
}

.menu-title {
  font-size: 15px;

  font-weight: 400;

  line-height: 17px;
}
</style>
