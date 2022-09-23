
var ProfileToken = {
        headers: {
          Authorization: 'Basic ' + localStorage.getItem('token')
        }
    }

export default ProfileToken