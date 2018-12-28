<template>
    <div class="box">
        <div class="title">亲爱的盆友们：</div>
        <div class="text">
            为了能让您访问更快更稳定，同时为您提供更高品质的服务，源码库正在维护系统。因此目前网站的部分功能不能使用，请稍后再回来。给您造成了不便，请谅解。
        </div>
    </div>

</template>

<script>
export default {
  name: "noData",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
body {
  background: #f9fafd;
  color: #818181;
}
.box {
  width: 100%;
  height: 400px;
  background: url("../../static/images/maintenance.png") no-repeat 0 0/100% 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  line-height: 24px;
}
.box .title {
    margin-top: 120px;
  margin-bottom: 11px;
  margin-left: 160px;
}
.box .text {
  padding-left: 180px;
  line-height: 1.2;
}
</style>