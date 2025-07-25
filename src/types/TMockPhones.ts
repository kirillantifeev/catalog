export type TDataPhone = {
        name: string,
        id: number, 
        manufacturer: string, 
        releaseYear: number,
        screenDiagonal: number,
        сountryOfOrigin: string,
        memoryCapacity: number,
        screenRefreshRate: number,
        NFC: boolean,
        ESIM: boolean,
        wirelessСharging: boolean,
        cost: number,
        image: string
}

export type TMockPhones = TDataPhone[];