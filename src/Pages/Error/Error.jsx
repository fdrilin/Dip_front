import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    console.log(error);

    return (
        <div id="error-page" className="Main">
            <img src='https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png' alt='error' width='100%'/>
            
        </div>
    );
}