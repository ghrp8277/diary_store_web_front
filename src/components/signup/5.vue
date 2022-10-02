<template>
  <div>
    <strong class="title"
      ><em>환영합니다!!</em> <br />
      회원가입이 완료되었습니다.</strong
    >

    <h6>아래 로그인 버튼을 눌러 로그인하시기 바랍니다.</h6>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="js">
import { defineComponent, onMounted, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Step-5',
  emit: ['next'],
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    onMounted(() => {
        let W = window.innerWidth;
        let H = window.innerHeight;
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        const maxConfettis = 30;
        const particles = [];

        const possibleColors = [
        'DodgerBlue',
        'OliveDrab',
        'Gold',
        'Pink',
        'SlateBlue',
        'LightBlue',
        'Gold',
        'Violet',
        'PaleGreen',
        'SteelBlue',
        'SandyBrown',
        'Chocolate',
        'Crimson',
        ];

        function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
        }

        function confettiParticle() {
        this.x = Math.random() * W; // x
        this.y = Math.random() * H - H; // y
        this.r = randomFromTo(11, 33); // radius
        this.d = Math.random() * maxConfettis + 11;
        this.color =
            possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;

        this.draw = function () {
            context.beginPath();
            context.lineWidth = this.r / 2;
            context.strokeStyle = this.color;
            context.moveTo(this.x + this.tilt + this.r / 3, this.y);
            context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
            return context.stroke();
        };
        }

        function Draw() {
        const results = [];

        // Magical recursive functional love
        requestAnimationFrame(Draw);

        context.clearRect(0, 0, W, window.innerHeight);

        for (let i = 0; i < maxConfettis; i++) {
            results.push(particles[i].draw());
        }

        let particle = {};
        let remainingFlakes = 0;

        for (let i = 0; i < maxConfettis; i++) {
            particle = particles[i];

            particle.tiltAngle += particle.tiltAngleIncremental;
            particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
            particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

            if (particle.y <= H) remainingFlakes++;

            // If a confetti has fluttered out of view,
            // bring it back to above the viewport and let if re-fall.
            if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
            }
        }

        return results;
        }

        window.addEventListener(
            'resize',
            function () {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            },
            false,
        );

        for (var i = 0; i < maxConfettis; i++) {
            particles.push(new confettiParticle());
        }

        canvas.width = W;
        canvas.height = H;
        Draw();
    });

    onMounted(() => {
      emit('next', true, '')
    })

    return {};
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  display: block;
}

.title {
  font-size: 25px;

  color: rgb(56, 56, 61);

  font-weight: 500;

  em {
    font-weight: bold;
    font-style: normal;
    color: red;
  }
}

#canvas {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
