<template>
  <div class="h-screen flex flex-col mx-auto my-4">
    <div class="h-3/4 w-full flex flex-row-reverse">
      <div class="w-1/4 h-full bg-gray-200 flex flex-col-reverse p-4">
        <form @submit.prevent="handleSubmit" class="flex">
          <input v-model="newMessage" placeholder="Ingresa tu mensaje"
            class="mr-2 px-2 py-1 rounded-lg border border-gray-300 flex-grow focus:outline-none focus:border-blue-500">
          <button type="submit" class="bg-blue-500 text-white py-1 px-2 rounded-lg" >Enviar</button>
        </form>
        <div v-for="(message, index) in messages" :key="index" class="d-flex p-3" :class="message.from === this.username ? 'justify-content-end' : 'justify-content-start'">
            <div class="card mb-3 shadow border-1" :class="message.from === this.username ? 'bg-success bg-opacity-25' : 'bg-light'">
              <div class="card-body">
                <small>{{ message.from }}: {{ message.body }}</small>
              </div>
            </div>
        </div>
        <small class="text-center text-muted">... Mensajes guardados ...</small>
          <div v-for="(message, index) in storedMessages" :key="index" class="d-flex p-3" :class="message.from === username ? 'justify-content-end' : 'justify-content-start'">
            <div class="card mb-3 shadow border-1" :class="message.from === username ? 'bg-success bg-opacity-25' : 'bg-light'">
              <div class="card-body">
                <small class="text-muted">{{ message.from }}: {{ message.message }}</small>
              </div>
            </div>
          </div>
      </div>
      <div class="w-3/4 h-full relative">
        <iframe class="h-full w-full absolute top-0 left-0" :src="videoUrl" frameborder="0" allow="autoplay"
          allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { reactive, toRefs, onMounted } from 'vue'
import axios from 'axios'
const isauth = JSON.parse(sessionStorage.getItem('isAuthenticated'));


export default {
  beforeRouteEnter(to, from, next) {
    const isAuthenticated = JSON.stringify(sessionStorage.getItem('isAuthenticated'));
    isAuthenticated ? next() : next('/');
  },
  created(){

  },
  setup() {
    const state = reactive({
      username: isauth.username,
      newMessage: '',
      videoUrl: 'https://www.youtube.com/embed/fOCqD04GIC0',
      messages: [],
      storedMessages: [],
      firstTime: false
    })

    const url = 'http://localhost:3001/api'

    const socket = io('http://localhost:3001')

    const receivedMessage = (message) => {
      state.messages.unshift(message)
    }

    const loadStoredMessages = async () => {
      if (!state.firstTime) {
        try {
          const res = await axios.get(`${url}/messages`)
          state.storedMessages = res.data.messages
          state.firstTime = true
        } catch (err) {
          console.error(err)
        }
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()

        socket.emit('message', state.newMessage, state.username)

        const newMessage = {
          body: state.newMessage,
          from: state.username
        }

        state.messages.unshift(newMessage)

        axios.post(`${url}/save`, {
          message: state.newMessage,
          from: state.username
        }).catch((err) => {
          console.error(err)
        })
        state.newMessage = ''

    }

    onMounted(() => {
      socket.on('message', receivedMessage)
      loadStoredMessages()
    })

    return {
      ...toRefs(state),
      handleSubmit,
    }
  }
}
</script>