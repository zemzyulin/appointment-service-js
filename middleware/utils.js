export function removeToken(result) {
    var cleanResult = Object.assign({}, result._doc);
    delete cleanResult.reg_token;
    return cleanResult;
}