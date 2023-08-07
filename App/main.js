const postForm = document.getElementById("postForm");
const alertmsg = document.querySelector(".alertmsg");
const closealertmsg = document.querySelector(".closealertmsg");
const postDiv = document.querySelector(".latest-posts");

//Show post
const showAllPost = () => {
  const posts = getLsData("post");
  let content = "";
  if (posts.length > 0) {
    posts.reverse().map((item, index) => {
      content += `
                    <div class="post-container">
                        
                        <div class="post-header">
                            <div class="author">
                                <div class="author-profile-img">
                                    <img src="${item.author_img}" alt="">
                                </div>
                                <div class="post-author-name">
                                    <a href="#">${item.author_name}</a>
                                    <span><i class="fas fa-circle"></i> ${formatTimestamp(
                                      item.post_time
                                    )}</span>
                                    <a href="#"></a>
                                    <p>Chattogram, Bangladesh</p>
                                </div>
                            </div>
                            <div class="three-dot">
                                <a href="#"><i class="fas fa-ellipsis-h"></i></a>
                            </div>
                        </div>
    
                        <!------ Post Body ------>
                        <div class="post-body">
                            <div class="post-img">
                                <img src="${item.post_img_url}" alt="">
                            </div>
                            <div class="post-reaction">
                                <div class="p-reaction-left">
                                    <div class="post-like post-icon">
                                        <span><i class="far fa-heart"></i></span>
                                    </div>
                                    <div class="post-comment post-icon">
                                        <span><i class="far fa-comment"></i></span>
                                    </div>
                                    <div class="post-share post-icon">
                                        <span><i class="far fa-paper-plane"></i></span>
                                    </div>
                                </div>
                                <div class="post-save post-icon">
                                    <span><i class="far fa-bookmark"></i></span>
                                </div>
                            </div>
                            <div class="post-like-total">
                                <p> 20,028,910 likes</p>
                            </div>
                            <div class="post-content">
                                ${item.post_content}
                            </div>
                            <div class="write-comment">
                                <p>View all 176k comments</p>
                                <form action="#">
                                    <input type="text" name="" id="" placeholder="Add a comment…">
                                </form>
                                <span><i class="far fa-smile"></i></span>
                            </div>
                        </div>    
                        
                    </div>

                </div>
            </div>`;
    });
  } else {
    content = `<h2 class=" text-center">No post found</h2>
    <p  class="text-center">Please click <a href="" data-bs-toggle="modal" data-bs-target="#postModal"><b>(+ Create)</b></a> Button to create a post

</p>`;
  }
  postDiv.innerHTML = content;
};
showAllPost();
//Close alertmessage when closing modal
closealertmsg.onclick = () => {
  alertmsg.innerHTML = "";
};

postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let form_data = new FormData(e.target);
  let data = Object.fromEntries(form_data);

  //form validation
  if (!data.author_name || !data.author_img) {
    alertmsg.innerHTML = showAlert("Author name and image is required");
  } else {
    const prevData = getLsData("post");
    alertmsg.innerHTML = showAlert("Success", "success");
    // data.post_time = Date.now();
    prevData.push({
      author_name: data.author_name,
      author_img: data.author_img,
      post_content: data.post_content,
      post_img_url: data.post_img_url,
      post_time: Date.now(),
    });

    setLsData("post", prevData);
    e.target.reset();
    showAllPost();

    //Hide alertmessage after 2 sec of creating a post
    setTimeout(() => {
      alertmsg.innerHTML = "";
    }, 2000);
  }
});
