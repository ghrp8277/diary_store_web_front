<template>
  <div class="home">
    <div class="proposal-guide-box">
      <h5>이모티콘 제작부터 출시까지</h5>
      <strong class="proposal-guide-title"
        >이모티콘
        <em
          >제안
          <svg viewBox="00 70 36">
            <path
              d="M1.9710 30.8153H63.0244C65.526930.8152 75.5358 -3.68471 35.4998 2.81531C-16.159811.2025 0.894099 33.9766 26.9922 34.3153C104.062 10.315354.5169 -6.68469 23.489 9.31527"
            />
          </svg>
        </em>
        프로세스
      </strong>
    </div>

    <swipe-card />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SwipeCard from '@/components/SwipeCard.vue';

export default defineComponent({
  name: 'GuideView',
  components: {
    SwipeCard,
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: white;
}

.proposal-guide-box {
  text-align: center;

  width: 100%;
}

.proposal-guide-title {
  font-size: 21px;
  margin: 0;

  color: #2b3044;

  :root {
    --text: #2b3044;
    --line: #bbc1e1;
    --line-active: #275efe;
  }

  em {
    font-style: normal;
    display: inline-block;
    position: relative;
    text-decoration: none;
    color: inherit;
    margin: 0 var(--spacing, 0);
    transition: margin 0.25s;

    svg {
      width: 56px;
      height: 40px;
      position: absolute;

      left: 60%;
      bottom: 0;
      transform: translate(-50%, 7px) translateZ(0);

      fill: none;
      stroke: var(--stroke, #bbc1e1);
      stroke-linecap: round;
      stroke-width: 2px;
      stroke-dasharray: var(--offset, 69px) 278px;

      stroke-dashoffset: 361px;
      transition: stroke 0.25s ease var(--stroke-delay, 0s),
        stroke-dasharray 0.35s;
    }
  }

  em:hover {
    --spacing: 10px;
    --stroke: var(#275efe);
    --stroke-delay: 0.1s;
    --offset: 180px;
  }
}
</style>
