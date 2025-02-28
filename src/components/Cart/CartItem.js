import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { transformPrice } from "../../utils/transformData";

const CartItem = ({ item, setIsLoading }) => {
    const dispatch = useDispatch();

    const [enteredAmount, setEnteredAmount] = useState(item.amount);

    const price = transformPrice(item.price);
    const total = transformPrice(item.price * enteredAmount);

    // function action dispatched
    const moduleAction = (type, item) => {
        dispatch({ type: type, item: item });
        setIsLoading(prevent => !prevent); // help lifecycle return new local storage
    };

    // delete item from
    const deleteItemCartHandler = () => {
        moduleAction("DELETE_CART", { _id: item._id });
    };

    // updated amount of cart items
    const minusHandler = () => {
        if (enteredAmount > 1) {
            setEnteredAmount(enteredAmount - 1);
            moduleAction("UPDATE_CART", {
                amount: enteredAmount - 1,
                _id: item._id,
            });
        } else {
            deleteItemCartHandler();
        }
    };
    const addHandler = () => {
        setEnteredAmount(enteredAmount + 1);
        moduleAction("UPDATE_CART", {
            amount: enteredAmount + 1,
            _id: item._id,
        });
    };

    return (
        <tr key={item._id.$oid}>
            <td style={{ maxWidth: "7rem" }}>
                <img src={item.img} alt="img" className="w-100" />
            </td>
            <td style={{ minWidth: "10rem" }}>
                <h6>{item.name}</h6>
            </td>
            <td>{price}</td>
            <td>
                <div>
                    <i
                        className="bi bi-caret-left-fill"
                        onClick={minusHandler}
                    ></i>
                    <input
                        id="id_form-0-quantity"
                        min={0}
                        pattern="[0-9]+"
                        name="form-0-quantity"
                        readOnly
                        value={enteredAmount}
                        type="number"
                    />
                    <i
                        className="bi bi-caret-right-fill"
                        onClick={addHandler}
                    ></i>
                </div>
            </td>
            <td>{total}</td>
            <td>
                <i className="bi bi-trash" onClick={deleteItemCartHandler}></i>
            </td>
        </tr>
    );
};
export default CartItem;
