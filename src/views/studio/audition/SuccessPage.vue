<template>
  <div class="success-content">
    <div class="confirm-step">
      <ul class="progressbar">
        <li class="active">제출완료</li>
        <li>심사중</li>
        <li>심사완료</li>
        <li>상품화</li>
      </ul>
    </div>

    <div class="success-comment">
      <p><b>감사합니다.</b></p>
      <p><b>제안이 정상적으로 제출 되었습니다.</b></p>
    </div>

    <span class="success-sub-comment"
      >이모티콘 심사 결과는 1개월 이내에 이메일 / 제안 관리에서 확인
      가능합니다.</span
    >

    <table>
      <thead>
        <tr>
          <th>제안상태</th>
          <th>이모티콘 상품명</th>
          <th>이모티콘 카테고리</th>
          <th>태그</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- <td>{{ is_confirm }}</td> -->
          <td>{{ query.product_name }}</td>
          <td>{{ query.category }}</td>
          <td>{{ query.tag }}</td>
        </tr>
      </tbody>
    </table>

    <button class="submit" @click="router.push({ name: 'proposals' })">
      제안 관리
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
// import { IsConfirm2 } from '@/types/proposals';
import router from '@/router';

export default defineComponent({
  name: 'SuccessPageView',
  setup() {
    const query = router.currentRoute.query;

    return {
      query,
      router,
      // is_confirm: IsConfirm2[Number(query.is_confirm)],
    };
  },
});
</script>

<style lang="scss" scoped>
.success-content {
  padding: 30px;
}

.success-comment {
  font-size: 20px;

  color: #7d7d7d;

  margin-top: 90px;
}

.success-sub-comment {
  font-size: 13px;

  color: #93969c;
  font-weight: bold;
}

.submit {
  cursor: pointer;
  padding: 15px 60px;

  color: #fff;

  font-size: 15px;

  background-color: #7d7d7d;

  border: 1px solid #6d6d6d;

  margin-top: 50px;
}

.submit:hover {
  background-color: rgba(#7d7d7d, 0.7);
}

.progressbar-wrapper {
  background: #fff;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
}

.progressbar li {
  list-style-type: none;
  width: 20%;
  display: inline-block;
  font-size: 13px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;
}

.progressbar li:before {
  width: 60px;
  height: 60px;
  content: '';
  line-height: 60px;
  border: 2px solid #7d7d7d;
  display: block;
  text-align: center;
  margin: 0 auto 3px auto;
  border-radius: 50%;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  z-index: 2;
  background-color: #e9e9e9;
}

.progressbar li:after {
  width: 100%;
  height: 2px;
  content: '';
  position: absolute;
  background-color: #7d7d7d;
  top: 30px;
  left: -50%;
  z-index: 0;
}

.progressbar li:first-child:after {
  content: none;
}

// active inside circle text set
.progressbar li.active {
  color: #6d6d6d;
  font-weight: bold;
  font-size: 13px;
}

// active inside circle color set
.progressbar li.active:before {
  border-color: #ffbb1b;
  background: #efc706;
}

// active outside line color set
.progressbar li.active + li:after {
  background-color: #efc706;
}

.progressbar {
  counter-reset: step;
}

.progressbar li:before {
  content: counter(step);
  counter-increment: step;
}

.success-content > table {
  width: 100%;
  margin-top: 50px;

  border-top: 2px solid #000;

  border-spacing: 0;

  border-bottom: 2px solid rgb(202, 202, 202);

  table-layout: fixed;
}

.success-content > table > thead {
  background-color: rgb(170, 170, 170, 0.3);
}

.success-content > table > thead > tr > th {
  font-size: 15px;

  font-weight: bold;

  padding: 10px;

  color: #000;

  border-bottom: 1px solid #000;
}

.success-content > table > tbody > tr {
  cursor: pointer;
}

.success-content > table > tbody > tr:hover {
  background-color: rgba(#666, 0.1);
}

.success-content > table > tbody > tr > td {
  font-size: 15px;

  padding: 10px;

  color: #000;
}
</style>
