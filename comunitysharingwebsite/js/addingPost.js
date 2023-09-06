class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  createPost() {
    const post = $(`
      <div class="post">
        <div class="initial-info">
          <img src="/assets/pfp1.png" alt="User" id="post-pic">
          <div class="post-info">
            <h2 id="post-title">${this.title}</h2>
            <h6 id="post-date">${getDate()}</h6>
          </div>
        </div>
        <div class="medium-info">
          <div class="text">
            <pre>
              ${this.content}
            </pre>
          </div>
        </div>
        <div class="interaction">
          <button class="interaction-button">
            <i class="far fa-thumbs-up"></i> Like
          </button>
          <button class="interaction-button">
            <i class="far fa-comment"></i> Comment
          </button>
          <button class="interaction-button">
            <i class="fas fa-share"></i> Share
          </button>
        </div>
        <div class="hidden"></div>
      </div>
    `);
    return post;
  }
}

$('.submit-button').click(function() {
  let title = $("#adding-title").val();
  let content = $("#adding-description").val();
  let post = new Post(title, content);
  $(".display-section").append(post.createPost());
});


