<template>
  <div class="swipe-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';

export default defineComponent({
  name: 'SwipeCard',
  setup() {
    const articles = new Map([
      ['6392322', { tx: '-90%', tz: '-70vmin', ry: '60deg' }],
      ['1761279', { tz: '-118vmin' }],
      ['1679772', { tx: '90%', tz: '-70vmin', ry: '-60deg' }],
    ]);

    onMounted(() => {
      let container = document.querySelector('.swipe-container') as HTMLElement;

      function init() {
        for (const [id, { tx, tz, ry }] of articles.entries()) {
          container.appendChild(makeArticleElement(id, tx, tz, ry));
        }

        document.addEventListener('click', onClick);
      }

      function onClick(e: Event) {
        const target = e.target as HTMLElement;

        const targetId = target.closest('article')?.id;

        let [itx, itz, iry] = [0, 0, 0] as any[];

        if (targetId && container.dataset.focus !== targetId) {
          const { tx, tz, ry } = articles.get(targetId) || {};

          [itx, itz, iry] = [tx, tz, ry].map(inverseTransformation);

          container.setAttribute('data-focus', targetId);
        } else {
          container.removeAttribute('data-focus');
        }

        container.style.transform = `rotateY(${iry}) translate3d(${itx}, 0, ${itz})`;
      }

      function inverseTransformation(transform: any) {
        if (!transform) return 0;

        const [_, value, unit] = transform.match(/(-?\d+)(.*)/);

        return `${-Number(value)}${unit}`;
      }

      function makeArticleElement(
        id: string,
        tx = 0 as any,
        tz = 0 as any,
        ry = 0 as any,
      ) {
        const img = document.createElement('img');

        img.src = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compresss&cs=tinysrgb&dpr=18w=500`;

        const button = document.createElement('button');

        button.appendChild(img);

        const element = document.createElement('article');

        element.id = id;
        element.style.transform = `translate3d(${tx}, 0, ${tz}) rotateY(${ry})`;
        element.appendChild(button);

        return element;
      }

      init();
    });
    return {};
  },
});
</script>

<style lang="scss" scoped>
.swipe-container {
  position: relative;

  transform-style: preserve-3d;
  width: 100%;
  height: 100%;

  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

article {
  position: absolute;
  inset: 0;
  -webkit-box-reflect: below 50px
    linear-gradient(transparent, rgba(255, 255, 255, 0.15));
}

article button {
  border: 0;
  outline: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 5%;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

article button:focus-visible {
  box-shadow: 0 0 0 3px cyan;
}

article button:focus {
  box-shadow: 0 0 0 3px cyan;
}

article button:not(:focus-visible) {
  box-shadow: none;
}

article button:hover,
article button:focus,
article button:hover img,
article button:focus img {
  transform: scale(1.07);
}
</style>
