import {body, ExpressValidator} from "express-validator";
import {AppDataSource} from "../data-source";
import {Category} from "../entity/Category";
import {Product} from "../entity/Product";

const categoryRepository = AppDataSource.getRepository(Category);
const productRepository = AppDataSource.getRepository(Product);

export const createNewProductSchema = {
    name: {
        isString: true,
        errorMessage: "Name must be a non empty string."
    },
    description: {
        isString: true,
        errorMessage: "Description must be a non empty string."
    },
    unitPrice: {
        isFloat: {
            options: {gt: 0},
            errorMessage: "Unit price must be a float greater than 0."
        }
    },
    unitWeight: {
        isFloat: {
            options: {gt: 0},
            errorMessage: "Unit weight must be a float greater than 0."
        }
    },
    category: {
        categoryExists: true
    },
    'category.id': {
        isInt: {
            options: {gt: 0},
            errorMessage: "Category id must be an integer greater than 0."
        }
    },
    'category.name': {
        isString: true,
        errorMessage: "Category name must be a non empty string."
    }
}

//unused cause PUT prodcut should include all fields
// export const modifyProductSchema = {
//     name: {
//         optional: true,
//         isString: true,
//         errorMessage: "Name must be a non empty string."
//     },
//     description: {
//         optional: true,
//         isString: true,
//         errorMessage: "Description must be a non empty string."
//     },
//     unitPrice: {
//         optional: true,
//         isFloat: {
//             options: {gt: 0},
//             errorMessage: "Unit price must be a float greater than 0."
//         }
//     },
//     unitWeight: {
//         optional: true,
//         isFloat: {
//             options: {gt: 0},
//             errorMessage: "Unit weight must be a float greater than 0."
//         }
//     },
//     category: {
//         optional: true,
//         categoryExists: true
//     },
//     'category.id': {
//         isInt: {
//             if: body('category').notEmpty(),
//             options: {gt: 0},
//             errorMessage: "Category id must be an integer greater than 0."
//         }
//     },
//     'category.name': {
//         isString:{
//             if: body('category').notEmpty(),
//             errorMessage: "Category name must be a non empty string."
//         }
//     }
// }


export async function categoryExists (value:any) {
    const categoryId = value.id;
    const categoryName = value.name;
    let result;
    try {
        result = await categoryRepository.findOneBy({
            id: categoryId,
            name: categoryName
        })
    } catch (error) {
        throw new Error(`Problem with connecting to database`);
    }
    if (result === null) {
        throw new Error(`There is no category with id:'${categoryId}' and name:'${categoryName}'`);
    }
    return result;
}

export async function productExists (value:any) {
    const productId = value;
    let result;
    try {
        result = await productRepository.findOneBy({
            id: productId
        })
    } catch (error) {
        throw new Error(`Problem with connecting to database`);
    }
    if (result === null) {
        throw new Error(`There is no product with id:'${productId}'.`);
    }
    return result;
}