//Source: https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/execute
var Sdk = window.Sdk || {};

/**
 * Request to execute a create operation
 */
Sdk.CreateRequest = function (entityName, payload) {
    this.etn = entityName;
    this.payload = payload;
};

// NOTE: The getMetadata property should be attached to the function prototype instead of the
// function object itself.
Sdk.CreateRequest.prototype.getMetadata = function () {
    return {
        boundParameter: null,
        parameterTypes: {},
        operationType: 2, // This is a CRUD operation. Use '0' for actions and '1' for functions
        operationName: "Create",
    };
};
// Construct a request object from the metadata
var payload = {
    name: "Fabrikam Inc."
};
var createRequest = new Sdk.CreateRequest("account", payload);

// Use the request object to execute the function
Xrm.WebApi.online.execute(createRequest)
    .then(function (response) {
        if (response.ok) {
            console.log("Status: %s %s", response.status, response.statusText);

            // The Create request does not return any response body content. So we
            // need not access the response.json() property.

            // Perform other operations as required.
        }
    })
    .catch(function (error) {
        console.log(error.message);
        // handle error conditions
    });


/**
 * Request to execute a retrieve operation
 */
Sdk.RetrieveRequest = function (entityReference, columns) {
    this.entityReference = entityReference;
    this.columns = columns;
};
// NOTE: The getMetadata property should be attached to the function prototype instead of the
// function object itself.
Sdk.RetrieveRequest.prototype.getMetadata = function () {
    return {
        boundParameter: null,
        parameterTypes: {},
        operationType: 2, // This is a CRUD operation. Use '0' for actions and '1' for functions
        operationName: "Retrieve",
    };
};

// Construct request object from the metadata
var entityReference = {
    entityType: "account",
    id: "d2b6c3f8-b0fa-e911-a812-000d3a59fa22"
};
var retrieveRequest = new Sdk.RetrieveRequest(entityReference, ["name"]);

// Use the request object to execute the function
Xrm.WebApi.online.execute(retrieveRequest)
    .then(function (response) {
        if (response.ok) {
            console.log("Status: %s %s", response.status, response.statusText);

            // Use response.json() to access the content of the response body.
            return response.json();
        }
    })
    .then(function (responseBody) {
        console.log("Name: %s", responseBody.name);

        // perform other operations as required;
    })
    .catch(function (error) {
        console.log(error.message);
        // handle error conditions
    });


/**
 * Request to execute an update operation
 */
Sdk.UpdateRequest = function (entityName, entityId, payload) {
    this.etn = entityName;
    this.id = entityId;
    this.payload = payload;
};

// NOTE: The getMetadata property should be attached to the function prototype instead of the
// function object itself.
Sdk.UpdateRequest.prototype.getMetadata = function () {
    return {
        boundParameter: null,
        parameterTypes: {},
        operationType: 2, // This is a CRUD operation. Use '0' for actions and '1' for functions
        operationName: "Update",
    };
};

// Construct a request object from the metadata
var payload = {
    name: "Updated Sample Account"
};
var updateRequest = new Sdk.UpdateRequest("account", "d2b6c3f8-b0fa-e911-a812-000d3a59fa22", payload);

// Use the request object to execute the function
Xrm.WebApi.online.execute(updateRequest)
    .then(function (response) {
        if (response.ok) {
            console.log("Status: %s %s", response.status, response.statusText);

            // The Update request does not return any response body content. So we
            // need not access the response.json() property.

            // perform other operations as required;
        }
    })
    .catch(function (error) {
        console.log(error.message);
        // handle error conditions
    });