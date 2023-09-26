//boundarty data types

export interface BOUNDARIES_DATA {
  type: string;
  features: BOUNDARIES_FEATURE[];
}
type DATESTAMP = number;
export interface BOUNDARIES_FEATURE {
  type: string;
  id: number;
  geometry: string | null;
  properties: BOUNDARY_PROPERTIES;
}
export interface BOUNDARY_PROPERTIES {
  rid: number;
  cadid: number;
  createdate: DATESTAMP;
  modifieddate: DATESTAMP;
  districtname: string;
  startdate: DATESTAMP;
  enddate: DATESTAMP;
  lastupdate: DATESTAMP;
  msoid: number;
  centroidid: number | null;
  shapeuuid: string;
  changetype: string;
  processstate: number | null;
  urbanity: string;
  Shape__Length: number;
  Shape__Area: number;
}
