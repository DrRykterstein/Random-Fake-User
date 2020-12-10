class Random {
  constructor() {
    this.userContainer = document.querySelector('.user--container')
    this.nextUser = document.getElementById('next')
    this.prevUser = document.getElementById('previous')
    this.pageNumber = 1
    this.events()
  }

  events() {
    this.nextUser.addEventListener('click', () => this.fetchNewUser())
    this.prevUser.addEventListener('click', () => {
      if (this.pageNumber > 2) {
        this.pageNumber -= 2
        this.fetchNewUser()
      }
    })
  }

  // generates a new user based on the page number
  async fetchNewUser() {
    try {
      const response = await axios.get(`https://randomuser.me/api?page=${this.pageNumber}&seed=1`)
      const data = response.data.results
      const location = data[0].location

      // insert relevant data into user container
      this.userContainer.innerHTML = `<h2 class="user-name">${Object.keys(data[0].name)
        .map(key => data[0].name[key]).join(' ')}</h2>
        <img class="user-image" src="${data[0].picture.large}">
        <h3 style="text-decoration: underline;">Address</h3>
        <ul class="address-list">  
          ${this.filterLocation(data).map(key => {
            let newKey = key[0].toUpperCase() + key.slice(1) // capitalize first letter of object property         
            if (typeof location[key] === 'object') {
              return `<li>${newKey + ': ' + Object.keys(location[key]).map(nestedKey => {
                return location[key][nestedKey]}).join(', ')}</li>`
            } else {
              return `<li>${newKey + ': ' + location[key]}</li>`
            }}).join('')}
        </ul>`  

      this.userContainer.style.display = 'block' // display user container
      this.pageNumber += 1 // increment page number
    } catch(err) {
      alert("Failed to retrieve user data. Please try again.")
      console.log("Failed to execute GET request", err)
    }
  }

  // filter location object within data
  filterLocation(data) {
    let locationArr = Object.keys(data[0].location)
    locationArr = locationArr.filter(key => key !== 'timezone' && key !== 'coordinates')
    return locationArr
  }
}

// instantiate our class within an object
const random = new Random()