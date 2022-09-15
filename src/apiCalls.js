// Your fetch requests will live here!
const fetchData = (url) => {
    return fetch(url)
    .then(data => data.json())
}

const fetchAll = () => {
    return Promise.all([fetchData('http://localhost:3001/api/v1/users'), fetchData('http://localhost:3001/api/v1/sleep'), fetchData('http://localhost:3001/api/v1/hydration'), fetchData('http://localhost:3001/api/v1/activity')])
}

export { fetchAll }

console.log('I will be a fetch request!')

