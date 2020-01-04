import { Client, Guild, TextChannel, RichEmbed, Message, Role, CategoryChannel } from "discord.js";
import { getRoleByName } from "./role";

// TODO: Clean this up later
enum Category {
    Cpu = "Cpu",
    Gpu = "Gpu",
    Psu = "Psu",
    Ram = "Ram",
    Hdd = "Hdd",
    Ssd = "Ssd",
    Cooler = "Cooler"
}

const CATEGORIES = [
    Category.Cpu, Category.Gpu,
    Category.Psu, Category.Ram,
    Category.Hdd, Category.Ssd,
    Category.Cooler,
];

export default async function setupDiscordChannels(client: Client, guild: Guild) {
    await createRoles(guild);
    await createRoleChannel(client, guild);

    const channelCategory = await guild.createChannel("Notifications", { type: "category" }) as CategoryChannel;

    for (const category of CATEGORIES) {
        await createCategoryChannel(category, guild, channelCategory);
    }
}

async function createCategoryChannel(category: Category, guild: Guild, channelCategory: CategoryChannel) {
    if (channelCategory.children.find(channel => channel.name === category)) {
        return;
    }

    const channel = await guild.createChannel(category, {
        type: "text",
        parent: channelCategory
    }) as TextChannel;

    await Promise.all([
        channel.overwritePermissions(guild.defaultRole, {  VIEW_CHANNEL: false }),
        channel.overwritePermissions(getRoleByName(category, guild)!, {  VIEW_CHANNEL: true }),
    ]);
}

async function createRoles(guild: Guild) {
    for (const category of CATEGORIES) {
        const role = getRoleByName(category, guild);

        if (role) {
            continue;
        }

        await guild.createRole({
            name: category,
            color: "#36b6e0",
            mentionable: true,
        });
    }
}

async function createRoleChannel(_client: Client, guild: Guild) {
    const channelCategory = await guild.createChannel("Bot", { type: "category" }) as CategoryChannel;
    const channel = await guild.createChannel("roles", {
        type: "text",
        parent: channelCategory
    }) as TextChannel;

    const roles = CATEGORIES
        .map(category => getRoleByName(category, guild))
        .map(role => `<@&${role!.id}>`)
        .join("  \n");

    const embed = new RichEmbed()
        .setTitle(`Subscribe to roles!`)
        .setDescription(`Type \`!subscribe <role>\` in this channel to subscribe to hardware drops!\n\n**Roles:**\n\n${roles}`)
        .setColor("#36b6e0")
        .setTimestamp();

    await channel.send(embed);
}