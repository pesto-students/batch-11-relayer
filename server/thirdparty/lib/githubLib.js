import makeRequest from "../../lib/requestLib";
exports.getAllRepo = async (username,options={}) => {
    const requestOptions = {
        url: `https://api.github.com/users/${username}/repos`,
        method:'GET'
    }
    const response = await makeRequest(requestOptions)
    if(response.length === 0) {
        return 'No Repo Found'
    }
    let responseString = ``
    response.forEach((repo,index)=>{
        responseString += `${index+1}. ${repo.name} (${repo.html_url})\n`
    })
    return  responseString;
}
