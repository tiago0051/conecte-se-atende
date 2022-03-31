import styled from 'styled-components'

export const StyledBalcão = styled.div`
    display: flex;
    flex-direction: column;

    > div {
        margin: .5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
        color: ${props => props.theme.colors.secondary};

        > label > input {
            font-size: 1.5rem;
            border-radius: 7px;
            border: 1px solid rgb(210, 210, 210);
            box-shadow: 0 0 2px rgb(200, 200, 200);
            padding: 0.5rem;
            width: 100%;
        }

        > button {
            background-color: ${props => props.theme.colors.secondary};
            color: white;
            border: 0;
            border-radius: 10px;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            cursor: pointer;
        }
    }

    > div:last-child {
        display: flex;
        flex-direction: column;

        div:first-child{
            width: 100%;
            height: calc(100vh - 24rem);
            overflow-y: scroll;
        }
        
        table {
            position: relative;
            overflow-y: hidden;
            width: 100%;
            border-collapse: collapse;
            

            thead {
                background-color: ${props => props.theme.colors.secondary};
                color: white;
                position: sticky;
                position: -webkit-sticky;
                top: 0;
                z-index: 2;
                width: 100%;

                th {
                    padding: 10px;
                    
                    border: 1px solid rgb(210, 210, 210);
                }
            }

            tbody {
                overflow-y: scroll !important;
                max-height: 200px;
                overflow-y: scroll;
                
                td {
                    border: 1px solid rgb(210, 210, 210);
                    height: calc((100vh - 27rem)/10);
                    text-align: center;
                }
            }
        }

        > div:last-child {
            margin-top: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100px;

            > button {
                padding: 15px 20px;
                border: 0;
                border-radius: 10px;
                background-color: ${props => props.theme.colors.secondary};
                color: white;
                font-size: 1rem;
                cursor: pointer;
            }

            > label {
                > input {
                    font-size: 1.5rem;
                    border-radius: 7px;
                    border: 1px solid rgb(210, 210, 210);
                    box-shadow: 0 0 2px rgb(200, 200, 200);
                    padding: 0.5rem;
                    width: 100%;
                }
            }
        }
    }

    @media (max-width: 768px) {
        > div:first-child {
            flex-direction: column;
            font-size: .7rem;
        }

        > div:nth-child(2) {
            button {
                width: 50%;
            }
        }

        > div:last-child {
            font-size: .7rem;
        }
    }
`