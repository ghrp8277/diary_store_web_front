<template>
  <div v-if="!isLoading">
    <div class="title-head">
      <div class="wrap-content">
        <span v-if="notice.is_important" class="txt-tag">중요</span>
        <strong>{{ notice.title }}</strong>
      </div>
      <span class="txt-date">{{ toStringByFormatting(notice.createdAt) }}</span>
    </div>

    <div class="content" v-html="htmlBind"></div>

    <router-link :to="{ name: 'notices' }" tag="div" class="paging-recent">
      <span>목록</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  computed,
} from '@vue/composition-api';
import apis from '@/apis';
import { useStore } from '@/services/pinia';

export default defineComponent({
  name: 'NoticeView',
  props: {
    id: {
      type: String,
      required: true,
    },
    file_name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { apiModule } = apis();
    const { id, file_name } = toRefs(props);
    const htmlBind = ref('');

    const notice = ref({
      id: id.value,
      is_important: false,
      file_name: file_name.value,
      title: '',
      createdAt: '',
    });

    function toStringByFormatting(source: string, delimiter = '-') {
      const date = new Date(source);
      function leftPad(value: any) {
        if (value >= 10) {
          return value;
        }

        return `0${value}`;
      }

      const year = date.getFullYear();
      const month = leftPad(date.getMonth() + 1);
      const day = leftPad(date.getDate());

      return [year, month, day].join(delimiter);
    }

    onMounted(async () => {
      const { data } = await apiModule.storeApiModule.fetchStudioNoticeInfo(
        'test',
        Number(id.value),
        file_name.value,
      );

      htmlBind.value = data.html;

      notice.value = data.notice;
    });

    return {
      htmlBind: computed(() => htmlBind.value),
      notice: computed(() => notice.value),
      toStringByFormatting,
      isLoading: computed(() => useStore().isLoading),
    };
  },
});
</script>

<style lang="scss" scoped>
.title-head {
  height: 52px;
  margin-bottom: 20px;
  border: 1px solid #e6e6e6;
  line-height: 54px;
}

.wrap-content {
  float: left;
  width: 500px;
  height: 100%;
  padding: 0 40px;
}

.wrap-content > strong {
  font-size: 13px;
  color: #717274;

  display: inline-block;
  overflow: hidden;
  max-width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.txt-tag {
  float: left;
  margin: 18px 13px 0 0;
  padding: 0 8px;
  border-radius: 3px;
  font-size: 10px;
  line-height: 18px;
  background: #393a3e;
  color: #fff;
}

.txt-date {
  display: block;
  overflow: hidden;

  font-size: 11px;
}

.content {
  margin: 30px 0;

  border-bottom: 1px solid #e6e6e6;
}

.paging-recent {
  text-align: center;

  cursor: pointer;
}

.paging-recent > span:hover {
  color: #ffbb1b;
}

.paging-recent > span {
  margin: 0 40px;
  color: #2d2e32;

  font-size: 13px;
}
</style>
