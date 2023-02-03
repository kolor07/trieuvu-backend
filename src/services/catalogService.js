import db from '../models/index';

export const getCatalogById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('getCatalogById', id);
            const res = await db.Catalog.findOne({
                raw: true,
                attributes: ['id', 'name'],
                where: {
                    id: id,
                },
            });
            resolve({ id: res?.id, name: res?.name });
        } catch (err) {
            reject({});
        }
    });
};
