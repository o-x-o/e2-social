<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,idx) in swiperData.imgs" @touchend="goDetail(item.targetId,$event)"><img :src="item.picUrl"></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
    import './../../../static/css/swiper.min.css';
    import './swiper.scss';
    import './../../../static/js/swiper.min';
    export default{
        props:{
            swiperData:{
                type:Object,
                default:''
            }
        },
        mounted() {
            new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true
            });
        },
        methods:{
            goDetail(id,ev){
                window.location.href='details.html?id='+id;
            }
        }
    }
</script>