<template>
    <div class="flow-box">
        <div class="flow" v-for="(item, index) in newItems" @click="_click(index)">
            <div class="flow-header flow-list">
                <div class="flow-line" :style="Object.assign({'top': (index==0 ? '20px': '0px'),'bottom': (index == newItems.length-1 ? '20px': '0px')}, item.lineStyle)"></div>
                <div class="flow-header-point" :class="[item.highlight ? 'highlight-point':'']" :style="item.pointStyle"></div>
                <text class="flow-text flow-header-title" :class="[item.highlight ? 'text-highlight-title':'']" :style="item.titleStyle">{{item.title}}</text>
            </div>
            <div class="flow-main flow-list">
                <div class="flow-line" :style="Object.assign({'width': (index == newItems.length-1 ? '0px':'2px')}, item.lineStyle)"></div>
                <div class="flow-text flow-main-desc">
                    <text class="desc-text">{{item.desc}}</text>
                    <text class="desc-date">{{item.date}}</text>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    module.exports = {
        props: {
            //数据
            items: {
                type: Array
            },
            //自定义
            customStyles: {
                type: Object,
                default: () => ({})
            }
        },
        watch: {

        },
        computed: {
            newItems () {
                return this.initItems(this.items);
            }

        },
        methods: {
            _click(index){
                this.$emit('click', index);
            },
            initItems(items){
                    const {
                            lineColor,
                            pointInnerColor,
                            pointBorderColor,
                            highlightTitleColor,
                            highlightPointInnerColor,
                            highlightPointBorderColor
                    } = this.customStyles;
                    const len = items.length;
                    const pre = Date.now();

                    return items.map((item, index) => {
                        item.key = `${pre}_${index}`;
                        item.pointStyle = {};
                        item.lineStyle = {};
                        item.titleStyle = {};

                        if (lineColor) item.lineStyle.backgroundColor = lineColor;
                        if (pointInnerColor) item.pointStyle.backgroundColor = pointInnerColor;
                        if (pointBorderColor) item.pointStyle.borderColor = pointBorderColor;

                        if (item.highlight) {
                            if (highlightTitleColor) item.titleStyle.color = highlightTitleColor;
                            if (highlightPointInnerColor) item.pointStyle.backgroundColor = highlightPointInnerColor;
                            if (highlightPointBorderColor) item.pointStyle.borderColor = highlightPointBorderColor;
                        }
                        return item;
                    });

            }
        }
    }
</script>

<style scoped> 
 .flow-box{
   padding-top: 28px;
   padding-bottom: 24px;
   background-color: #ffffff;
 }
 .flow-list{
   flex-direction: row;
   padding-left: 70px;
   padding-right: 70px;
 }
 .flow-header{
   height: 40px;
 }
 .flow-main{
   padding-top: 9px;
   padding-bottom: 42px;
 }
 .flow-line{
   position: absolute;
   top: 0;
   bottom: 0;
   left: 38px;
   width: 2px;
   background-color: #f0f0f0;
 }

 .flow-header-point{
   position: absolute;
   top: 13px;
   left: 32px;
   width: 14px;
   height: 14px;
   background-color: #c4c4c4;
   border-style: solid;
   border-width: 2px;
   border-color: #cfcfcf;
   border-radius: 100px;
 }
 .flow-header-title{
   font-size: 32px;
   color: #3d3d3d;
 }
 .desc-text, .desc-date {
    font-size: 30px;
   color: #a5a5a5;
 }
 .desc-text{ 
   margin-bottom: 12px;
   width:660px;
 }

 .highlight-point {
   top: 7px;
   left: 26px;
   width: 26px;
   height: 26px;
   background-color: #3399ff;
   border-style: solid;
   border-width: 6px;
   border-color: #b9dcff;
 }
 .text-highlight-title {
   color: #3399ff;
 }
</style>
  