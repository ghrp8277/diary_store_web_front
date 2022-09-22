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

      <div class="outer">
        <div class="box">
          <span style="--i: 1"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
          <span style="--i: 2"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
          <span style="--i: 3"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
          <span style="--i: 4"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
          <span style="--i: 5"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
          <span style="--i: 6"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
          <span style="--i: 7"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
          <span style="--i: 8"
            ><img :src="require(`@/assets/logo2.png`)"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'GuideView',
  components: {},
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

.outer {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  animation: animate 50s linear infinite;
}

.box span {
  border: 1px solid gray;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform-style: preserve-3d;
  transform: rotateY(calc(var(--i) * 45deg)) translateZ(400px);
  -webkit-box-reflect: below 5px
    linear-gradient(transparent, transparent, #0004);
}

.box span img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes animate {
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }
  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
}
</style>
