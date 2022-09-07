<template>
  <div class="center">
    <h1>500</h1>

    <p>INTERNET SERVER ERROR.</p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #242424;
  font-family: 'Oswald', sans-serif;
  background: -webkit-canvas(noise);
  overflow: hidden;
}
html::after {
  content: '';
  background: radial-gradient(circle, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.center {
  height: 400px;
  width: 500px;
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 250px);
  text-align: center;
}
h1,
p {
  margin: 0;
  padding: 0;
  -webkit-animation: funnytext 4s ease-in-out infinite;
  animation: funnytext 4s ease-in-out infinite;
}
h1 {
  font-size: 16rem;
  color: rgba(0, 0, 0, 0.3);
  -webkit-filter: blur(3px);
  filter: blur(3px);
}
p {
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.6);
}
body::after,
body::before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: -4px;
  height: 4px;
  -webkit-animation: scanline 8s linear infinite;
  animation: scanline 8s linear infinite;
  opacity: 0.33;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5) 90%,
      rgba(0, 0, 0, 0)
    ),
    -webkit-canvas(noise);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5) 90%,
    rgba(0, 0, 0, 0)
  );
}
body::before {
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}
</style>
