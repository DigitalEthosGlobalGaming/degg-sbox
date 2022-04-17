import { TryToLoginToOrCreateOrganisation } from "../../application/organisation";
import { EventPayload } from "../../types/event";

export async function LoginEvent(data: any, payload: EventPayload) {
    var organisation = await TryToLoginToOrCreateOrganisation(data?.username, data?.password);

    if (organisation != null) {
        payload.ws.organisation = organisation;
    }

    return organisation;
}