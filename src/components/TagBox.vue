<template>
  <div class="tag-container">
    <ul>
      <li
        v-for="(tag, index) in tags"
        :key="index"
        :style="{ background: generateRandomColor() }"
        @click="selectTag(tag)"
      >
        <span>#{{ tag.tag_name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  ref,
  watch,
} from '@vue/composition-api';
import { fetchTagInfo } from '@/apis/store';
import { EmojiTag } from '@/types/emojiTag';

export default defineComponent({
  name: 'NewEmotionView',
  props: {
    category_value: {
      type: String,
      required: true,
    },
  },
  emits: ['onSelectTag', 'onTagMessage', 'onClear'],
  setup(props, { emit }) {
    const { category_value } = toRefs(props);

    const tags = ref<EmojiTag[]>([]);
    let count = 3;

    function generateRandomColor() {
      let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

      return randomColor;
    }

    function selectTag(tag: EmojiTag) {
      if (count > 0) {
        for (let i = 0; i < tags.value.length; i++) {
          if (tags.value[i].id === tag.id) {
            tags.value.splice(i, 1);
            i--;
          }
        }

        emit('onSelectTag', tag);

        count -= 1;
      } else {
        emit('onTagMessage', '최대 선택 수를 넘었습니다.');
      }
    }

    watch(
      () => category_value.value,
      async (newVal) => {
        const data = await fetchTagInfo(newVal);

        tags.value = data;

        emit('onClear', true);

        count = 3;
      },
    );

    onMounted(async () => {
      const data = await fetchTagInfo(category_value.value);

      tags.value = data;
    });

    return {
      tags,
      generateRandomColor,
      selectTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-container {
  position: absolute;

  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  top: 40px;
  left: 167px;

  width: 532px;
  height: auto;

  border: 1px solid #e4e4e4;

  background: #fcfcfc;

  box-shadow: 1px 1px 1px rgba(#000, 0.3);
  overflow: hidden;

  ul {
    width: 100%;
    overflow-x: auto;
    padding-inline-start: 0;
    margin: 0;
    list-style: none;

    font-style: normal;

    display: flex;
    flex-wrap: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      min-width: 50px;
      border-radius: 5px;
      border: 1px solid #e4e4e4;

      padding: 3px;

      font-size: 13px;

      margin: 3px;

      color: white;
      cursor: pointer;

      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      font-weight: bold;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
