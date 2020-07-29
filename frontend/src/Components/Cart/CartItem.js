import React, { useState, useEffect } from 'react'
import "../../Style/Components/CartItem.scss"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getBackendDomainAndPort from "../../Tools/getBackendDomainAndPort"

function CartItem({ id, name, stock, price, image_url, quantity, changeCartSum, loadCartItems }) {
    const [quantityNum, setQuantityNum] = useState(quantity)

    const updateQuantityNum = (number) => {
        const newQuantity = quantityNum + number
        if (newQuantity <= stock && newQuantity >= 1) {
            setQuantityNum(newQuantity)
        }
    }

    // updates quantity in database
    useEffect(() => {
        const url = `https://${getBackendDomainAndPort()}/cart/put`
        axios.put(url, {
            "quantity": quantityNum,
            "id": id
        })
            .then(() => {
                axios.get(`https://${getBackendDomainAndPort()}/cart/sum`)
                    .then(() => {
                        changeCartSum()
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            })
            .catch(error => {
                console.log(error.message)
            })
        // eslint-disable-next-line
    }, [quantityNum])

    const removeItem = () => {
        const url = `https://${getBackendDomainAndPort()}/cart/delete`
        axios.delete(url, {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "name": name
            }
        })
        .then(() => {
            loadCartItems()
        })
    }

    return (
        <div className="cart-item">
            <Link to={`/products/${name}`}>
                <img className="cart-item__image" src={image_url} alt=""></img>
            </Link>
            <p className="cart-item__text"> <b>{name}</b> </p>
            <p className="cart-item__text"> In stock: {stock} </p>
            <p className="cart-item__text"> price: {price} €</p>
            <div className="cart-item__quantity-changer">
                <button className="cart-item__quantity-button" onClick={() => updateQuantityNum(-1)}>-</button>
                <p className="cart-item__quantity-num"> {quantityNum} </p>
                <button className="cart-item__quantity-button" onClick={() => updateQuantityNum(1)}>+</button>
            </div>
            <FontAwesomeIcon class="cart-item__remove-button" onClick={() => removeItem()} icon={faTimes} />
            <hr></hr>
        </div>
    )
}

export default CartItem