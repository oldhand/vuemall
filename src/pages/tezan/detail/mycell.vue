<template>
    <div :class="['bui-cell', hasTopBorder?'cell-top-border':'', hasBottomBorder?'cell-bottom-border':'', hasMargin?'cell-margin':'', desc?'has-desc':'']"
            :style="Object.assign({}, cellStyle)"
            @click="_cellClick">

        <slot name="label">
            <div v-if="label">
                <text class="cell-label-text">{{label}}</text>
            </div>
        </slot>
        <div class="cell-title">
            <slot name="title">
                <text class="cell-content" v-if="title">{{title}}</text>
                <text class="cell-desc-text" v-if="desc">{{desc}}</text>
            </slot>
        </div>
        <slot name="action"></slot>
        <slot></slot>
    </div>
</template>

<style scoped>
    .bui-cell {
	    width:750px;
        height: 100px;
        position: relative;
        flex-direction: row;
        align-items: center;
        padding-left: 24px;
        padding-right: 24px;
        background-color: #ffffff;
    }

    .cell-margin {
        margin-bottom: 24px;
    }

    .cell-title {
        flex: 1;
    }

    .has-desc {
        padding-bottom: 18px;
        padding-top: 18px;
    }

    .cell-top-border {
        border-top-color: #eeeeee;
        border-top-width: 1px;
    }

    .cell-bottom-border {
        border-bottom-color: #eeeeee;
        border-bottom-width: 1px;
    }

    .cell-label-text {
        font-size: 30px;
        color: #666666;
        width: 188px;
        margin-right: 10px;
    }

    .cell-content {
        color: #333333;
        font-size: 30px;
        line-height: 40px;
		lines: 1;
	    overflow: hidden; 
	    
	    text-overflow: ellipsis;
    }

    .cell-desc-text {
        color: #999999;
        font-size: 24px;
        line-height: 30px;
        margin-top: 4px;
		lines: 1;
	    overflow: hidden; 
	    
	    text-overflow: ellipsis;
    }
</style>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            desc: {
                type: String,
                default: ''
            },
            hasTopBorder: {
                type: Boolean,
                default: false
            },
            hasMargin: {
                type: Boolean,
                default: false
            },
            hasBottomBorder: {
                type: Boolean,
                default: true
            },
            cellStyle: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        methods: {
            _cellClick (e) {
                this.$emit('click', {e});
                this.$emit('cellclick', {e});
            }
        }
    };
</script>