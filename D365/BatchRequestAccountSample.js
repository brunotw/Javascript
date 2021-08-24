class BatchHandler {
    constructor(numberOfRecords) {
        this.startTime = null;
        this.endTime = null;
        this.totalTimeInSeconds = 0;
        this.numberOfRecords = null;
        this.batchRequest = null;
        this.numberOfRecords = numberOfRecords;
        this.batchRequest = new BatchPostAccounts(this.end);

        this.apiUrl = Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/";
        this.uniqueId = "batch_" + (new Date().getTime());
        this.batchItemHeader = "--" + this.uniqueId + "\nContent-Type: application/http\nContent-Transfer-Encoding:binary";
        this.content = [];
    }

    start() {
        this.startTime = performance.now();
        console.log("Batch started");
    }

    end = (function (response) {
        console.log("Batch request response code: " + response.target.status);

        this.endTime = performance.now();
        var timeDiff = this.endTime - this.startTime;
        timeDiff /= 1000;

        this.totalTimeInSeconds = Math.round(timeDiff);
        console.log(this.totalTimeInSeconds + " seconds");
    }).bind(this);


    getSampleAccount() {
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

    startBatch() {
        this.start();

        for (var i = 0; i < this.numberOfRecords; i++) {
            var account = this.getSampleAccount();
            this.batchRequest.addRequestItem(account);
        }

        this.batchRequest.sendRequest();
    }
}

function BatchPostAccounts(callback) {
    this.apiUrl = Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/";
    this.uniqueId = "batch_" + (new Date().getTime());
    this.batchItemHeader = "--" + this.uniqueId + "\nContent-Type: application/http\nContent-Transfer-Encoding:binary";
    this.content = [];
    this.callback = callback;
}

BatchPostAccounts.prototype.addRequestItem = function (data) {
    this.content.push(this.batchItemHeader);
    this.content.push("");
    this.content.push("POST " + this.apiUrl + "accounts" + " HTTP/1.1");
    this.content.push("Content-Type: application/json;type=entry");
    this.content.push("");
    this.content.push(JSON.stringify(data));
}

BatchPostAccounts.prototype.sendRequest = function () {
    this.content.push("");
    this.content.push("--" + this.uniqueId + "--");
    this.content.push(" ");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", encodeURI(this.apiUrl + "$batch"));
    xhr.setRequestHeader("Content-Type", "multipart/mixed;boundary=" + this.uniqueId);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("OData-MaxVersion", "4.0");
    xhr.setRequestHeader("OData-Version", "4.0");
    xhr.addEventListener('loadend', this.callback);

    //xhr.addEventListener('loadstart', handleEvent);
    //xhr.addEventListener('load', handleEvent);
    //xhr.addEventListener('loadend', handleEvent);
    //xhr.addEventListener('progress', handleEvent);
    //xhr.addEventListener('error', handleEvent);
    //xhr.addEventListener('abort', handleEvent);

    xhr.send(this.content.join("\n"));
}
