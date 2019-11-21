<template>
    <div class="top-bar" ref="topbar" @click="topbarclick" :style="{top:top+'px'}">
        <text class="text">{{title}}</text>
    </div>
</template>

<script type="text/babel">
    const animation = weex.requireModule('animation')
    export default { 
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '保存'
            },
            top: {
                type: Number,
                default: 180
            },
		},
        data () {
            return {}
        },
        methods: {
            topbarclick () { 
			    this.hidetopbar();
                this.$emit('topbarclicked');
            },
            showtopbar () {
                animation.transition(this.$refs.topbar, {
                    styles: {
                        transform: 'translateX(0px)',
                    },
                    duration: 300, //ms
                    timingFunction: 'ease-out',
                    delay: 0 //ms
                })
            },
            hidetopbar () {
                animation.transition(this.$refs.topbar, {
                    styles: {
                        transform: 'translateX(180px)',
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
                    this.showtopbar()
                } else {
                    this.hidetopbar()
                }
            }
        }
    }
</script>

<style scoped>
.top-bar {
    position: fixed;
    right: 0px;
    top: 20px;
    width: 180px;
    height: 80px;
    background-color: #b4272d;
    transform: translateX(0px);
    border-top-left-radius: 36px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 36px;
	opacity:0.9;
    border-width: 1px;
    border-style: solid;
    border-color: #dddddd;
}
.text {
    line-height: 80px;
    color: #ffffff;
    font-size: 30px;
    text-align: center;
	font-weight: 700;
}
</style>
