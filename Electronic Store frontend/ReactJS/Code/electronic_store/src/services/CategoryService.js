import { privateAxios } from "./axios.service";

export function addCategory(category){
    return privateAxios.post('/categories',category).then(response=>response.data);
}

export function getCategories(){
    return privateAxios.get('/categories').then(response=>response.data);
}

export function deleteCategory(categoryId){
    return privateAxios.delete(`/categories/${categoryId}`, categoryId).then(response=>response.data);
}
export function updateCategory(category){
    return privateAxios.put(`/categories/${category.categoryId}`, category).then(response=>response.data);
}