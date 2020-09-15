const TABLA = 'user'
const nanoid = require('nanoid');

module.exports = function (injectedStore){
	let store = injectedStore || require('../../../store/dummy')

	function list() {
		return store.list(TABLA)
	}

	function get(id) {
		return store.get(TABLA, id)
	}

  function upsert(body) {
    const user = {
    	name: body.name
  	}

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    return store.upsert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
  };
}