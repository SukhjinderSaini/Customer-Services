import apiClient, { AxiosError } from "./apiClient";
import ErrorProfiler from "../helpers/errors";
import { ADDRESSING_RESPONSE } from "../helpers/address.types";
import CONSTANTS from "../constants";
import { BOUNDARIES_DATA } from "../helpers/boundary.types";

interface ADDRESS_LOCATION {
  latitude: number;
  longitude: number;
}
export interface API_RESPONSE {
  location: ADDRESS_LOCATION;
  suburb: string;
  electoralDistrict: string;
  error: string[] | null;
}
const errorContainer = new ErrorProfiler();
let responseRequired = {} as API_RESPONSE;

const getGeoCodedAddress = async (address: string) => {
  const apiUrladdress =
    CONSTANTS.GEOCODED_ADDRESSING.API +
    encodeURI(
      "address='" +
        address.replace(/ /g, "+") +
        "'&" +
        CONSTANTS.GEOCODED_ADDRESSING.PARAMS.join("&")
    );

  let geocodeData = {} as ADDRESSING_RESPONSE;

  await apiClient
    .get(apiUrladdress)
    .then(async (res) => {
      if (res && res.data) {
        geocodeData = res.data;
        if (
          geocodeData.features &&
          geocodeData.features.length > 0 &&
          geocodeData.features[0].geometry &&
          geocodeData.features[0].geometry.coordinates
        ) {
          const coordinates = geocodeData.features[0].geometry.coordinates;
          responseRequired = await getAdministrativeBoundries(coordinates);
        } else {
          errorContainer.catchError(
            "could not find the coordinates for address : " + address
          );
          responseRequired.error = errorContainer.getError();
        }
      } else if (!res.data) {
        errorContainer.catchError(res.statusText);
        responseRequired.error = errorContainer.getError();
      }
    })
    .catch((e: AxiosError) => {
      errorContainer.catchError(e.message);
      responseRequired.error = errorContainer.getError();
    });
  return responseRequired;
};
const getAdministrativeBoundries = async (coordinates: number[]) => {
  const url =
    CONSTANTS.BOUNDARIES.API +
    coordinates.slice(0, 2).join(", ") +
    "&" +
    CONSTANTS.BOUNDARIES.PARAMS.join("&");
  let boundariesData = {} as BOUNDARIES_DATA;
  responseRequired.location = {
    latitude: coordinates[0],
    longitude: coordinates[1],
  };
  await apiClient
    .get(url)
    .then(async (res) => {
      if (res && res.data) {
        boundariesData = res.data;
        if (
          boundariesData.features &&
          boundariesData.features.length > 0 &&
          boundariesData.features[0].properties &&
          boundariesData.features[0].properties.districtname
        ) {
          responseRequired.electoralDistrict =
            boundariesData.features[0].properties.districtname;
          responseRequired.suburb = "N/A";
        } else {
          errorContainer.catchError(
            "could not find the data for co-ordinates : " +
              coordinates.join(", ")
          );
          responseRequired.error = errorContainer.getError();
        }
      } else if (!res.data) {
        errorContainer.catchError(res.statusText);
      }
    })
    .catch((e: AxiosError) => {
      errorContainer.catchError(e.message);
      responseRequired.error = errorContainer.getError();
    });
  return responseRequired;
};
export default getGeoCodedAddress;
