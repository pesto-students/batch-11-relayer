import request from 'request';

const makeRequest = async (options) => {
   return new Promise((resolve,reject)=>{
       options.headers = {"User-Agent": "Relayer/1.0.0"}
       request(options, (err, response, responseBody) => {
           if (err) return reject(err);
           if (response.statusCode === 200) {
               try {
                   resolve(JSON.parse(responseBody))
               } catch (e) {
                   resolve(responseBody)
               }
           } else {
               reject(new Error(JSON.stringify(responseBody)))
           }
       });
   })
};

export default makeRequest;
