<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-form">
        <form @submit.prevent="onSubmit">
          <h2 class="form-title">
            <span><b>Diary Studio</b></span>
          </h2>
          <div class="form-item">
            <label for="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              autocomplete="off"
            />
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

        <div class="set_login">
          <div class="item_inp item_check">
            <input
              type="checkbox"
              id="staySignedIn"
              name="stay_signed_in"
              value="true"
              class="inp_g inp_check"
            />

            <label class="lab_g" for="staySignedIn">
              <span style="outline: none" class="login-check"
                >로그인 상태 유지</span
              >
            </label>
          </div>
        </div>
      </div>
      <div class="login-img"></div>
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

    const { username, token, isLoading } = storeToRefs(store);

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
          isLoading.value = true;

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
        } finally {
          isLoading.value = false;
        }
      }
    }
    return { onSubmit, message };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #717274;
  height: 100%;
}

.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  width: 800px;
  height: 500px;
  transform: translate(-50%, -50%);
  background: #e4e4e4;
  border: 1px solid rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.login-form {
  flex-grow: 1;
}

.login-img {
  flex-grow: 1;

  background: url('@/assets/logo2.png') no-repeat;

  background-color: #717274;

  background-position: center;

  height: 100%;
}

.login-form > form {
  position: relative;

  margin: 50px 20px 30px;
}

form > .form-title {
  display: block;
  width: 100%;

  text-align: center;
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
  font-weight: bold;
  font-size: 13px;
  line-height: 38px;
}

.form-item > input {
  width: calc(100% - 200px);
  height: 35px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  outline: none;
  border-radius: 15px;

  background-color: rgb(233, 233, 233);

  padding-left: 15px;
}

input:focus {
  outline: none;
}

button {
  position: absolute;
  top: 47px;
  right: 0;

  font-size: 13px;
  padding: 20px;
  height: 90px;
  width: 100px;
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

  text-align: center;

  font-size: 11px;

  display: inline-block;
}

.set_login {
  margin-top: 25px;
}

.set_login .item_check {
  // float: left;
  text-align: left;
  padding-left: 15px;
}

.inp_g {
  width: 20px;
  height: 20px;
  color: #717274;
  vertical-align: middle;
  -webkit-appearance: none;
  background: none;
  border: 0;
  outline: 0;
  flex-grow: 0;
  border-radius: 50%;
  background-color: #ffffff;
  transition: background 300ms;
  cursor: pointer;
}

.inp_g::before {
  content: '';
  color: transparent;
  display: block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  border: 0;
  // background-color: #ccd3d8;
  background-size: contain;
  box-shadow: inset 0 0 0 1px #ccd3d8;
}

/* Checked */
.inp_g:checked {
  background: currentColor;
}

.inp_g:checked::before {
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
}

.login-check {
  font-size: 13px;

  padding-left: 3px;

  font-weight: bold;
}
</style>
