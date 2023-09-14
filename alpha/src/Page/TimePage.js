import { useLocation } from "react-router-dom";

export default function TimePage(){
    const location = useLocation();
    const data = location.state;
    console.log(data)
    return(
        <div>
            Hello
        </div>
    );
}