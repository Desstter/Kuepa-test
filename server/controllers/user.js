import bcrypt from 'bcrypt';
import User from '../models/user.js';

var controllerUser = {


login: async (req, res) => {
  var { username, password } = req.body;

  try {

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    if (password !== user.password) {
      return res.status(401).send('Incorrect Password');
    }

    return res.status(200).send({
        message: 'all good',
        userData: user.toObject()
    })


  } catch (error) {
    console.log(error);
    res.status(500);
  }
},

createUser: async (req, res) => {
    var { fullname, username, password, admin } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
  
      // Crear el nuevo usuario
      const newUser = new User({ fullname, username, password, admin });
      await newUser.save();
  
      res.status(201).json({ message: 'Usuario creado exitosamente' });
      console.log(fullname, username, password,admin);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  }
}

export default controllerUser
