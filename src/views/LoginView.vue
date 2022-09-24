<template>
  <div class="login-container">
    <div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>

    <div class="login-card">
      <div
        class="square"
        style="--i: 0; left: -60px; top: -50px; width: 100px; height: 100px"
      ></div>
      <div
        class="square"
        style="--i: 1; left: -100px; top: 150px; width: 120px; height: 120px"
      ></div>
      <div
        class="square"
        style="--i: 2; right: -50px; bottom: -60px; width: 80px; height: 80px"
      ></div>
      <div
        class="square"
        style="--i: 3; left: 100px; width: 50px; height: 50px; bottom: -80px"
      ></div>
      <div
        class="square"
        style="--i: 4; top: -80px; left: 140px; width: 60px; height: 60px"
      ></div>

      <div class="login-form">
        <form @submit.prevent="onSubmit">
          <h2 class="form-title">
            <span><b>Diary Studio</b></span>
          </h2>
          <div class="form-item">
            <input
              type="text"
              id="username"
              name="username"
              autocomplete="off"
              placeholder="아이디"
            />
          </div>
          <div class="form-item">
            <input
              type="password"
              id="password"
              name="password"
              autocomplete="off"
              placeholder="비밀번호"
            />
            <span @click="onToggle">
              <font-awesome-icon id="toggler" :icon="icon" />
            </span>
          </div>

          <div class="login-message">
            <transition name="slide-fade">
              <span>{{ message }}</span>
            </transition>
          </div>

          <div class="item-check">
            <input type="checkbox" class="inp_g" />

            <label class="lab_g" for="staySignedIn">
              <span style="outline: none" class="login-check"
                >로그인 상태 유지</span
              >
            </label>
          </div>

          <button type="submit" id="connect" class="btn-signin">
            <span>로그인</span>
          </button>
        </form>

        <hr class="line" />

        <button class="btn-signup">
          <span>회원가입</span>
        </button>
      </div>
      <div class="login-img"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
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
    const icon = ref('fa-eye');

    const { username, token, refreshToken, isLoading } = storeToRefs(store);

    function onToggle() {
      const password = document.getElementById('password') as HTMLInputElement;

      if (password.type == 'password') {
        password.setAttribute('type', 'text');

        icon.value = 'fa-eye-slash';
      } else {
        password.setAttribute('type', 'password');

        icon.value = 'fa-eye';
      }
    }

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
          refreshToken.value = data.refreshToken;

          // 쿠키에 토큰 및 유저명 저장
          saveAccessTokenToCookie(data.accessToken);
          saveRefreshTokenToCookie(data.refreshToken);
          saveUserToCookie(name);

          // 메인으로 이동
          router.push({
            name: 'home',
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

    return { onSubmit, message, onToggle, icon };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  background: linear-gradient(
    315deg,
    rgba(101, 0, 94, 1) 3%,
    rgba(60, 132, 206, 1) 38%,
    rgba(48, 238, 226, 1) 68%,
    rgba(255, 25, 25, 1) 98%
  );
  animation: gradient 15s ease infinite;
  background-attachment: fixed;
  background-size: 400% 400%;
  overflow: auto;
  margin: auto;
  height: 100%;
  min-height: 700px;

  display: flex;

  justify-content: center;
  align-items: center;

  position: relative;
}

.square {
  position: absolute;

  border-radius: 10px;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.1);
  animation-delay: calc(-1s * var(--i));
  animation: animate 10s linear infinite;

  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes animate {
  0%,
  100% {
    transform: translateX(-40px);
  }
  50% {
    transform: translateY(40px);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.wave {
  background: rgb(255 255 255 / 25%);

  border-radius: 1000% 1000% 0 0;
  position: fixed;

  width: 200%;
  height: 12em;

  animation: wave 10s -3s linear infinite;

  transform: translate3d(0, 0, 0);

  opacity: 0.8;
  bottom: 0;
  left: 0;
}
.wave:nth-of-type(2) {
  bottom: -1.25em;
  animation: wave 18s linear reverse infinite;
  opacity: 0.8;
}

.wave:nth-of-type(3) {
  bottom: -2.5em;
  animation: wave 20s -1s reverse infinite;
  opacity: 0.9;
}

@keyframes wave {
  2% {
    transform: translateX(1);
  }
  25% {
    transform: translateX(-25%);
  }
  50% {
    transform: translateX(-50%);
  }
  75% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(1);
  }
}

.login-card {
  text-align: center;

  height: 500px;
  width: 80vw;
  max-width: 1000px;

  background: rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.5);

  border-right: 1px solid rgba(255, 255, 255, 0.2);

  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  border-radius: 5px;
  box-shadow: 0px 25px 45px rgba(0, 0, 0, 0.1);

  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

.login-form {
  flex: 1;
}

@media screen and (max-width: 800px) {
  .login-img {
    display: none;
  }

  .login-card {
    width: 500px;
    height: 600px;
  }

  .square {
    display: none;
  }
}

@media screen and (max-width: 500px) {
  .login-card {
    width: 100%;
    height: 100%;

    border-radius: 0;
    border: none;
  }

  .square {
    display: none;
  }
}

.login-img {
  flex: 1;

  background: url('@/assets/logo2.png') no-repeat;

  background-color: rgba(#393a3e, 0.9);

  background-position: center;

  height: 100%;
}

.login-form > form {
  position: relative;

  margin: 0 20px;
}

form > .form-title {
  display: block;
  width: 100%;

  text-align: left;
}

.form-item {
  display: flex;
  margin-bottom: 10px;

  position: relative;
}

.form-item > input {
  width: 100%;
  height: 35px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  outline: none;
  border-radius: 5px;

  background-color: rgb(233, 233, 233);

  padding-left: 15px;

  border-width: 1px;
}

input:focus {
  outline: none;
}

.btn-signin {
  background: #717274;

  color: white;
}

.btn-signin:hover {
  background-color: rgba(#717274, 0.9);
}

.btn-signup {
  background: #fff;

  color: black;

  margin: 0 20px;

  box-sizing: border-box;

  width: calc(100% - 40px);
}

.btn-signup:hover {
  background-color: rgba(#fff, 0.9);
}

button {
  font-size: 15px;
  font-weight: bold;
  height: 45px;
  width: 100%;

  border-radius: 5px;

  border: 0;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
}

.login-message {
  color: red;

  text-align: center;

  font-size: 13px;

  margin: 10px;
}

.item-check {
  text-align: left;

  margin-bottom: 10px;
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
  border-radius: 5px;
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

.line {
  width: calc(100% - 40px);

  height: 1px;

  margin: 20px;

  background: #717274;
}

input::placeholder {
  color: #717274;
  font-weight: bold;
}

#toggler {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
