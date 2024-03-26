import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const table = css`
    box-sizing: border-box;
    border-collapse: collapse;
    border: 1px solid #dbdbdb;

    & th, tr, td {
        box-sizing: border-box;
        border-collapse: collapse;
        border: 1px solid #dbdbdb;
        text-align: center;
    }

    & td {
        height: 100px;
        width: 100px;
        font-size: 12px;
        cursor: pointer;
        &:hover{
            background-color: #eeeeee;
        }
    }

    & td:nth-of-type(1) {
        font-size: 14px;
        font-weight: 600;
    }
`
export const inputBox = css`
    display: flex;
    align-items: center;
`

export const inputText = css`
    width: 400px;
    height: 25px;
    margin: none;
    margin-top: 20px;
    margin-left: 20px;
`
export const select = css`
    width: 100px;
    height: 25px;
    text-align: center;
    margin: none;
    margin-top: 20px;
    margin-left: 20px;
`

export const button = css`
    width: 75px;
    margin: 20px 0px 0px 10px

`