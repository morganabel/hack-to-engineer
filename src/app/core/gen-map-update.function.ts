export function GenerateMapUpdate(parentObj: {}, mapPropKey: string, mapKey: string, mapValue: any) {
    const update = {};

    if (!parentObj.hasOwnProperty(mapPropKey)) {
        update[mapPropKey] = {};
        update[mapPropKey][mapKey] = mapValue;
    } else {
        update[`${mapPropKey}.${mapKey}`] = mapValue;
    }

    return update;
}