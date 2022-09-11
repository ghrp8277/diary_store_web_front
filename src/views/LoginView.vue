<template>
  <div class="login-container">
    <div class="content">
      <form class="login-form" @submit.prevent="onSubmit">
        <div class="form-item">
          <label for="username">아이디</label>
          <input type="text" id="username" name="username" autocomplete="off" />
        </div>
        <div class="form-item">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            autocomplete="off"
          />
        </div>
        <button type="submit" id="connect" class="btn-connect">
          <span>로그인</span>
        </button>
      </form>
      <div class="login-message">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { fetchLogin } from '@/apis/user';
import router from '@/router';
import {
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  saveUserToCookie,
} from '@/services/cookies';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const store = useStore();
    const message = ref('');

    const { username, token } = storeToRefs(store);

    async function onSubmit(e: Event) {
      const target = e.target as HTMLFormElement;

      const name = target.username.value as string;
      const password = target.password.value as string;

      if (name.length == 0) {
        message.value = '아이디를 입력해 주세요.';
      } else if (password.length == 0) {
        message.value = '비밀번호를 입력해 주세요.';
      } else {
        try {
          const data = await fetchLogin(name, password);

          // pinia에 저장
          username.value = name;
          token.value = data.accessToken;

          // 쿠키에 토큰 및 유저명 저장
          saveAccessTokenToCookie(data.accessToken);
          saveRefreshTokenToCookie(data.refreshToken);
          saveUserToCookie(name);

          // 메인으로 이동
          router.push({
            name: 'main',
          });
        } catch (error: any) {
          if (error.status == 401) {
            message.value =
              '등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.';
          }
        }
      }
    }
    return { onSubmit, message };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #e4e4e4;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 60px 30px;
  width: 800px;
  height: 400px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.75);
  // box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
}

.content > form {
  display: block;

  padding: 0 200px 0 100px;
}

.form-item {
  display: flex;
  margin-bottom: 10px;
}

.form-item > label {
  text-align: left;
  width: 70px;
  height: 35px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 38px;
}

.form-item > input {
  width: 100%;
  height: 35px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

input:focus {
  outline: none;
}

button {
  position: absolute;

  top: 60px;
  right: 50px;

  font-size: 13px;
  padding: 20px;
  height: 90px;
  width: 110px;
  background: #717274;

  color: white;
  border: 0;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
}

button:hover {
  background-color: rgba(#717274, 0.9);
}

.login-message {
  color: red;

  text-align: left;
}
</style>
