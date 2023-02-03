import * as productService from '../services/productService';

export const getProductNewArrival = async (req, res, next) => {
    console.log('req.params', req.params);
    const result = await productService.getProductNewArrival(req.params.page || 1);
    console.log('resultgetProductNewArrival', result);
    result ? res.status(200).send(result) : res.status(404).send(' products not found');
};

export const getProductBestSale = async (req, res, next) => {
    console.log('req.params', req.params);
    const result = await productService.getProductBestSale(req.params.page || 1);
    console.log('result', result);
    result ? res.status(200).send(result) : res.status(404).send(' products not found');
};

export const getProductBestVote = async (req, res, next) => {
    console.log('req.params', req.params);
    const result = await productService.getProductBestVote(req.params.page || 1);
    console.log('result', result);
    result ? res.status(200).send(result) : res.status(404).send(' products not found');
};

export const getProductByCategoryId = async (req, res, next) => {
    console.log('req.params', req.params);
    const result = await productService.getProductByCategoryId(
        req.params.categoryId,
        req.params.page ? 1 : req.params.page,
    );
    console.log('result', result);
    result ? res.status(200).send(result) : res.status(404).send(' products not found');
};

export const getProductById = async (req, res, next) => {
    console.log('req.params', req.params.id);
    const result = await productService.getProductById(req.params.id);
    result ? res.status(200).send(result) : res.status(404).send(' products not found');
};

export const getProductsByName = async (req, res, next) => {
    console.log('req.params', req.params);
    const { data, page } = req.params;
    const result = await productService.getProductByNames(data, page);
    result ? res.status(200).send(result) : res.status(404).send(' products not found');
};
