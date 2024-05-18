import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";   
import { deleteProduct } from "../../services/ProductService";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Swal from 'sweetalert2';

export function SingleProductView({product,index, updateProductRealTime, handleShowView}){
    const formatDate = (time) => {
        return new Date(time).toLocaleDateString();
    }
    const deleteCat = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(product.productId).then(responseData=>{
                    Swal.fire({              
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    updateProductRealTime(product.productId)
                    
                }).catch(error=>{
                    toast.error("error deleting category!!");
                })
            }
          });
    }
    return(
        <tr>
            <td className="small">{index+1}</td>
            <td className="small">{product.title}</td>
            <td className="small">{product.quantity}</td>
            <td className="small">₹ {product.price}</td>
            <td className="small">₹ {product.discountedPrice}</td>
            <td className={`small ${product.live?'table-success':'table-danger'}`}>{product.live?'Yes':'No'}</td>
            <td className={`small ${product.stock?'table-success':'table-danger'}`}>{product.stock?'Yes':'No'}</td>
            <td className="small">{product.category?product.category.title:'null'}</td>
            <td className="small">{formatDate(product.addedDate)}</td>
            <td className="small">
                {/* delete Button */}
                <Button variant="danger" size="sm" onClick={deleteCat} ><MdDelete className="small"/></Button>
                {/* View button */}
                <Button className="ms-2" variant="warning" size="sm" onClick={(event)=>handleShowView(event,product)}><FaRegEye className="small"/></Button>
                {/* update button */}
                <Button className="ms-2" variant="dark" size="sm"><FaPencilAlt className="small"/></Button>
            </td>
            
        </tr>
    )
}