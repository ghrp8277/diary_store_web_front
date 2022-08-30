<template>
  <div class="proposals-content">
    <h1 class="proposals-title">제안 관리</h1>

    <div class="box-dropdown">
      <select id="dropdown" name="dropdown" @change="onChange">
        <option value="ALL" selected>전체</option>
        <option value="SUBMISSION_COMPLETE">제출 완료</option>
        <option value="UNDER_REVIEW">심사중</option>
        <option value="NOT_APPROVED">미승인</option>
        <option value="APPROVED">승인</option>
      </select>

      <span>{{ proposals.length }}건 </span>
    </div>

    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제안상태</th>
          <th>이모티콘 상품명</th>
          <th>제안일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proposal, index) in proposals" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ isConfirmMatched(proposal.is_confirm) }}</td>
          <td>{{ proposal.product_name }}</td>
          <td>{{ dateFormat(proposal.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { useStore } from '@/services/pinia/store';
import { IsConfirm } from '@/types/emojiFilesInfo';
import moment from 'moment';

export default defineComponent({
  name: 'ProposalsContent',
  setup() {
    const store = useStore();

    const proposals = computed(() => store.emojiFilesInfo);

    const onChange = (e: any) => {
      console.log(e.target.value);
    };

    return {
      proposals,
      onChange,
      dateFormat: (date: Date) => {
        return moment(date).format('YYYY-MM-DD');
      },
      isConfirmMatched: (is_confirm: number) => {
        switch (IsConfirm[is_confirm]) {
          case 'SUBMISSION_COMPLETE':
            return '제출 완료';
          case 'UNDER_REVIEW':
            return '심사중';
          case 'NOT_APPROVED':
            return '미승인';
          case 'APPROVED':
            return '승인';
        }
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.proposals-content {
  margin: 30px 60px;
}
.proposals-title {
  text-align: left;

  border-bottom: 1px solid #000;
}

.box-dropdown {
  text-align: left;

  font-size: 13px;

  font-weight: normal;

  color: #000;

  margin-top: 30px;
}

#dropdown {
  border: none;

  cursor: pointer;

  direction: rtl;
}
.proposals-content > table {
  width: 100%;
  margin-top: 50px;

  border-top: 2px solid #000;

  border-spacing: 0;

  border-bottom: 2px solid rgb(202, 202, 202);
}

.proposals-content > table > thead {
  background-color: rgb(170, 170, 170, 0.3);
}

.proposals-content > table > thead > tr > th {
  font-size: 15px;

  font-weight: bold;

  padding: 10px;

  color: #000;

  border-bottom: 1px solid #000;
}

.proposals-content > table > tbody > tr > td {
  font-size: 15px;

  padding: 10px;

  color: #000;
}
</style>
