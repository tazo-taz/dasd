import styled from "styled-components"

export const ProgressBarDiv = styled.div`
    border: 2px solid black;
`

export const ProgressBar = styled.div`
    height: 20px;
    background: red;
    width: ${p => p.width}%;
`

export const AnimationBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${p => p.bg};
    animation: anim 2s forwards;
    transform-origin: top center;
`

export const PopupBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: red;
    z-index: 5;
`

export const PopupDiv = styled.div`
    width: 300px;
    padding: 25px;
    border-radius: 10px;
    background: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
`

export const SpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`