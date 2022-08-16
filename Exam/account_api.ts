enum Roles {
    USER,
    ADMIN
}

type IdType = number | undefined

enum Status {
    ACTIVE,
    SUSPENDED,
    DEACTIVATED
}

class User {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public gender: string,
        public user_role: Roles = Roles.USER,
        public pictureUrl: string,
        public description: string,
        public status: Status = Status.ACTIVE,
        public timestamp : Date,
        public modification : Date
    ) {
    }
}

const API_BASE_URL = "http://localhost:4000/api/accounts";

class BlogsController {

    doStuff(){
        document.getElementById("posts")!.innerHTML = `
        <div class="row">
            <form id="login-form">
                      <div class="input">
                          <input id="username_login" name="username_login" type="text" class="validate">
                          <label for="username">Username</label>
                      </div>
                  </div>
                  <div class="row">
                    <div class="input">
                        <input id="password_login" name="password_login" type="text" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div id="wrong">
                </div>
                <button class="btn waves-effect waves-light" id="login">Log In</button>
            </form>
        </div>
`;
  document
    .getElementById(`login`)!
    .addEventListener("click", (event) => this.login());
    }

    async login(){
        let addPostForm = document.getElementById("login-form")! as HTMLFormElement;
        let name = addPostForm.elements["username_login"].value
        let pass = (document.getElementById("password_login") as HTMLFormElement)!.value
        const users = this.getAllUsers()
        
        let count = 0
        for (var x of await users){
            if (x.username === name && x.password === pass){
                document.getElementById("wrong")!.innerHTML = ``
                this.login_msg(x)
                count = 1
            }
        }
        if (count === 0){
            document.getElementById("wrong")!.innerHTML = `
            <div>Wrong credentials</div>
            `
        }
    }

    login_msg(x){
        document.getElementById("posts")!.innerHTML = `
        <div class="row">
                      <h2 class="new">
                          GOOD JOB!
                      </h2>
                  </div>
                  <div class="row">
                    <h3 class="new">
                        YOU LOGGED IN,  ${x.username} WITH ROLE ${Roles[x.user_role]}
                    </h3>
                    <button class="btn waves-effect waves-light red lighten-1" id="logout">Log Out</button>
                    <button class="btn waves-effect waves-light" id="edit">Edit</button>
        </div>
`;
document
    .getElementById(`logout`)!
    .addEventListener("click", (event) => this.doStuff());
document
    .getElementById(`edit`)!
    .addEventListener("click", (event) => this.editPost(x));
    }


    postsSection = document.getElementById("posts")!;
    erorrsDiv = document.getElementById("errors")!;
    protected addPostForm = document.getElementById("add-post-form")! as HTMLFormElement;

  
    async init() {
      this.addPostForm.addEventListener('submit', this.handleSubmitPost);
      this.doStuff()
      }
  
    showError(err: any) {
      this.erorrsDiv.innerHTML = `<div>${err}</div>`;
    }

    async getAllUsers() {
        try {
          const postsResp = await fetch(API_BASE_URL);
          if (postsResp.status >= 400) {
            return Promise.reject(postsResp.body);
          }
          return postsResp.json();
        } catch (err) {
          return Promise.reject(err);
        }
      }

    editPost(post: User) {
        console.log("no time")
    //   this.fillPostForm(post);
    }
  
    fillPostForm(post: User) {
      let field: keyof User;
      for (field in post) {
        (document.getElementById(field) as HTMLFormElement).value = post[field];
        const label = document.querySelector(`#add-post-form label[for=${field}]`);
        if (label) {
          label.className = 'active';
        }
      }
    }


    getPostFormSnapshot(): User {
        const formData = new FormData(this.addPostForm);
        type PostDict = {
          [key: string]: string
        };
        const np: PostDict = {};
        formData.forEach((value, key) => {
          np[key] = value.toString();
        })
        return new User(parseInt(np.id), np.firstName, np.lastName, np.username, np.password, np.gender, Roles.USER, np.pictureUrl, np.description, Status.ACTIVE, new Date(), new Date());
      }

  
    handleSubmitPost = async (event: SubmitEvent) => {
      try {
        event.preventDefault();
        const post = this.getPostFormSnapshot();
        // const post = newPost as unknown as Post;
        if (post.id) {
            const updated = await this.updatePost(post);
          } else {
            const created = await this.addNewPost(post);
            this.resetForm();
          }
      } catch (err) {
        this.showError(err);
      }
    }

    updatePost(post){
        console.log("no time")
    }

    resetForm = () => {
        this.addPostForm.reset();
    }

    async addNewPost(user: User): Promise<User> {
        console.log(6)
        return this.handleRequest(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    private async handleRequest(url: string, options?: RequestInit) {
        try {
            const postsResp = await fetch(url, options);
            if (postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json();
        } catch (err) {
            return Promise.reject(err);
        }
    }
    
    async deletePostById(id: IdType): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
    }
  
    async deletePost(postId: IdType) {
      try {
        await this.deletePostById(postId);
        document.getElementById(postId!.toString())?.remove();
      } catch (err) {
        this.showError(err);
      }
    
    }}
  
  
  const blogsController = new BlogsController();
  
  blogsController.init();