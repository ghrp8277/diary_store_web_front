<template>
  <div class="success-content">
    <div class="firework"></div>
    <div class="firework"></div>
    <div class="firework"></div>

    <div class="confirm-step">
      <ul class="progressbar">
        <li class="active">제출완료</li>
        <li>심사중</li>
        <li>심사완료</li>
        <li>상품화</li>
      </ul>
    </div>

    <div class="success-comment">
      <p><b>감사합니다.</b></p>
      <p><b>제안이 정상적으로 제출 되었습니다.</b></p>
    </div>

    <span class="success-sub-comment"
      >이모티콘 심사 결과는 1개월 이내에 이메일 / 제안 관리에서 확인
      가능합니다.</span
    >

    <table>
      <thead>
        <tr>
          <th>제안상태</th>
          <th>이모티콘 상품명</th>
          <th>이모티콘 카테고리</th>
          <th>태그</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ confirmMatched }}</td>
          <td>{{ product_name }}</td>
          <td>{{ category }}</td>
          <td>{{ tag }}</td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'proposals' }" tag="button" class="submit">
      <span>제안 관리</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { IsConfirm } from '@/types/emojiConfirm';
import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'SuccessPageView',
  props: {
    product_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    is_confirm: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { is_confirm } = toRefs(props);

    function confirmMatched() {
      const index = IsConfirm[is_confirm.value];

      let result = '';

      switch (index) {
        case 'SUBMISSION_COMPLETE':
          result = '제출완료';
          break;
        case 'UNDER_REVIEW':
          result = '심사중';
          break;
        case 'NOT_APPROVED':
          result = '미승인';
          break;
        case 'APPROVED':
          result = '승인';
          break;
      }

      return result;
    }

    return {
      confirmMatched: confirmMatched(),
    };
  },
});
</script>

<style lang="scss" scoped>
.success-content {
  padding: 30px;
}

.success-comment {
  font-size: 20px;

  color: #7d7d7d;

  margin-top: 90px;
}

.success-sub-comment {
  font-size: 13px;

  color: #93969c;
  font-weight: bold;
}

.submit {
  cursor: pointer;
  padding: 15px 60px;

  color: #fff;

  font-size: 15px;

  background-color: #7d7d7d;

  border: 1px solid #6d6d6d;

  margin-top: 50px;
}

.submit:hover {
  background-color: rgba(#7d7d7d, 0.7);
}

.progressbar-wrapper {
  background: #fff;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
}

.progressbar li {
  list-style-type: none;
  width: 20%;
  display: inline-block;
  font-size: 13px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;
}

.progressbar li:before {
  width: 60px;
  height: 60px;
  content: '';
  line-height: 60px;
  border: 2px solid #7d7d7d;
  display: block;
  text-align: center;
  margin: 0 auto 3px auto;
  border-radius: 50%;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  z-index: 2;
  background-color: #e9e9e9;
}

.progressbar li:after {
  width: 100%;
  height: 2px;
  content: '';
  position: absolute;
  background-color: #7d7d7d;
  top: 30px;
  left: -50%;
  z-index: 0;
}

.progressbar li:first-child:after {
  content: none;
}

// active inside circle text set
.progressbar li.active {
  color: #6d6d6d;
  font-weight: bold;
  font-size: 13px;
}

// active inside circle color set
.progressbar li.active:before {
  border-color: #ffbb1b;
  background: #efc706;
}

// active outside line color set
.progressbar li.active + li:after {
  background-color: #efc706;
}

.progressbar {
  counter-reset: step;
}

.progressbar li:before {
  content: counter(step);
  counter-increment: step;
}

.success-content > table {
  width: 100%;
  margin-top: 50px;

  border-top: 2px solid #000;

  border-spacing: 0;

  border-bottom: 2px solid rgb(202, 202, 202);

  table-layout: fixed;
}

.success-content > table > thead {
  background-color: rgb(170, 170, 170, 0.3);
}

.success-content > table > thead > tr > th {
  font-size: 15px;

  font-weight: bold;

  padding: 10px;

  color: #000;

  border-bottom: 1px solid #000;
}

.success-content > table > tbody > tr > td {
  font-size: 15px;

  padding: 10px;

  color: #000;
}

@keyframes firework {
  0% {
    transform: translate(var(--x), var(--initialY));

    width: var(--initialSize);
    opacity: 1;
  }
  50% {
    width: 0.5vmin;
    opacity: 1;
  }
  100% {
    width: var(--finalSize);
    opacity: 0;
  }
}

.firework,
.firework::before,
.firework::after {
  --initialSize: 0.5vmin;
  --finalSize: 45vmin;
  --color1: yellow;
  --color2: khaki;
  --color3: white;
  --color4: lime;
  --color5: gold;
  --color6: mediumseagreen;
  --y: -30vmin;
  --x: 50%;
  --initialY: 60vmin;
  content: '';
  animation: firework 2s infinite;
  position: absolute;
  top: 45%;
  left: 60%;
  transform: translate(-50%, var(--y));
  width: var(--initialSize);
  aspect-ratio: 1;

  background: radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 50% 8%,
    radial-gradient(circle, var(--color2) 0.2vmin, #0000 0) 100% 50%,
    radial-gradient(circle, var(--color3) 0.2vmin, #0000 0) 50% 100%,
    radial-gradient(circle, var(--color4) 0.2vmin, #0000 0) 0% 50%,
    radial-gradient(circle, var(--color5) 0.2vmin, #0000 0) 80% 90%,
    radial-gradient(circle, var(--color6) 0.2vmin, #0000 0) 95% 90%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 90% 70%,
    radial-gradient(circle, var(--color2) 0.2vmin, #0000 0) 100% 60%,
    radial-gradient(circle, var(--color3) 0.2vmin, #0000 0) 55% 80%,
    radial-gradient(circle, var(--color4) 0.2vmin, #0000 0) 70% 77%,
    radial-gradient(circle, var(--color5) 0.2vmin, #0000 0) 22% 90%,
    radial-gradient(circle, var(--color6) 0.2vmin, #0000 0) 45% 90%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 33% 70%,
    radial-gradient(circle, var(--color2) 0.2vmin, #0000 0) 10% 60%,
    radial-gradient(circle, var(--color3) 0.2vmin, #0000 0) 31% 80%,
    radial-gradient(circle, var(--color4) 0.2vmin, #0000 0) 28% 77%,
    radial-gradient(circle, var(--color5) 0.2vmin, #0000 0) 13% 72%,
    radial-gradient(circle, var(--color6) 0.2vmin, #0000 0) 80% 10%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 95% 14%,
    radial-gradient(circle, var(--color2) 0.2vmin, #0000 0) 90% 23%,
    radial-gradient(circle, var(--color3) 0.2vmin, #0000 0) 100% 43%,
    radial-gradient(circle, var(--color4) 0.2vmin, #0000 0) 85% 27%,
    radial-gradient(circle, var(--color5) 0.2vmin, #0000 0) 77% 37%,
    radial-gradient(circle, var(--color6) 0.2vmin, #0000 0) 60% 7%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 22% 14%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 45% 20%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 33% 34%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 10% 29%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 31% 37%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 28% 7%,
    radial-gradient(circle, var(--color1) 0.2vmin, #0000 0) 13% 42%;

  background-size: var(--initialSize) var(--initialSize);
  background-repeat: no-repeat;
}

.firework::before {
  --x: -50%;
  --y: -50%;
  --initialY: -50%;
  transform: translate(-50%, -50%) rotate(40deg) scale(1.3) rotateY(40deg);
}

.firework::after {
  --x: -50%;
  --y: -50%;
  --initialY: -50%;
  transform: translate(-50%, -50%) rotate(170deg) scale(1.15) rotateY(-30deg);
}

.firework:nth-child(2) {
  --x: 38vmin;
}

.firework:nth-child(2),
.firework:nth-child(2)::before,
.firework:nth-child(2)::after {
  --color1: pink;
  --color2: violet;
  --color3: fuchsia;
  --color4: orchid;
  --color5: plum;
  --color6: lavender;
  --finalSize: 40vmin;
  left: 35%;
  top: 40%;
  animation-delay: -0.25s;
}

.firework:nth-child(3) {
  --x: 30vmin;
}

.firework:nth-child(3),
.firework:nth-child(3)::before,
.firework:nth-child(3)::after {
  --color1: cyan;
  --color2: lightcyan;
  --color3: lightblue;
  --color4: PaleTurquoise;
  --color5: SkyBlue;
  --color6: lavender;
  --finalSize: 35vmin;
  left: 80%;
  top: 40%;
  animation-delay: -0.4s;
}
</style>
