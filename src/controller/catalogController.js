import * as catalogService from '../services/catalogService';

export const getCatalogById = async (req, res) => {
    const result = await catalogService.getCatalogById(req.params.id);

    result ? res.status(200).json(result) : res.status(501).json(result);
};
