//Source https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple

var Sdk = window.Sdk || {};
var startTime = null;

function executeMultipleRequestSample(numberOfRecords) {
    start();

    var changeSet = [];

    for (var i = 0; i < numberOfRecords; i++) {
        var account = getAccountSample();
        var createAccountRequest = new Sdk.CreateRequest("account", account);
        changeSet.push(createAccountRequest);
    }

    var failedAccount = getFailedSample();
    var failRequest = new Sdk.CreateRequest("account", failedAccount);
    changeSet.push(failRequest);


    var requests = [changeSet];

    Xrm.WebApi.online.executeMultiple(requests).then(successCallback, errorCallback);

    function successCallback(responses) {
        end();
        console.table(responses);
    }

    function errorCallback(error) {
        end();
        console.log(error.message);
    }

    function start() {
        startTime = performance.now();
    }

    function end() {
        var endTime = performance.now();

        //in ms
        var timeDiff = endTime - startTime; 

        // strip the ms
        timeDiff /= 1000;

        // get seconds 
        var seconds = Math.round(timeDiff);
        console.log(seconds + " seconds");
    }
}

function getAccountSample() {
    var account = {
        name: "Test Account " + performance.now(),
        telephone1: "123454523",
        telephone2: "123454523",
        telephone3: "123454523",
        emailaddress1: "emailtest@gmail.com",
        emailaddress2: "emailtest@gmail.com",
        emailaddress3: "emailtest@gmail.com",
        address1_line1: "Line 1",
        address1_line2: "line 2",
        address1_line3: "line 3",
        address1_city: "City",
        fax: "Fax",
        websiteurl: "Websiteurl",
        industrycode: 1,
        preferredcontactmethodcode: 1,
        paymenttermscode: 1,
        address1_shippingmethodcode: 1,
        address1_freighttermscode: 1,
        creditonhold: true,
        creditlimit: 1000,
        description: "description"
    };

    return account;
}

function getFailedSample() {
    var account = {
        name: "Test Account " + performance.now(),
        creditlimit: "this is supposed to be a number",
    };

    return account;
}

Sdk.CreateRequest = function (entityName, payload) {
    this.etn = entityName;
    this.payload = payload;
};

Sdk.CreateRequest.prototype.getMetadata = function () {
    return {
        boundParameter: null,
        parameterTypes: {},
        operationType: 2, // This is a CRUD operation. Use '0' for actions and '1' for functions
        operationName: "Create",
    };
};