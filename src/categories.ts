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
    Motherboard = "Motherboard",
    Prebuilt = "Prebuilt",
    VR = "VR",
    Other = "Other"
}

// This is apparently the cleanest way to get all of the values of an enum in TypeScript.
export const CATEGORIES: Category[] = Object.keys(Category).map(key => (Category as any)[key]);

// Not everyone on the subreddit follows the conventions for categories,
// so here are some commonly used non-official categories mapped to their
// official counterparts.
const CATEGORY_MAPPINGS: Map<String, Category> = new Map([
    ["case fan", Category.Fan],
    ["graphics card", Category.Gpu],
    ["aio", Category.Cooler],
    ["cpu cooler", Category.Cooler],
    ["mobo", Category.Motherboard],
    ["nvme", Category.Ssd],
]);

export function getCategoryForTitle(title: string): Category {
    const matches = title.match(/\[(.+)\].+/);

    // Sometimes people don't provide the category of a product, so we will default to the "other" category.
    if (matches === null || matches.length != 2) {
        return Category.Other;
    }

    const text = matches[1].toLowerCase();

    return CATEGORIES.find(category => category.toLowerCase() === text)
        || CATEGORY_MAPPINGS.get(text)
        || Category.Other;
}