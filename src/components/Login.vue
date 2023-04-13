<template>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="text-center">Đăng nhập</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                <v-text-field v-model="password" label="Mật khẩu" type="password" required></v-text-field>
                <v-btn type="submit" color="green" class="mr-4" align="center" justify="center">Đăng nhập</v-btn>    
              </v-form>
  
              <p class="text-center">Bạn chưa có tài khoản? <router-link to="/register">Đăng ký!</router-link></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import firebase from '@/plugins/firebase'
  
  export default {
    name: 'LoginUser',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {
        try {
          await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          this.$router.push('/listdc')
        } catch (error) {
          console.log(error)
          switch (error.code) {
            case 'auth/invalid-email':
              alert('Email không hợp lệ')
              break
            case 'auth/user-disabled':
              alert('Tài khoản đã bị vô hiệu hóa')
              break
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              alert('Email hoặc mật khẩu không đúng')
              break
            default:
              alert('Đã xảy ra lỗi, vui lòng thử lại sau')
          }
        }
      }
    }
  }
  </script>
  
  <style lang="css">
  
  </style>