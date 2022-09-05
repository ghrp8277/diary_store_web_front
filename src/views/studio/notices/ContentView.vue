<template>
  <div class="notice-content">
    <table>
      <colgroup>
        <col width="70%" />
        <col width="30%" />
      </colgroup>
      <tbody>
        <tr
          v-for="(notice, index) in notices"
          :key="index"
          @click="onClick($event, notice)"
        >
          <td scope="col" class="txt-title">
            <span v-if="notice.is_important" class="txt-tag">중요</span>
            {{ notice.title }}
          </td>
          <td scope="col" class="txt-date">
            {{ toStringByFormatting(notice.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@vue/composition-api';
import apis from '@/apis';
import { Notice } from '@/types/notice';
import router from '@/router';

export default defineComponent({
  name: 'NoticesContentView',
  setup() {
    const { apiModule } = apis();
    const notices = ref<Notice[]>([]);

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

    function onClick(
      e: Event,
      notice: {
        id: number;
        is_important: boolean;
        title: string;
        createdAt: string;
        file_name: string;
      },
    ) {
      router.push({
        name: 'notice',
        params: {
          id: String(notice.id),
          file_name: notice.file_name,
        },
      });
    }

    onMounted(async () => {
      const { data } = await apiModule.storeApiModule.fetchStudioNoticesInfo(
        'test',
      );
      notices.value = [...data];
    });

    return {
      notices: computed(() => notices.value),
      toStringByFormatting,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.notice-content > table {
  width: 100%;

  border-spacing: 2px;

  border: 1px solid #e6e6e6;

  border-collapse: collapse;

  margin: 42px 0 40px;
}

.notice-content > table > tbody > tr {
  cursor: pointer;

  border-color: inherit;

  background-color: #fafafa;
}

.notice-content > table > tbody > tr:hover {
  background-color: rgba(#717274, 0.5);
}

.notice-content > table > tbody > tr > td {
  padding: 15px;

  color: #717274;

  font-size: 13px;

  border-bottom: 1px solid #e0e0e0;
}

.txt-tag {
  float: left;
  padding: 0 8px;
  border-radius: 3px;
  font-size: 10px;
  line-height: 18px;
  background: #393a3e;
  color: #fff;
}

.txt-title {
  // text-align: left;
}
</style>
