var Sdk = window.Sdk || {};
/**
 * Request to win an opportunity
 * @param {Object} opportunityClose - The opportunity close activity associated with this state change.
 * @param {number} status - Status of the opportunity.
 */
Sdk.WinOpportunityRequest = function (opportunityClose, status) {
    this.OpportunityClose = opportunityClose;
    this.Status = status;
};

// NOTE: The getMetadata property should be attached to the function prototype instead of the
// function object itself.
Sdk.WinOpportunityRequest.prototype.getMetadata = function () {
    return {
        boundParameter: null,
        parameterTypes: {
            "OpportunityClose": {
                "typeName": "mscrm.opportunityclose",
                "structuralProperty": 5 // Entity Type
            },
            "Status": {
                "typeName": "Edm.Int32",
                "structuralProperty": 1 // Primitive Type
            }
        },
        operationType: 0, // This is an action. Use '1' for functions and '2' for CRUD
        operationName: "WinOpportunity",
    };
};

var opportunityClose = {
    "opportunityid@odata.bind": "/opportunities(c60e0283-5bf2-e311-945f-6c3be5a8dd64)",
    "description": "Product and maintenance for 2018",
    "subject": "Contract for 2018"
}

// Construct a request object from the metadata
var winOpportunityRequest = new Sdk.WinOpportunityRequest(opportunityClose, 3);

// Use the request object to execute the function
Xrm.WebApi.online.execute(winOpportunityRequest).then(function (response) {
    if (response.ok) {
        console.log("Status: %s %s", response.status, response.statusText);
        // The WinOpportunityRequest does not return any response body content. So we
        // need not access the response.json() property.

        // Perform other operations as required.
    }
})
    .catch(function (error) {
        console.log(error.message);
        // handle error conditions
    });
