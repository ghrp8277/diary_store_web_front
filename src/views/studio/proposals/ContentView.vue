<template>
  <div class="proposals-content">
    <h1 class="proposals-title">제안 관리</h1>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProposalsContentView',
  setup() {
    return {};
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
