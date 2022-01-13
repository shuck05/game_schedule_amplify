export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "gamescheduleamplify8bfea8b0": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "lambdaCreateUser": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "gamescheduleLambdaApi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "gamescheduleGraphQL": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}