<template>
  <div class="box">
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="loading">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'LoadingComponent',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 100;
}

.box > .loading {
  font-size: 30px;
  font-weight: bold;

  text-indent: 10px;

  position: absolute;
  top: 0;
  left: -100px;

  width: 200px;
}

.loading span {
  display: inline-block;
  margin: 0 -0.05em;
  animation: loading 1.2s infinite alternate;

  color: #1bc9f5;

  text-shadow: 2px 2px 2px gray;
}

.loading span:nth-child(2) {
  animation-delay: 0.2s;

  color: #37eb26;
}

.loading span:nth-child(3) {
  animation-delay: 0.4s;

  color: #e41db9;
}

.loading span:nth-child(4) {
  animation-delay: 0.6s;

  color: #1bc9f5;
}

.loading span:nth-child(5) {
  animation-delay: 0.8s;

  color: #37eb26;
}
.loading span:nth-child(6) {
  animation-delay: 1s;

  color: #e41db9;
}

.loading span:nth-child(7) {
  animation-delay: 1.2s;
}

@keyframes loading {
  0% {
    filter: blur(0);
    opacity: 1;
  }
  100% {
    filter: blur(5px);
    opacity: 0.2;
  }
}

.ring {
  position: relative;
  width: 30px;
  height: 30px;
  right: 30px;
  bottom: 40px;
  border-radius: 50%;
  border-left: 4px solid #1bc9f5;
  border-top: 4px solid #1bc9f5;
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.ring:nth-child(2) {
  left: 10px;
  bottom: 75px;
  animation-delay: -1s;
  border-left: 4px solid #37eb26;
  border-top: 4px solid #37eb26;
  animation: animate2 4s linear infinite;
}

@keyframes animate2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.ring:nth-child(3) {
  position: absolute;
  top: -60px;
  left: -10px;
  animation-delay: -3s;
  border-left: 4px solid #e41db9;
  border-top: 4px solid #e41db9;
  animation: animate3 4s linear infinite;
}

@keyframes animate3 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
