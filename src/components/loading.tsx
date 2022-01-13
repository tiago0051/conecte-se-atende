import Image from "next/image";
import styled from "styled-components";

interface IContainer {
    loading?: string
}

const Container = styled.div<IContainer>`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 99999;
    display: ${props => props.loading == "true" ? "flex" : "none"};
    justify-content: "center";
    align-items: "center";

    span {
        border-radius: 50% !important;
    }
`

export default function Loading(props : {loading: string}){
    return(
        <Container loading={props.loading}>
            <Image src="/loading.gif" alt="Carregando..." width={100} height={100} layout={"fixed"}/>
        </Container>
    )
}