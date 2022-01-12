export default function Loading(props : {loading: boolean}){
    return(
        <>
            <div className="loading" style={{
                backgroundImage: "url(/loading.gif)", 
                position: "absolute", 
                bottom: "20px", 
                right: "20px", 
                zIndex: "99999", 
                display: (props.loading ? "block" : "none"),
                width: "70px",
                height: "70px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "50%",
                }}/>
        </>
    )
}