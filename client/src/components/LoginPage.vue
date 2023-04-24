<script >
export default {
  beforeRouteEnter(to, from, next) {
    const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));
    isAuthenticated ? next('/dashboard') : next();
  },
  data() {
    return {
      isRightPanelActive: false,
      username: '',
      password: '',
      newUsername: '',
      newFullName: '',
      newPassword: ''


    };
  },
  methods: {
    toggleRightPanel(isActive) {
      this.isRightPanelActive = isActive;
    },
    async newUser(){
      try {
        const response = await fetch('http://localhost:3001/api/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullname: this.newFullName,
            username: this.newUsername,
            password: this.newPassword
          })
        });
        if (response.status !== 200) {
          throw new Error('Error de red');
        }
        else {alert('Usuario Creado')}
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        if (response.status !== 200) {
          throw new Error('Error de red');
        }
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem('isAuthenticated', JSON.stringify(data.userData));
        this.$router.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script> 

<template>
  <div class="flex bg-gray-100 justify-center items-center flex-col font-poppins overflow-hidden h-screen">
    <div :class="{ 'container': true, 'right-panel-active': isRightPanelActive }">

      <div class="form-container register-container">
    <div class="bg-white flex flex-col items-center justify-center h-full text-center p-0 sm:p-10">
      <img src="https://lms.kuepa.com/assets/f2022b0b87d4feb2d6945e5fd4356dd7.png" alt="" srcset="">
      <input type="text" placeholder="Nombre completo" v-model="newFullName">
      <input type="text" placeholder="Nombre de usuario" v-model="newUsername">
      <input type="password" placeholder="Contraseña" v-model="newPassword">
      <button @click="newUser()">Registrarme</button>
    </div>
  </div>

  <div class="form-container login-container">
    <div class="bg-white flex flex-col items-center justify-center h-full text-center p-0 sm:p-10">
      <h2 class="font-bold tracking-tight mb-0 pb-4">Iniciar Sesión</h2>
      <input type="text" placeholder="Nombre de usuario" v-model="username">
      <input type="password" placeholder="Contraseña" v-model="password">
      <div class="content">
        <div class="checkbox">
          <input type="checkbox" name="checkbox" id="checkbox">
          <label>Recuérdame</label>
        </div>
        <div class="pass-link">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
      <button @click="login()">Ingresar</button>
    </div>
  </div>

  <div class="overlay-container">
    <div class="overlay">
      <div class="overlay-panel overlay-left">
        <h1 class="title">Hola <br> Estudiantes</h1>
        <br>
        <p>Si ya tienes una cuenta, ingresa y sigue aprendiendo</p>
        <br>
        <button class="ghost" id="login" @click="toggleRightPanel(false)">Ingresar
          <i class="lni lni-arrow-left login"></i>
        </button>
          </div>
          <div class="overlay-panel overlay-right">
            <img src="https://lms.kuepa.com/assets/f2022b0b87d4feb2d6945e5fd4356dd7.png" alt="" srcset="">
            <br>
            <p style="color: #e84c02" class="text-bold text-xl">Si no tienes una cuenta aun, registrate y comienza a
              aprender</p>
            <br>
            <button class="ghost" id="register" @click="toggleRightPanel(true)">Registrarme
              <i class="lni lni-arrow-right register"></i>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  display: flex;
  background-color: #f6f5f7;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  height: 100vh;
}

h1 {
  font-weight: 700;
  letter-spacing: -1.5px;
  margin: 0;
  margin-bottom: 15px;
}

h1.title {
  font-size: 45px;
  line-height: 45px;
  margin: 0;
  text-shadow: 0 0 10px rgba(16, 64, 74, 0.5);
}



span {
  font-size: 14px;
  margin-top: 25px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: 0.3s ease-in-out;
}

a:hover {
  color: #4bb6b7;
}

.content {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-around;
}

.content .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content input {
  accent-color: #333;
  width: 12px;
  height: 12px;
}

.content label {
  font-size: 14px;
  user-select: none;
  padding-left: 5px;
}

button {
  position: relative;
  border-radius: 20px;
  border: 1px solid black;
  background-color: #e84c02;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  margin: 10px;
  padding: 12px 80px;
  letter-spacing: 1px;
  text-transform: capitalize;
  transition: 0.3s ease-in-out;
}

button:hover {
  letter-spacing: 3px;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: #e84c02;
  border: 2px solid #fff;
  color: #fff;
}

button.ghost i {
  position: absolute;
  opacity: 0;
  transition: 0.3s ease-in-out;
}

button.ghost i.register {
  right: 70px;
}

button.ghost i.login {
  left: 70px;
}

button.ghost:hover i.register {
  right: 40px;
  opacity: 1;
}

button.ghost:hover i.login {
  left: 40px;
  opacity: 1;
}

form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border-radius: 10px;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 500px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.login-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .login-container {
  transform: translateX(100%);
}

.register-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .register-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translate(-100%);
}

.overlay {
  background-image: url('https://lms.kuepa.com/assets/0fdbbfd6822dbc01acad1f3395b3d2a5.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top,
      rgba(46, 94, 109, 0.4) 40%,
      rgba(46, 94, 109, 0));
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>
