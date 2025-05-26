import { v4 as uuidV4, validate } from "uuid";

export const generateRandomUUID = () => uuidV4();

export const isValidUUID = (id: string) => (!id || !validate(id) ? false : true);
