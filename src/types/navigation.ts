import { Player } from "./player";

export type RootStackParamList = {
  Players: undefined;
  PlayerDetails: {
    player: Player; // ← luego lo cambiamos a Player
  };
};