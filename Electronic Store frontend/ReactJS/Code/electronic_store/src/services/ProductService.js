import { privateAxios, publicAxios } from "./axios.service";

export function createProductWithoutCategory(product){
    return privateAxios.post(`/products`, product).then(response=>response.data);
}

export function createProductInCategory(product, categoryId){
    return privateAxios.post(`/categories/${categoryId}/products`, product).then(response=>response.data);
}

//uploading product image
export function addProductImage(file, productId){
    const formData = new FormData();
    formData.append("productImage", file);
    return privateAxios.post(`/products/image/${productId}`,formData).then(response=>response.data);
}

//get products
export function getAllProducts(pageNumber = 0, pageSize = 10, sortBy = "addedDate", sortDir = "asc"){
    return privateAxios.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(
        response=>response.data
    );
}

//delete product
export function deleteProduct(productId){
    return privateAxios.delete(`/products/${productId}`).then(response=>response.data);
}

//Search Product
export function searchProduct(query){
    return privateAxios.get(`/products/search/${query}`).then(response=>response.data);
}