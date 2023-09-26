//import local lambda helpers
import { APIGatewayProxyEvent, Context } from "aws-lambda";

// get the data from api by passing address
import getGeoCodedAddress from "./api/api";

//lambda handler
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  const response = { statusCode: 200, body: "" };
  //try to call the api and get data
  try {
    let address = event.queryStringParameters?.address;
    if (address) {
      // call the api's to get data if address available
      const geoData = await getGeoCodedAddress(address);
      // create the response from the api data
      response.body = JSON.stringify(geoData);
      return response;
    } else {
      // error state if no address available
      response.statusCode = 500;
      response.body = "Address not available in the request";
      return response;
    }
  } catch (error) {
    // if error from api or some other run time error
    response.statusCode = 500;
    response.body = "API request failed with following error : " + error;
    return response;
  }
};
