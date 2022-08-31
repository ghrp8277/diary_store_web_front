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

    <table @click="onClick">
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
          <td>{{ proposal.id }}</td>
          <td>{{ isConfirmMatched(proposal.is_confirm) }}</td>
          <td>{{ proposal.product_name }}</td>
          <td>{{ dateFormat(proposal.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { useStore } from '@/services/pinia/store';
import { IsConfirm } from '@/types/emojiFilesInfo';
import moment from 'moment';

export default defineComponent({
  name: 'ProposalsContent',
  setup() {
    const store = useStore();

    const emojiFilesInfo = computed(() => store.emojiFilesInfo);
    const proposals = ref(emojiFilesInfo.value);

    const onChange = (e: any) => {
      switch (e.target.value) {
        case 'ALL':
          proposals.value = [...emojiFilesInfo.value];
          break;
        case 'SUBMISSION_COMPLETE':
          proposals.value = [
            ...emojiFilesInfo.value.filter(
              (emojiFileInfo) => emojiFileInfo.is_confirm == 0,
            ),
          ];
          break;
        case 'UNDER_REVIEW':
          proposals.value = [
            ...emojiFilesInfo.value.filter(
              (emojiFileInfo) => emojiFileInfo.is_confirm == 1,
            ),
          ];
          break;
        case 'NOT_APPROVED':
          proposals.value = [
            ...emojiFilesInfo.value.filter(
              (emojiFileInfo) => emojiFileInfo.is_confirm == 2,
            ),
          ];
          break;
        case 'APPROVED':
          proposals.value = [
            ...emojiFilesInfo.value.filter(
              (emojiFileInfo) => emojiFileInfo.is_confirm == 3,
            ),
          ];
          break;
      }
    };

    const onClick = (e: any) => {
      function tdClick(td: any) {
        const tr = td.parentNode;

        const id = tr.children[0].innerText;
        const is_confirm = tr.children[1].innerText;
        const product_name = tr.children[2].innerText;
        const createdAt = tr.children[3].innerText;

        console.log(id, is_confirm, product_name, createdAt);
      }

      const td = e.target.closest('td');

      if (!td) return;

      tdClick(td);
    };

    return {
      proposals,
      onChange,
      onClick,
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

  table-layout: fixed;
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

.proposals-content > table > tbody > tr {
  cursor: pointer;
}

.proposals-content > table > tbody > tr:hover {
  background-color: rgba(#666, 0.1);
}

.proposals-content > table > tbody > tr > td {
  font-size: 15px;

  padding: 10px;

  color: #000;
}
</style>
