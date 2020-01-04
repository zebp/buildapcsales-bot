import { Client, Guild, TextChannel } from "discord.js";

// TODO: Clean this up later
enum Category {
    Cpu,
    Gpu,
    Psu,
    Ram,
    Hdd,
    Ssd,
    Cooler
}

const CATEGORIES = [
    Category.Cpu, Category.Gpu,
    Category.Psu, Category.Ram,
    Category.Hdd, Category.Ssd,
    Category.Cooler,
];

export default async function setupDiscordChannels(client: Client, guild: Guild) {
    await createRoleChannel(client, guild);
}

async function createRoleChannel(_client: Client, guild: Guild) {
    const channel = await guild.createChannel("roles", { type: "text" }) as TextChannel;

    for (const category of CATEGORIES) {
        await channel.sendMessage(`react to get the role ***${category}***`);
    }
}