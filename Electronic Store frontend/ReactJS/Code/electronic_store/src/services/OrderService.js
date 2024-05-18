import { privateAxios } from "./axios.service";

//Get all order
export async function getAllOrders(pageNumber,pageSize,sortBy,sortDir){
    const result = await privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
    return result.data;
}

//Update order
export async function updateOrderService(order){
    const result = await privateAxios.put(`/orders/${order.orderId}`, order).then(response=>response.data);
    return result.data;
}