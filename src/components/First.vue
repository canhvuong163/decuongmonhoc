<template>
    <v-app>
        <div class="container" cols="12" sm="8" md="6">
            <div class="content">
                <img src="logo.png" height="150">
                <h1>ĐỀ CƯƠNG MÔN HỌC</h1>
                <p>Công cụ hỗ trợ cho giảng dạy và học tập, giúp sinh viên hiểu rõ hơn <br/> Về nội dung môn học và định hướng cho quá trình học tập của họ.</p>
                <v-btn type="submit" color="green" class="mr-4" align="center" justify="center" @click=login()>Đăng nhập</v-btn>
                <v-btn type="submit" color="green" class="mr-4" align="center" justify="center" @click=register()>Đăng ký</v-btn>
            </div>
        </div>
    </v-app>
</template>

<script>
export default {
    name: 'CompStart',

    components: {
    },

    methods: {
        login() {
            this.$router.push('/login')
        },
        register() {
            this.$router.push('/register')
        }
    }
};
</script>

<style lang="css">
.container {
    height: 100%;
    width: 100%;
    color: white;
    background-color: #004aad;
}

.content {
    position: relative;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: thin solid rgba(84, 84, 87, 0.25);
    text-align: center;
    margin-top: 150px;
    background-color: rgba(0, 183, 255, 0.377);
}
</style>