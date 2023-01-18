import { PlayerDTO } from "@dto/PlayerDTO";
import { playerListAsync } from "./playerListAsync";

export async function playerListByTeamAsync(group: string, team: string) : Promise<PlayerDTO[]> {
    try {
        const list = await playerListAsync(group);
        const filtered = list.filter(item => item.team === team);

        return filtered;
    } catch (error) {
        throw error;
    }
}
