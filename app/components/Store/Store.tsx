import { LatLng } from 'react-native-maps';
export interface Ini {
    id: any,
    icon: string,
    type: string,
  }
export interface Store {
    id: any,
    icon: string,
    type: string,
    name: string,
    cont: string,
    cell: string,
    dire: LatLng
  }
export interface Locals {
    ini: Ini[],
    all: Store[];
  }
  