import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerLocation = {
  readonly address: string;
  readonly name?: string | null;
  readonly latitude: number;
  readonly longitude: number;
}

type LazyLocation = {
  readonly address: string;
  readonly name?: string | null;
  readonly latitude: number;
  readonly longitude: number;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location)

type EagerRideDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RideDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dateTime: string;
  readonly isFlexible: boolean;
  readonly byFlexible?: number | null;
  readonly needReturnRide: boolean;
  readonly waitTime?: number | null;
  readonly duration: number;
  readonly offer: number;
  readonly destination: Location;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRideDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RideDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dateTime: string;
  readonly isFlexible: boolean;
  readonly byFlexible?: number | null;
  readonly needReturnRide: boolean;
  readonly waitTime?: number | null;
  readonly duration: number;
  readonly offer: number;
  readonly destination: Location;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RideDetails = LazyLoading extends LazyLoadingDisabled ? EagerRideDetails : LazyRideDetails

export declare const RideDetails: (new (init: ModelInit<RideDetails>) => RideDetails) & {
  copyOf(source: RideDetails, mutator: (draft: MutableModel<RideDetails>) => MutableModel<RideDetails> | void): RideDetails;
}