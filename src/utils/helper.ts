export const isEmpty = (value: any): boolean => {
    if (typeof value === 'string') {
        if (value.trim().length > 0) {
            return false;
        }
    }

    if (typeof value === 'number') {
        if (isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }

    if (typeof value === 'boolean') {
        return false;
    }

    if (typeof value === 'object' && value instanceof Array) {
        if (value.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    if (value instanceof Date) {
        if (value.toString() === 'Invalid Date') {
            return true;
        } else {
            return false;
        }
    }

    if (typeof value === 'object' && value !== null && value !== undefined) {
        if (Object.keys(value).length > 0) {
            return false;
        } else {
            return true;
        }
    }

    return true;
}

export const addKeyValuePair = (obj: Record<string, string>, key: string, value: string): Record<string, string> => {
    if (!obj) return { [key]: value };
    if (obj[key]) {
        return obj;
    }
    return { ...obj, [key]: value };
};

export const removeKey = (obj: Record<string, string>, key: string): Record<string, string> => {
    if (!obj) return {};
    const { [key]: _, ...rest } = obj;
    return rest;
};

export const updateKeyValue = (obj: Record<string, string>, key: string, value: string): Record<string, string> => {
    if (!obj[key]) {
        return obj;
    }
    return { ...obj, [key]: value };
};