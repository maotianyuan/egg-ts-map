export declare namespace PathSheet {
  interface Column {
    lon: number
    lat: number
    [otherColumn: string]: any
  }
  interface PathMap {
    [userID: number]: Column[][]
  }
  
  interface Data {
    fileName: string,
    pathMap: PathMap
  }  
}

export declare namespace HeatMapStoreSheet {
  interface Column {
    lon: number
    lat: number
    [otherColumn: string]: any
  }
 
  interface Data {
    radius: number,
    city: string,
    fileName: string,
    heatMap: any
  }  
}
export declare namespace HeatMapPositionSheet {
  interface Column {
    lon: number
    lat: number
    [otherColumn: string]: any
  }
  interface Pointer {
    gdlon: number
    gdlat: number
    [name: string]: any
  }
  interface Data {
    radius: number,
    province: string,
    city: string,
    fileName: string,
    heatMap: any,
    max: number
  }  
}
export declare namespace HeatMapPositionNormalSheet {
  interface Column {
    lon: number
    lat: number
    [otherColumn: string]: any
  }
  interface Data {
    radius: number,
    province: string,
    city: string,
    persion: string,
    fileName: string,
    heatMap: any,
    max: number
  }  
}