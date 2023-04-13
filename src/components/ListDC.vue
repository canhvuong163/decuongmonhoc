<template>
    <div>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" md="6" offset-sm="2" offset-md="3">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Danh sách đề cương</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="$refs.createDialog.open()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  :search="search"
                  :loading="loading"
                  :no-results-text="noResultsText"
                  :mobile-breakpoint="mobileBreakpoint"
                >
                <template #[`item.actions`]="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click = "inputdata()"
                  >
                    mdi-arrow-top-right
                  </v-icon>
                  <v-icon
                    small
                    class="mr-2"
                    @click.stop="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click.stop="deleteItem(item)">mdi-delete</v-icon>
                </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
      <create-dialog ref="createDialog" @create-item="createItem" />
      <edit-dialog
        ref="editDialog"
        :item="editedItem"
        @save-item="updateItem"
      />
    </div>
  </template>
  
  <script>
  import firebase from '@/plugins/firebase'
  import 'firebase/firestore'
  import 'firebase/database'
  import CreateDialog from '@/components/CreateDialog.vue'
  import EditDialog from '@/components/EditDialog.vue'
  
  
  export default {
    name: 'ListDC',
    components: {
      CreateDialog,
      EditDialog
    },
    data: () => ({
      headers: [
        {
          text: 'Tiêu đề',
          align: 'start',
          sortable: true,
          value: 'title'
        },
        { text: 'Mô tả', value: 'description', sortable: true },
        { text: 'Hành động', value: 'actions', sortable: false }
      ],
      items: [],
      loading: false,
      search: '',
      noResultsText: 'Không tìm thấy dữ liệu phù hợp',
      mobileBreakpoint: 600,
      editedItem: null
    }),
  
    created() {
      this.loadItems()
    },
  
    methods: {
      loadItems() {
        this.loading = true
        const userId = firebase.auth().currentUser.uid
        const firestore = firebase.firestore()
        const realtimeDb = firebase.database()
  
        // Load data from Firestore
        firestore
          .collection('users')
          .doc(userId)
          .collection('items')
          .orderBy('createdAt', 'desc')
          .onSnapshot(snapshot => {
            this.items = []
            snapshot.forEach(doc => {
              this.items.push({
                id: doc.id,
                ...doc.data()
              })
            })
            this.loading = false
            //console.log("err"+JSON.stringify(this.items))
          })
  
        // Load data from Realtime Database
        realtimeDb.ref(`users/${userId}/items`).on('value', snapshot => {
          const data = snapshot.val()
          if (data) {
            Object.keys(data).forEach(id => {
              const item = data[id]
              const existingIndex = this.items.findIndex(i => i.id === id)
              if (existingIndex !== -1) {
                this.items[existingIndex] = { id, ...item }
              } else {
                this.items.push({ id, ...item })
              }
            })
          }
        })
      },
  
      createItem(item) {
        const userId = firebase.auth().currentUser.uid
        const firestore = firebase.firestore()
        const realtimeDb = firebase.database()
        const createdAt = firebase.firestore.FieldValue.serverTimestamp()
  
        firestore
          .collection('users')
          .doc(userId)
          .collection('items')
          .add({
            ...item,
            createdAt
          })
          .then(docRef => {
            realtimeDb.ref(`users/${userId}/items/${docRef.id}`).set({
              ...item,
              //createdAt: createdAt.toMillis()
            })
            this.$refs.createDialog.close()
          })
      },
  
      editItem(item) {
        this.editedItem = item
        //console.log(this.editedItem)
        this.$refs.editDialog.open()
      },
  
      updateItem(item) {
        const userId = firebase.auth().currentUser.uid
        const firestore = firebase.firestore()
        const realtimeDb = firebase.database()
        console.log(item)
  
        firestore
          .collection('users')
          .doc(userId)
          .collection('items')
          .doc(item.id)
          .update(item)
          .then(() => {
            realtimeDb.ref(`users/${userId}/items/${item.id}`).update(item)
            this.$refs.editDialog.close()
          })
      },
  
      deleteItem(item) {
        const userId = firebase.auth().currentUser.uid
        const firestore = firebase.firestore()
        const realtimeDb = firebase.database()
        
        firestore
          .collection('users')
          .doc(userId)
          .collection('items')
          .doc(item.id)
          .delete()
          .then(() => {
            realtimeDb.ref(`users/${userId}/items/${item.id}`).remove()
          })
      },

      inputdata() {
        this.$router.push('/inputdata')
      }
    }
  }
  </script>
  