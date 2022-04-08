import { ConnectionInfo } from "src/generated-api/models";

export class ConnectionInfoModel implements ConnectionInfo {
  // model properties
  appVersion?: string;
  id?: string;
  lastConnection?: string;
  os?: string;
  userName?: string;
}
