import React from "react";
import HomePages from "../mainPages/HomePages";
import FormCreatePosts from "./FormCreatePosts";

const CreatePostPage = () =>{
return (
    <React.Fragment>
<main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="mb-3 span-head">
                      <FormCreatePosts></FormCreatePosts>
                    </div>
                
                    <div className="card border-0">
                        
                           <HomePages></HomePages>               
                    </div>
                </div>
            </main>
             <div className="theme-toggle">
                <i className="fa-regular fa-moon"></i>
                <i className="fa-regular fa-sun"></i>
            </div>
    </React.Fragment>
)
}

export default CreatePostPage;