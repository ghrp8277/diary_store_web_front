<template>
  <div class="login-container">
    <div class="content">
      <form method="POST" @submit="onSubmit">
        <label for="username">아이디</label>
        <input type="text" id="username" name="username" autocomplete="off" />

        <label for="password">비밀번호</label>
        <input type="text" id="password" name="password" autocomplete="off" />

        <button type="submit" id="connect" class="btn-connect">
          <span>Connect</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 60px 30px;
  width: 380px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
}

.content > form > label {
  width: 60px;
  height: 35px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #ffbb70;
  margin-top: 30px;
  margin-left: 10px;
}

.content > form > input {
  width: 280px;
  height: 35px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #ffbb70;
  margin-top: 30px;
  margin-left: 10px;
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 15px #ffbb70;
}

button {
  float: right;
  height: 30px;
  background: #9a86fd;
  border-radius: 25px;
  color: white;
  border: 0;
  margin-top: 30px;
  margin-right: 30px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
}

button:hover {
  box-shadow: 0px 0px 15px #ffbb70;
}
</style>
