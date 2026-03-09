export const getOffset = (page, limit) => {
    return page && limit ? (page - 1) * limit : undefined;
};