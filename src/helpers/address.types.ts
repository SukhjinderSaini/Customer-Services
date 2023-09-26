// address response types

export interface GEOMETRY {
  type: string;
  coordinates: number[];
}
export interface PROPERTIES {
  rid: number;
  createdate: number;
  gurasid: number;
  principaladdresssiteoid: number;
  addressstringoid: number;
  addresspointtype: number;
  addresspointuncertainty: string | null;
  containment: number;
  startdate: number;
  enddate: number;
  lastupdate: number;
  msoid: number;
  centroidid: number | null;
  shapeuuid: string;
  changetype: string;
  processstate: string | null;
  urbanity: string;
  address: string;
  housenumber: string;
}

export interface ADDRESSING_FEATURE {
  type: string;
  id: number;
  geometry: GEOMETRY;
  properties: PROPERTIES;
}
export interface ADDRESSING_RESPONSE {
  type: string;
  features: ADDRESSING_FEATURE[];
}
