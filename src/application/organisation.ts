import { Organisation } from "@prisma/client";
import { generatePasswordHash, validatePassword } from "../helpers/generatePasswordHash";
import { db } from "../prisma";


export async function TryToLoginToOrganisation(name: string, password: string) {
    var organisation = await getOrganisationByName(name, true);
    if (organisation != null) {
        if (validatePassword(password, organisation.token)) {
            organisation.token = null;
            return organisation;
        } else {
            return false;
        }
    }

    return null;
}

export async function TryToLoginToOrCreateOrganisation(name: string, password: string) {
    var organisation = await TryToLoginToOrganisation(name, password);

    if (organisation == null) {
        return await createOrganisation(name, password);
    }

    if (organisation === false) {
        return null;
    }

    organisation.token = null;
    return organisation;
}


export function processOrganisationName(name: string) {
    if (name == null) {
        return null;
    }

    var name = name.toLowerCase();
    name = name.replace(/[^a-z0-9]/gi, '');
    return name;
}

export async function getOrganisationByName(name: string, unsecureKeepPassword = false) {
    var name = processOrganisationName(name);

    var organisation = await db.organisation.findFirst({
        where: {
            name: name
        }
    });

    if (organisation == null) {
        return null;
    }

    if (unsecureKeepPassword !== true) {
        organisation.token = null;
    }

    return organisation;
}
export async function createOrganisation(name: string, password: string) {
    var organisation: Organisation = await getOrganisationByName(name);
    if (organisation != null) {
        throw "Unable to create organisation. Name already exists";
    }

    password = generatePasswordHash(password);
    organisation = await db.organisation.create({
        data: {
            token: password,
            name: processOrganisationName(name)
        }
    });
    organisation.token = null;
    return organisation;
}
