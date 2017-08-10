<template>
    <div class="card">
        <div class="row">
            <date-picker :date="startTime" :option="option" :limit="limit" ref="picker" @change="timerChange" @setPicker="setPicker"></date-picker>
        </div>

    </div>
</template>
<script>
    import myDatepicker from 'vue-datepicker';
    export default {
        data () {
            return {
                // for Vue 2.0
                startTime: {
                    time: ''
                },
                endtime: {
                    time: ''
                },
                option: {
                    type: 'day',
                    week: ['日', '一', '二', '三', '四', '五', '六'],
                    month: ['-月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: 'YYYY-MM-DD',
                    placeholder: '输入日期',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '6px',
                        'line-height': '22px',
                        'font-size': '16px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#333'
                    },
                    color: {
                        header: '#333',
                        headerText: '#f00'
                    },
                    buttons: {
                        ok: '确定',
                        cancel: '取消'
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                },
                timeoption: {
                    type: 'min',
                    week: ['日', '一', '二', '三', '四', '五', '六'],
                    month: ['-月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: 'YYYY-MM-DD HH:mm'
                },
                multiOption: {
                    type: 'multi-day',
                    week: ['日', '一', '二', '三', '四', '五', '六'],
                    month: ['-月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: "YYYY-MM-DD HH:mm"
                },
                limit: []
            }
        },
        components: {
            'date-picker': myDatepicker
        },
        methods:{
            picker(ev){
                this.$refs.picker.showCheck(ev);
            },
            cloasPick(ev){
                this.$refs.picker.cloasPick(ev);
            },
            timerChange(data){
                this.$emit('getTime',data);
            },
            setPicker(){
                this.$emit('setPicker');
            }
        }
    }
</script>