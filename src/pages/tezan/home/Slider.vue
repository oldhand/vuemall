<template>
    <slider class="slider" auto-play="true" interval="5000">
        <div class="frame" v-for="img in imageList">
            <image class="image" resize="cover" :src="img.src" placeholder="/images/placeholder.jpg"></image>
        </div>
        <indicator class="indicator"></indicator>
    </slider>
</template>
<script>
export default {
    props: ["imageList"]
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

.image {
    width: 750px;
    height: 391px;
}

.slider {
    width: 750px;
    height: 391px;
}

.frame {
    width: 750px;
    height: 391px;
    position: relative;
}

.indicator {
    width: 750px;
    height: 40px;
    item-color: white;
    item-selected-color: #b4282d;
    item-size: 12px;
    position: absolute;
    bottom: 10px;
    right: 0px;
}
</style>