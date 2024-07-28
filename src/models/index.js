// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RideDetails, Location } = initSchema(schema);

export {
  RideDetails,
  Location
};