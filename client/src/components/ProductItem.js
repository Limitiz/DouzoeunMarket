import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    .thumbnail{
        img{
            width: 15rem;
            height : 15rem;
            margin:0;
            margin-bottom : 1rem;
        }
    }
    .title{
        font-size:20px;
    }
    .contents{
        background-color: white;
        width: 200px;
        height: 120px;
        margin: auto;
        
        .discount{
            margin-left: 12.5rem;
            border: 2px solid orange;
            border-radius: 50px;
            background-color: orange;
            color: white;
            font-size: 13px;
        }
        .price_origin{
            color: gray;
            font-size: 20px;
        }
        .p_discount{
            margin-left: 0.5rem;
            text-decoration: none;
            color: red;
            font-size: 20px;
        }
    }
    & + &{
        margin-top: 3rem;
    }
`;

// eslint-disable-next-line react/prop-types
const ProductItem = ({ deliver }) => {
    // eslint-disable-next-line react/prop-types
    const { imgUrl, title, price } = deliver;
    return(
        <Container>
            <span>
                <div className="thumbnail">
                    <img src={imgUrl} alt="thumbnail"/>
                </div>
                <span className="title">{title}</span><br/>
                <span className="price_origin">{price}원</span>
            </span>
        </Container>
    )
}

export default ProductItem;