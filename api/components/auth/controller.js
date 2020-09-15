const TABLA = 'auth'
const nanoid = require('nanoid');
const bcrypt = require('bcrypt')
const auth = require('../../../auth')

module.exports = function (injectedStore){
	let store = injectedStore || require('../../../store/dummy')

  async function login(username, password){
    const data = await store.query(TABLA, { username })

    return bcrypt.compare(password, data.password)
      .then((value) => {
        if(value){
          return auth.sign(data)
        }else{
          throw new Error('Informacion Invalida')
        }
      })    
  }

  async function upsert(data){
    const authData = {
      id: data.id
    }

    if(data.username){
      authData.username = data.username
    }
    if(data.password){
      authData.password = await bcrypt.hash(data.password, 5)
    }

    return store.upsert(TABLA, authData)
  }

  return {
    upsert,
    login,
  };
}