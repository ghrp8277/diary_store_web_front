<template>
  <div class="container">
    <h1 class="new-title">
      신규 제안
      <span>
        <em class="em-info">필수 입력 항목입니다.</em>
      </span>
    </h1>

    <form class="new-form">
      <strong class="form-title">이모티콘 정보</strong>

      <div class="form-item">
        <label for="emoji-name">이모티콘 상품명 <span>●</span></label>
        <input
          id="emoji-name"
          type="text"
          placeholder="상품명을 2~22자 내로 입력해 주세요."
        />
      </div>

      <div class="form-item">
        <label for="emoji-category">이모티콘 카테고리 <span>●</span></label>

        <select id="emoji-category" name="category">
          <option value="" disabled selected>카테고리 선택</option>
          <option value="animal">동물</option>
          <option value="character">인물</option>
          <option value="illustration">일러스트</option>
        </select>
      </div>

      <div class="form-item">
        <label for="emoji-tag">이모티콘 태그<span>●</span></label>
        <input
          id="emoji-tag"
          type="text"
          placeholder="태그를 1~15자 내로 입력해 주세요."
          disabled
        />
      </div>

      <div class="form-item">
        <label for="emoji-tag">작가명<span>●</span></label>
        <input
          id="emoji-tag"
          type="text"
          placeholder="[국문] 작가명을 한글 1~15자 내로 입력해 주세요."
        />
      </div>

      <div class="form-item">
        <label for="emoji-comment">이모티콘 설명<span>●</span></label>
        <textarea
          id="emoji-comment"
          cols="50"
          rows="5"
          placeholder="이모티콘 제작 컨셉 혹은 캐릭터에 대한 설명을 작성해 주세요."
        ></textarea>
        <!-- <div class="text-count"><span>0</span>/200자</div> -->
      </div>
      <div class="text-count"><span>0</span>/200자</div>
    </form>

    <div class="new-form">
      <strong class="form-title"
        >이모티콘 시안<em class="em-info" style="font-size: 20px"
          >(필수)</em
        ></strong
      >

      <div class="info-design">
        <span class="txt-guide" style="margin-left: -23px"
          >이미지 형식 :
          <em class="emph-guide first-emph">PNG(배경투명, 18종)</em></span
        >
        <span class="txt-guide"
          >이미지 개수 : <em class="emph-guide">총 18종 필수</em></span
        >
        <span class="txt-guide"
          >이미지 사이즈 : <em class="emph-guide">360X360(px)</em></span
        >
      </div>

      <div class="image-files">
        <div class="file-box" v-for="(image, index) in imagesInfo" :key="index">
          <div class="file-count">{{ image.index }}</div>
          <!-- <font-awesome-icon
            icon="fa-image"
            style="
              visibility: visible;
              height: 35px;
              position: relative;
              color: gainsboro;
              left: 48px;
              top: 10px;
            "
          /> -->
          <img class="img-emoji" :src="image.imageInfo" />
          <label class="btn-file"
            >찾아보기
            <input
              type="file"
              :name="image.index"
              accept="image/*"
              @change="uploadImage"
          /></label>
        </div>
      </div>
    </div>

    <button class="btn-submit">제출하기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'NewEmotionView',
  setup() {
    const imagesInfo = reactive<{ index: number; imageInfo: string }[]>([]);

    // 이미지 업로드
    const uploadImage = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;

      if (target.files) {
        const name = target.name;
        const image = target.files[0];
        const reader = new FileReader();

        const size = image.size;

        if (1024 * 150 < size) {
          alert('해당 파일은 150kb 용량을 초과하였습니다.');
        } else {
          reader.readAsDataURL(image);
          reader.onload = (e) => {
            if (e.target) {
              const imageInfo = imagesInfo.find((image) => {
                return image.index.toString() == name;
              });

              if (imageInfo) imageInfo.imageInfo = e.target.result as string;
            }
          };
        }
      }
    };

    onMounted(() => {
      // 배열에 이미지객체 18개를 넣는다.
      for (let i = 0; i < 18; i++) {
        imagesInfo.push({
          index: i + 1,
          imageInfo: '',
        });
      }
    });

    return { imagesInfo, uploadImage };
  },
});
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #e6e6e6;
  margin: 10px;

  padding: 15px 50px;

  background-color: white;
}

.new-title {
  text-align: left;
  border-bottom: 1px solid black;
}

.new-title > span {
  float: right;
}

.em-info {
  color: #ee565a;

  font-size: 13px;

  font-style: normal;
  font-weight: normal;
}

.new-form {
  margin: 60px 0;

  text-align: left;
}

.form-title {
  font-size: 23px;

  font-weight: normal;
}

// form item
.form-item {
  margin: 20px 0;

  display: flex;

  align-items: center;
}
.form-item > label {
  font-size: 13px;
  font-weight: bold;

  margin-right: 60px;
  display: inline-block;

  width: 100px;
}
.form-item > label > span {
  color: red;

  padding-inline-start: 5px;
}

.form-item > input,
select,
textarea {
  width: calc(100% - 200px);

  height: 40px;

  border: 1px solid #e4e4e4;
  background: #fcfcfc;

  color: #717274;

  padding-inline-start: 20px;
  line-height: 17px;
}

textarea {
  height: 80px;
  resize: none;

  padding-top: 10px;
}

.text-count {
  color: #666;
  font-family: 'ht_r';
  font-size: 11px;

  position: relative;
  bottom: 15px;
  float: right;

  padding-inline-end: 20px;
}

select {
  width: calc(100% - 176px);

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select:focus {
  background-image: linear-gradient(45deg, black 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, black 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: black;
  outline: 0;

  transition: 0.2s;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

.txt-guide {
  float: left;
  position: relative;

  color: #717274;
  letter-spacing: -0.025em;

  font-size: 13px;
}

.txt-guide {
  padding: 0 23px;
}

.info-design {
  overflow: hidden;

  margin: 32px 0;
}

.emph-guide {
  color: #2d2e32;
}

.emph-guide:not(.first-emph)::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  width: 1px;
  height: 12px;
  background-color: #e4e4e4;
}

em {
  font-style: normal;
  font-weight: normal;
}

// 이미지 파일들
input[type='file'] {
  display: none;
  cursor: pointer;

  opacity: 0;

  filter: alpha(opacity=0);

  background: white;
}

.image-files {
  display: grid;

  grid-template-columns: repeat(6, 1fr);
}

.file-box {
  width: 130px;
  height: 130px;

  border-bottom: 1px solid #e4e4e4;

  background-color: rgba(#edeff4, 0.1);

  position: relative;

  // visibility: hidden;
}

.file-box:hover {
  background-color: rgba(#717274, 0.5);

  visibility: visible;
}

.img-emoji {
  width: 100%;
  height: 50px;
}

.file-count {
  display: block;
  font-size: 14px;
  text-indent: 15px;
  line-height: 35px;
  font-weight: normal;

  color: #000;

  visibility: visible;
}

.btn-file {
  background-color: #fcd207;

  border: 1px solid #ffbb1b;

  font-size: 12px;

  padding: 5px 20px;

  cursor: pointer;

  position: absolute;
  top: 100%;
  left: 50%;
  margin: -40px 0 0 -45px;
}

.btn-submit {
  background-color: #fcd207;

  border: 1px solid #ffbb1b;

  font-size: 18px;

  padding: 20px 80px;

  cursor: pointer;
}
</style>
