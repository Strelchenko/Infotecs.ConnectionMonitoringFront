import { ConnectionEvent } from 'src/generated-api/models';

export class ConnectionEventModel implements ConnectionEvent {
  // model properties
  eventTime?: string;
  name?: string;
}
