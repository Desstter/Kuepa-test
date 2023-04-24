<template>
  <div class="h-screen flex flex-col mx-auto my-4 pt-10 ">
    <div class="fixed top-0 z-9999 w-full bg-gray-800 text-white py-3 px-4">
      <div class="flex justify-between items-center">
        <div class="text-lg font-bold">Kuepa Live clases</div>
        <div>
          <button class="text-white hover:text-gray-400" @click="logout()">Cerrar Sesion</button>
        </div>
      </div>
    </div>
    <div class="h-3/4 w-full flex flex-row-reverse ">
      <div class="w-1/4 h-full bg-gray-200 flex flex-col-reverse p-4 overflow-y-auto">
        <form @submit.prevent="handleSubmit" class="flex">
          <input v-model="newMessage" placeholder="Ingresa tu mensaje"
            class="mr-2 px-2 py-1 rounded-lg border border-gray-300 flex-grow focus:outline-none focus:border-blue-500">
          <button type="submit" class="bg-blue-500 text-white py-1 px-2 rounded-lg">Enviar</button>
        </form>
        <div v-for="(message, index) in messages" :key="index" class="d-flex p-3">
          <div class="card mb-3 shadow border-1">
            <div class="card-body">
              <small>{{ message.from }} <span v-if="message.admin"
                  class="bg-green-400 text-white px-1 rounded-lg ml-1">Docente</span> : {{ message.body }}</small>
            </div>
          </div>
        </div>
        <small class="text-center text-muted">... Mensajes guardados ...</small>
        <div v-for="(message, index) in storedMessages" :key="index" class="d-flex p-3"
          :class="message.from === username ? 'justify-content-end' : 'justify-content-start'">
          <div class="card mb-3 shadow border-1"
            :class="message.from === username ? 'bg-success bg-opacity-25' : 'bg-light'">
            <div class="card-body">
              <small class="text-muted">{{ message.from }} <span v-if="message.admin"
                  class="bg-green-400 text-white px-1 rounded-lg ml-1">Docente</span> : {{ message.message }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/4 h-full ">
        <iframe class="h-full w-full top-0 left-0" :src="videoUrl" frameborder="0" allow="autoplay"
          allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { reactive, toRefs, onMounted } from 'vue'
import axios from 'axios'


export default {
  beforeRouteEnter(to, from, next) {
    const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));
    isAuthenticated ? next() : next('/');
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$router.push('/')
    }
  },
  setup() {
    const state = reactive({
      username: JSON.parse(sessionStorage.getItem('isAuthenticated')).username,
      newMessage: '',
      videoUrl: 'https://www.youtube.com/embed/fOCqD04GIC0',
      messages: [],
      storedMessages: [],
      firstTime: false,
      isAdmin: JSON.parse(sessionStorage.getItem('isAuthenticated')).admin
    })

    const url = 'http://localhost:3001/api'

    const socket = io('http://localhost:3001')

    const receivedMessage = (message) => {
      console.log(message);
      console.log(state.messages);
      state.messages.unshift(message)
      console.log(state.messages);

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

      socket.emit('message', state.username, state.newMessage, state.isAdmin)

      const newMessage = {
        admin: state.isAdmin,
        body: state.newMessage,
        from: state.username
      }

      state.messages.unshift(newMessage)

      axios.post(`${url}/save`, {
        admin: state.isAdmin,
        from: state.username,
        message: state.newMessage
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