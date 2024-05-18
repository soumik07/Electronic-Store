export const BASE_URL = 'http://localhost:9090';
export const ADMIN_ORDER_PAGE_SIZE = 10;

export function getProductImageUrl(productId){
    return `${BASE_URL}/products/image/${productId}`;
}
export function formatDate(timeInLongs){
    return new Date(timeInLongs).toLocaleString('en-US',{year: 'numeric',weekday: 'long', month: 'long',day: 'numeric'});
}