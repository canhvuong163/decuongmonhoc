<template>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="text-center">Đăng ký tài khoản</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field v-model="email" label="Email"></v-text-field>
                <v-text-field v-model="password" label="Mật khẩu" type="password"></v-text-field>
                <v-text-field v-model="confirmPassword" label="Xác nhận mật khẩu" type="password"></v-text-field>
                <v-btn type="submit" color="green" >Đăng ký</v-btn>
              </v-form>
              <p class="text-center">Bạn đã có tài khoản? <router-link to="/login">Đăng nhập!</router-link></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue'
  import firebase from '@/plugins/firebase'
  
  export default {
    name: 'RegisterUser',
    setup() {
      const email = ref('')
      const password = ref('')
      const confirmPassword = ref('')
  
      const register = async () => {
        try {
          if (password.value !== confirmPassword.value) {
            throw new Error('Mật khẩu xác nhận không khớp')
          }
          await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
          alert('Đăng ký tài khoản thành công')
        } catch (error) {
          alert(`Đăng ký tài khoản thất bại: ${error.message}`)
        }
      }
  
      return {
        email,
        password,
        confirmPassword,
        register
      }
    }
  }
  </script>
  