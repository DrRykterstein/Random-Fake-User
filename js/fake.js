class Fake {
  constructor() {
    this.form = document.getElementById('form')
    this.submit = document.getElementById('submit')
    this.name = document.getElementById('name')
    this.id = document.getElementById('id')
    this.BASEURL = 'https://jsonplaceholder.typicode.com'
    // initialise new user object 
    this.user = {
      name : this.name.value,
      id : this.id.value,
      thumbnail : '' // thumbnail value is set upon creating a new user
    }
    this.getData()
    this.events()
  }

  events() {
    this.submit.addEventListener('click', e => {
      e.preventDefault() // prevents page refresh
      this.createUser()
    })
    this.form.addEventListener('click', e => this.deleteClickHandler(e))
  }

  // calls delete method if a delete button is clicked on
  deleteClickHandler(e) {
    if (e.target.classList.contains("delete")) {
      this.deleteUser(e)
    }
  }

  // finds nearest user container element when delete button is clicked
  findNearestContainer(el) {
    let thisUser = el
    while (!thisUser.classList.contains("user-container")) {
      thisUser = thisUser.parentElement
    }
    return thisUser
  }

  // retrieve data with GET request and output as new user example
  async getData() { 
    try {
      const postsResponse = await axios.get(`${this.BASEURL}/posts`)
      const photosResponse = await axios.get(`${this.BASEURL}/photos`)

      // change title to a discernable name
      postsResponse.data[0].title = 'John Johnson'

      // insert example user
      this.form.insertAdjacentHTML('beforeend', `
      <div class="user-container">
        <div class="user separator></div>
        <span class="user name">Name: ${postsResponse.data[0].title}</span>
        <span class="user id">ID: ${postsResponse.data[0].id}</span>
        <img class="user thumbnail" src="${photosResponse.data[0].thumbnailUrl}")>
        <div class="btn-container">
          <button class="btn delete" type="button">Delete</button>
        </div>
      </div>
    `)
    // document.querySelector('.delete').addEventListener('click', () => this.deleteUser())
    } catch(err) {
      console.log(err, err.response)
    }
  }

  // create new message with POST request
  async createUser() {
    try {
      // initialise thumbnail value within user object
      this.user.thumbnail = await this.getThumbnail(Promise) // must await for promise to resolve

      // execute POST request and create new user object JSON data
      const response = await axios.post(`${this.BASEURL}/posts`, this.user)

      // post new object data to API
      this.form.insertAdjacentHTML('beforeend', `
        <div class="user-container">
          <div class="user separator></div>
          <span class="user name">Name: ${this.user.name}</span>
          <span class="user id">ID: ${this.user.id}</span>
          <img class="user thumbnail" src="${this.user.thumbnail}")>
          <div class="btn-container">
            <button class="btn delete" type="button">Delete</button>
          </div>
        </div>  
      `)
    } catch(err) {
      console.log("POST request failed.", err)
    }
  }

  async deleteUser(e) {
    try {  
      const thisUser = this.findNearestContainer(e.target)
      thisUser.remove() // remove current user container

      const response = await axios.delete(`${this.BASEURL}/posts/${this.user.id}`)
    } catch(err) {
      console.log("DELETE request failed.", err)
    }
  }

  // get thumbnail for current user id
  async getThumbnail() {
    try {
      const response = await axios.get(`${this.BASEURL}/photos`)
      let thumbnail

      // iterate over array of objects
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].id == this.id.value) {
          // assign thumbnail for corresponding ID
          return thumbnail = response.data[i].thumbnailUrl
        }
      }
    } catch(err) {
      console.log("ID not found", err)
    }
  }
}

// instantiate our class within an object
const fake = new Fake()