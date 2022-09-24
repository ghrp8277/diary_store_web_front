<template>
  <div class="error-container">
    <p class="zoom-area">
      <b>페이지를 찾을 수 없어요.</b>
      올바른 URL을 입력하셨는지 확인해주세요.
    </p>
    <section class="error-container">
      <span><span>4</span></span>
      <span>0</span>
      <span><span>4</span></span>
    </section>

    <div class="link-container">
      <router-link to="/" class="more-link">
        <span>메인화면으로</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: '404View',
  setup() {
    return {};
  },
});
</script>

<style scoped>
.error-container {
  text-align: center;
  font-size: 180px;
  font-weight: 800;
  margin: 20px 15px;
}

.error-container > span {
  display: inline-block;
  line-height: 0.7;
  position: relative;
  color: #ffb485;
}

.error-container > span > span {
  display: inline-block;
  position: relative;
}

.error-container > span:nth-of-type(1) {
  perspective: 1000px;
  perspective-origin: 50% 50%;
  color: #f0e395;
}

.error-container > span:nth-of-type(1) > span {
  transform-origin: 50% 100% 0px;
  transform: rotateX(0);
  animation: easyoutelastic 8s infinite;
}

.error-container > span:nth-of-type(3) {
  perspective: none;
  perspective-origin: 50% 50%;
  color: #d15c95;
}

.error-container > span:nth-of-type(3) > span {
  transform-origin: 100% 100% 0px;
  transform: rotate(0deg);
  animation: rotatedrop 8s infinite;
}

@keyframes easyoutelastic {
  0% {
    transform: rotateX(0);
  }
  9% {
    transform: rotateX(210deg);
  }
  13% {
    transform: rotateX(150deg);
  }
  16% {
    transform: rotateX(200deg);
  }
  18% {
    transform: rotateX(170deg);
  }
  20% {
    transform: rotateX(180deg);
  }
  60% {
    transform: rotateX(180deg);
  }
  80% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(0);
  }
}

@keyframes rotatedrop {
  0% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(30deg);
  }
  15% {
    transform: rotate(90deg);
  }
  70% {
    transform: rotate(90deg);
  }
  80% {
    transform: rotate(0);
  }
  100% {
    transform: rotateX(0);
  }
}

h1 {
  text-align: center;
  margin: 30px 15px;
}

.zoom-area {
  max-width: 490px;
  margin: 30px auto 30px;
  font-size: 19px;
  text-align: center;

  color: #ffb485;
}

.zoom-area > b {
  color: #d15c95;
}

.link-container {
  text-align: center;
}

.more-link:hover {
  background: rgba(55, 55, 55, 0.2);
}

a.more-link {
  text-transform: uppercase;
  font-size: 13px;
  background-color: #bbb;
  padding: 10px 15px;
  border-radius: 0;
  color: #fff;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  line-height: 1.5;
  text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}
</style>
