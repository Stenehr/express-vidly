
function successResult(data) {
    return {
        success: true,
        data,
    };
}

function failureResult(error) {
    return {
        success: false,
        error
    }
}

module.exports = {
    successResult,
    failureResult
};