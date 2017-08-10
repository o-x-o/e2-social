<template>
    <div class="box">
        <div class="piclist">
            <div class="iBox" v-for="(item,idx) in alertBody.list">
                <img :src="'http://'+item.link" @click="selPic(item.id,item.link,$event)">
            </div>
        </div>
        <div class="more" @click="tplNextPage">加载更多</div>
    </div>
</template>
<script>
    import './picList.scss';

    export default{
        props: {
            alertBody: {
                type: Object,
                default: ''
            }
        },
        components: {
        },
        data(){
            return {}
        },
        methods: {
            selPic(id, link, ev){
                this.$emit('close');
                this.$emit('upImg', id, 'http://' + link);
            },
            tplNextPage(){
            	this.$emit('tplNextPage');
            }
        },
        mounted (){
        }

    }
</script>
