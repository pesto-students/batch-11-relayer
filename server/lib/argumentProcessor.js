const argvParser = require('yargs-parser')
const convertArgsStringToObject = (argString) => {
    return argvParser(argString);
}
const validateArgs = (argString,required=[]) => {
    const argumentObject = convertArgsStringToObject(argString)
    let isAllRequiredArgsPresent = true
    required.forEach((key)=>{
        if(!Object.prototype.hasOwnProperty.call(argumentObject,key)) {
            isAllRequiredArgsPresent = false
        }
    })
    return isAllRequiredArgsPresent ? argumentObject : false;
}
export {
    convertArgsStringToObject,
    validateArgs
}
