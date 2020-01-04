import { Guild, Role } from "discord.js";

export function getRoleByName(name: string, guild: Guild): Role | undefined {
    return guild.roles.find(role => role.name === name);
}