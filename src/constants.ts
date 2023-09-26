// API constants... ideally BASE_URL will come from .env files or environment variables
export const BASE_URL =
  "https://portal.spatial.nsw.gov.au/server/rest/services/";
const CONSTANTS = {
  GEOCODED_ADDRESSING: {
    API: "NSW_Geocoded_Addressing_Theme/FeatureServer/1/query?where=",
    PARAMS: ["outFields=*", "f=geojson"],
  },
  BOUNDARIES: {
    API: "NSW_Administrative_Boundaries_Theme/FeatureServer/4/query?geometry=",
    PARAMS: [
      "geometryType=esriGeometryPoint",
      "inSR=4326",
      "spatialRel=esriSpatialRelIntersects",
      "outFields=*",
      "returnGeometry=false",
      "f=geojson",
    ],
  },
};
export default CONSTANTS;
