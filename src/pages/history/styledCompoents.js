import styled from "styled-components";

export const Context = styled.div`
    width: 150px;
    position: absolute;
    top: 50%;
    left: 110%;
    transform: translateY(-50%);
    visibility: hidden;
`

export const ContextLi = styled.div`
    position: relative;
    display: inline-block;
    margin: 10px 0;

    &:focus > div {
        visibility: visible;
    }
`

export const ContextUl = styled.ul`
    display: flex;

`