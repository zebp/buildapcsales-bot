export enum Category {
    Case = "Case",
    Controller = "Controller",
    Cooler = "Cooler",
    Cpu = "Cpu",
    Fan = "Fan",
    Gpu = "Gpu",
    HDD = "HDD",
    Headphones = "Headphones",
    Keyboard = "Keyboard",
    Monitor = "Monitor",
    Mouse = "Mouse",
    Psu = "Psu",
    Ram = "Ram",
    Ssd = "Ssd",
    Mobo = "Mobo",
    Prebuilt = "Prebuilt",
    VR = "VR"
}

// This is apparently the cleanest way to get all of the values of an enum in TypeScript.
export const CATEGORIES: Category[] = Object.keys(Category).map(key => (Category as any)[key]);