function start() {
  renderMenu();
  getData(renderTableData);
  handleCreatePost();
  hadleDeletePost();
  clearInput();
  searchMenu();
}
const menuLeft = document.querySelector(".menu-left");
var api = "https://jsonplaceholder.typicode.com/posts";
const listMenu = [
  {
    iconRightName: "aperture-outline",
    menuContent: "Corporate",
    listMenuChildren1: "Corporate1",
    listMenuChildren2: "Corporate2",
    listMenuChildren3: "Corporate3",
  },
  {
    iconRightName: "analytics-outline",
    menuContent: "Transaction",
    listMenuChildren1: "Transaction1",
    listMenuChildren2: "Transaction2",
    listMenuChildren3: "Transaction3",
  },
  {
    iconRightName: "browsers-outline",
    menuContent: "Walet",
    listMenuChildren1: "Walet1",
    listMenuChildren2: "Walet2",
    listMenuChildren3: "Walet3",
  },
  {
    iconRightName: "settings-outline",
    menuContent: "System",
    listMenuChildren1: "System1",
    listMenuChildren2: "System2",
    listMenuChildren2: "System3",
  },
  {
    iconRightName: "list-outline",
    menuContent: "List",
    listMenuChildren1: "List1",
    listMenuChildren2: "List2",
    listMenuChildren2: "List3",
  },
  {
    iconRightName: "logo-bitcoin",
    menuContent: "Fee",
    listMenuChildren1: "Fee1",
    listMenuChildren2: "Fee2",
    listMenuChildren2: "Fee3",
  },
  {
    iconRightName: "cellular-outline",
    menuContent: "Limit",
    listMenuChildren1: "Limit1",
    listMenuChildren2: "Limit2",
    listMenuChildren2: "Limit3",
  },
  {
    iconRightName: "chatbox-outline",
    menuContent: "Notice",
    listMenuChildren1: "Notice1",
    listMenuChildren2: "Notice2",
    listMenuChildren2: "Notice3",
  },
];

//render menu
const renderMenu = function () {
  const htmls = listMenu.map(function (menu, index) {
    return `
        <div class="menu-left__option">
        <ul class="menu-left__list">
            <li class="menu-left__item">
                <div class="menu-left__item-box">
                    <div class="menu-left__item-logo">
                        <ion-icon name="${menu.iconRightName}" class="menu-left__item-logo-icon"></ion-icon>
                    </div>
                    <div class="menu-left__item-text">
                        <a href="" class="menu-left__item-link">
                        ${menu.menuContent}
                         </a>
                    </div>
                    <div class="menu-left__item-option">
                        <nav class="nav-menu-icon">
                            <ion-icon name="caret-back-outline" class="menu-left__item-option-icon"></ion-icon>
                        </nav>
                        
                            <div class="menu-children">
                                <ul class="menu-children-list">
                                    <li class="menu-children-item">
                                        <a href="#" class="menu-children-link">
                                            ${menu.listMenuChildren1}
                                        </a>
                                    </li>
                                    <li class="menu-children-item">
                                        <a href="#" class="menu-children-link">
                                        ${menu.listMenuChildren2}
                                        </a>
                                    </li>
                                    <li class="menu-children-item">
                                        <a href="#" class="menu-children-link">
                                        ${menu.listMenuChildren3}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
            </li>
            
        </ul>
    </div>
        `;
  });
  menuLeft.innerHTML += htmls.join("");
};

//getPost from api
const getData = function (callback) {
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

//render table Data
const renderTableData = function (datas) {
  const table = document.getElementById("table-data");
  let htmls = datas.map((data) => {
    return `
          <tr class="list-row-${data.id}">
          <td class="post-id" >${data.id}</td>
            <td class="user-id" >
                <button class="btn-detail">${data.userId}</button>
            </td>
            <td class="post-title" >${data.title}</td>
            <td class="post-body" >${data.body}</td>
            <td>
            <div class="action btn-action">
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
            <div class="action-box">
                <div class="action-edit" onClick = "handleUpdatePost(${data.id})">
                    <ion-icon name="create-outline"></ion-icon>
                    Edit
                </div>
                <div class="action-delete" onClick="hadleDeletePost(${data.id})" >
                    <ion-icon name="close-circle-outline"></ion-icon>
                    Delete
                </div>
            </div>
            </div> 
            </td>
        </tr>
          `;
  });
  table.innerHTML += htmls.join("");
};

// Add New Post
const createPost = function (data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };
  fetch(api, options)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};
const handleCreatePost = function () {
  const btnAdd = document.querySelector(".btn-add");
  btnAdd.onclick = function () {
    let postID = document.querySelector('input[name = "ID"]').value;
    let postUserID = document.querySelector('input[name = "user-ID"]').value;
    let postTitle = document.querySelector('input[name = "title"]').value;
    let postBody = document.querySelector('input[name = "body"]').value;
    let formData = {
      userId: postUserID,
      id: postID,
      title: postTitle,
      body: postBody,
    };
    createPost(formData, function () {
      getData(renderTableData);
    });
  };
};

//Delete Post
const hadleDeletePost = function (id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(api + "/" + id, options)
    .then((response) => {
      return response.json();
    })
    .then(function () {
      var coursesItems = document.querySelector(".list-row-" + id);
      if (coursesItems) {
        coursesItems.remove();
      }
    });
};

//Update
const updatePost = function (data, id, callback) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(api + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
};
const handleUpdatePost = function (id) {
  getPostById(id);
  let createBtn = document.querySelector(".btn-add");
  createBtn.onclick = function () {
    /* let postID = document.querySelector('input[name = "ID"]').value; */
    let postUserID = document.querySelector('input[name = "user-ID"]').value;
    let postTitle = document.querySelector('input[name = "title"]').value;
    let postBody = document.querySelector('input[name = "body"]').value;
    let formData = {
      userId: postUserID,
      /* id: postID, */
      title: postTitle,
      body: postBody,
    };
    updatePost(formData, id, function () {
      getData(renderTableData);
    });
  };
};
const getPostById = function (id) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    /* body: JSON.stringify(data) */
  };
  fetch(api + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (post) {
      let postID = document.querySelector('input[name = "ID"]');
      let postUserID = document.querySelector('input[name = "user-ID"]');
      let postTitle = document.querySelector('input[name = "title"]');
      let postBody = document.querySelector('input[name = "body"]');
      let updateBtn = document.querySelector(".btn-add");
      postID.value = post.id;
      postUserID.value = post.userId;
      postTitle.value = post.title;
      postBody.value = post.body;
      updateBtn.textContent = "Update";
    });
};

const clearInput = function () {
  let btnClear = document.querySelector(".btn-clear");
  btnClear.onclick = function () {
    document.querySelector('input[name = "ID"]').value = null;
    document.querySelector('input[name = "user-ID"]').value = null;
    document.querySelector('input[name = "title"]').value = null;
    document.querySelector('input[name = "body"]').value = null;
  };
};

//search Post
const searchPost = function (id) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(api + "?userId=" + id, options)
    .then((response) => {
      return response.json();
    })
    .then(function () {
      var coursesItems = document.querySelector(".list-row-" + id);
      if (coursesItems) {
        coursesItems.remove();
      }
    });
};

//search Menu
const searchMenu = function () {
  const listMenuChild = document.querySelectorAll(".menu-children-link");
  const searchInput = document.getElementById("input-search");
  const listDataItem = document.querySelector(".data-item");
  const listData = document.querySelector(".data-list");
  searchInput.addEventListener("input", function () {
    Array.from(listMenuChild).forEach(function (a) {
      let search = searchInput.value.toLowerCase();
      let text = a.innerHTML.toLowerCase();
      let found = text.indexOf(search);
      console.log(a);
      if ((search = "")) {
        a.style.display = "block";
        listDataItem.innerHTML += `<p>${a.innerHTML}</p>`;
      } else if (found == -1) {
        //a.style.display = "none";
        clear();
      } else {
        //listDataItem.innerHTML += `<a>${a.innerHTML}</a>`;
      }
    });
  });
  function clear() {
    document.querySelector(".data-list").value = null;
  }
};
start();
