<template>
    <div class="status-bar"></div>
</template>
<script> 
export default {
     
}
</script>
<style scoped>
.status-bar {
  width: 750px;
  height: 60px;
  background-color: #fafafa; 
  //background-color: red; 
  position: absolute;
  top: 0; 
  left: 0;
  right: 0; 
  margin-top: 0px;
  padding-top: 0px;
  
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  z-index: 101; 
  opacity: 1;
}
</style>