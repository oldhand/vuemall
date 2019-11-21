<template>
    <div class="go-top" ref="goTop" @click="goTop">
        <text class="text">回顶部</text>
    </div>
</template>

<script type="text/babel">
    const animation = weex.requireModule('animation')
    export default {
        props: ['show'],
        data () {
            return {}
        },
        methods: {
            goTop () {
                this.$emit('goTop')
            },
            showGoTop () {
                animation.transition(this.$refs.goTop, {
                    styles: {
                        transform: 'translateX(0)',
                    },
                    duration: 300, //ms
                    timingFunction: 'ease-out',
                    delay: 0 //ms
                })
            },
            hideGoTop () {
                animation.transition(this.$refs.goTop, {
                    styles: {
                        transform: 'translateX(140px)',
                    },
                    duration: 300, //ms
                    timingFunction: 'ease-out',
                    delay: 0 //ms
                })
            }
        },
        watch: {
            show: function (val, oldVal) {
                if (val) {
                    this.showGoTop()
                } else {
                    this.hideGoTop()
                }
            }
        }
    }
</script>

<style scoped>
.go-top {
    position: fixed;
    right: 0;
    bottom: 220px;
    width: 140px;
    height: 70px;
    background-color: #586c94;
    transform: translateX(140px);
    border-top-left-radius: 36px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 36px;
	opacity:0.7;
}
.text {
    line-height: 70px;
    color: #ffffff;
    font-size: 24px;
    text-align: center;
}
</style>
