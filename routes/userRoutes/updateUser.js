const data = require('../../database')

module.exports = (req, res) => {
    const id = parseInt(req.url.split('/')[2])
    let body = '';

    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', async () => {
        const parsedBody = new URLSearchParams(body)
        const updateData = {}
        parsedBody.forEach((value, key) => {
            updateData[key] = key === 'age' ? parseInt(value) : value;
        })

        const updateUser = await data.updateUser(id, updateData)
        console.log('1', id,  updateUser)


        if(updateUser) {
            res.writeHead(200)
            res.end(JSON.stringify(updateUser))
        } else {
            res.writeHead(404)
            res.end(JSON.stringify({message: 'User not found'}))
        }
    })
}