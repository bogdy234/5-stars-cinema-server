type IGenericObject<T> = Record<string, T>;

function removeProperties<T>(obj: IGenericObject<T>, props): Partial<IGenericObject<T>> {
    const newObj = new Map(Object.entries(obj));
    props.forEach((prop) => {
        newObj.delete(prop);
    });

    return Object.fromEntries(newObj);
}

export default { removeProperties };
