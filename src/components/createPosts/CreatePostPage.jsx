import React from "react";
import FormCreatePosts from "./FormCreatePosts";
import TableCreatePostPage from "./TableCreatePostPage";

const CreatePostPage = () => {
  return (
    <React.Fragment>
      <main className='content px-3 py-2'>
        <div className='container-fluid'>
          <div className='mb-3 span-head span-btn-createPostPage'>
            <FormCreatePosts></FormCreatePosts>
          </div>

          <div className='card border-0'>
            <TableCreatePostPage />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default CreatePostPage;
