require('../bin/www')
const request = require('request')
describe('App Initialize',()=>{
    it('"/" should return 200 status',(done)=>{
        const requestOptions = {
            method: 'GET',
            url: 'http://localhost:3001'
        }
        request(requestOptions,(err,response,body)=>{
            expect(err).toBeNull()
            expect(response.statusCode).toBe(200)
            done()
        })
    })
})