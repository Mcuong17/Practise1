function start() {
  renderMenu();
  getData(renderTableData);
  handleCreatePost();
  hadleDeletePost();
  handleSearchPost();
  clearInput();
  searchMenu();
  handleCheckbox();
  handleDeleteCheckbox();
  toggleAction();
}
const menuLeft = document.querySelector(".menu-left");
var api = "https://jsonplaceholder.typicode.com/posts";
const listMenu = [
  {
    iconRightName: "fa-solid fa-globe",
    menuContent: "Corporate",
    arrayMenuChild: [
      {
        name: "Corporate Child",
        quantity: "2",
      },
    ],
  },
  {
    iconRightName: "fa-solid fa-arrow-right-arrow-left",
    menuContent: "Transaction",
    arrayMenuChild: [
      {
        name: "Transaction Child",
        quantity: "1",
      },
    ],
  },
  {
    iconRightName: "fa-solid fa-wallet",
    menuContent: "Walet",
    arrayMenuChild: [
      {
        name: "Walet Child",
        quantity: "1",
      },
    ],
  },
  {
    iconRightName: "fa-solid fa-gear",
    menuContent: "System",
    arrayMenuChild: [
      {
        name: "System",
        quantity: "1",
      },
    ],
  },
  {
    iconRightName: "fa-solid fa-clipboard-list",
    menuContent: "List",
    arrayMenuChild: [
      {
        name: "List",
        quantity: "1",
      },
    ],
  },
  {
    iconRightName: "fa-sharp fa-solid fa-dollar-sign",
    menuContent: "Fee",
    arrayMenuChild: [
      {
        name: "Fee",
        quantity: "1",
      },
    ],
  },
  {
    iconRightName: "fa-solid fa-sliders",
    menuContent: "Limit",
    arrayMenuChild: [
      {
        name: "Limit",
        quantity: "1",
      },
    ],
  },
  {
    iconRightName: "fa-solid fa-message",
    menuContent: "Notice",
    arrayMenuChild: [
      {
        name: "Notice",
        quantity: "1",
      },
    ],
  },
];

//render menu
const renderMenu = function () {
  const a = listMenu.map((menu) => {
    return menu.arrayMenuChild.map((menu2) => {
      return `<div class="menu-left__option">
          <ul class="menu-left__list">
              <li class="menu-left__item">
                  <div class="menu-left__item-box">
                      <div class="menu-left__item-logo">
                          <i class="${menu.iconRightName} menu-left__item-logo-icon"></i>
                      </div>
                      <div class="menu-left__item-text">
                          <p class="menu-left__item-link">
                          ${menu.menuContent}
                           </p>
                      </div>
                      <div class="menu-left__item-option">
                          <nav class="nav-menu-icon">
                              <i class="fa-solid fa-caret-left menu-left__item-option-icon"></i>
                          </nav>
                          <div class="menu-children">
              <ul class="menu-children-list">
                  <li class="menu-children-item">
                  <a href="#" class="menu-children-link">
                      ${menu2.name} ${menu2.quantity}
                  </a>
                  </li>
              </ul>
              </div>
          </div>
          </div>
          </li>
          </ul>
          </div>`;
    });
  });
  menuLeft.innerHTML += a.join("");
  const htmlMenu = listMenu.map(function (menu, index) {
    return `
        <div class="menu-left__option">
        <ul class="menu-left__list">
            <li class="menu-left__item">
                <div class="menu-left__item-box">
                    <div class="menu-left__item-logo">
                        <i class="${menu.iconRightName} menu-left__item-logo-icon"></i>
                    </div>
                    <div class="menu-left__item-text">
                        <p class="menu-left__item-link">
                        ${menu.menuContent}
                         </p>
                    </div>
                    <div class="menu-left__item-option">
                        <nav class="nav-menu-icon">
                            <i class="fa-solid fa-caret-left menu-left__item-option-icon"></i>
                        </nav>
                        <div class="menu-children">
                    <ul class="menu-children-list">
                        <li class="menu-children-item">
                            
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
  const menuParent = htmlMenu.join("");
  //const totalMenu = menuParent + menuChild;
  //menuLeft.innerHTML += menuParent;
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
  const table = document.getElementById("table-body");
  let htmls = datas.map((data) => {
    return `
      

      <tr class="list-row-${data.id} list-row" data-expanded="false" ontouchstart="touchstart(event)" ontouchmove="touchmove(event)" ontouchend="touchend(${data.id})" >
        <td class="list-first-item" ></td>
        <td class="list-checkbox">
            <input type="checkbox" name="postIds[]" class="checkbox-item" value="${data.id}" >
        </td>
        <td class="post-id" >
        <button class="btn-detail" onClick="handleDetail(${data.id})"> ${data.id} </button>
        </td>
            <td class="user-id" >
            ${data.userId}
            </td>
            <td class="post-title" >${data.title}</td>
            <td class="post-body" >${data.body}</td>
            <td class="table-last-data">
            <div class="action">
              <div class="div-icon">
              <i class="fa-solid fa-ellipsis"></i>
              </div>
              </div> 
              <div class="action-box">
                  <div class="action-edit" onClick = "handleUpdatePost(${data.id})">
                  <i class="fa-solid fa-pen-to-square"></i>
                      Edit
                  </div>
                  <div class="action-delete" onClick="hadleDeletePost(${data.id})" >
                  <i class="fa-solid fa-trash"></i>
                      Delete
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
    if (postBody == "" || postUserID == "" || postTitle == "") {
      showErrorToast();
    } else {
      createPost(formData, function () {
        getData(renderTableData);
      });
    }
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
      var postItems = document.querySelector(".list-row-" + id);
      if (postItems) {
        postItems.remove();
        showSuccessToast();
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
    showSuccessToast();
  };
};

/* Handle Detail */
const handleDetail = function (id) {
  window.location.href = `./detail.html?id=${id}`;
};

//search Post
const searchPost = function (userid, callback) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    /* body: JSON.stringify(data), */
  };
  fetch(api + "?userId=" + userid, options)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const handleSearchPost = function () {
  let btnSearch = document.querySelector(".btn-search");
  let postUserID = document.querySelector('input[name = "user-ID"]');
  postUserID.addEventListener("input", (e) => {
    if (e.textContent != "") {
      btnSearch.classList.remove("btn-nonactive");
    } else if (e.textContent == "") {
      btnSearch.classList.add("btn-nonactive");
    }
  });

  btnSearch.onclick = function () {
    let postUserID = document.querySelector('input[name = "user-ID"]').value;
    if (postUserID == "") {
      showErrorToast();
    } else {
      searchPost(postUserID, function () {
        getData(renderTableData);
      });
    }
  };
};
//Delete all went check

//search Menu
const searchMenu = function () {
  const listMenuChild = document.querySelectorAll(".menu-children-link");
  const searchInput = document.getElementById("input-search");
  const listDataItem = document.querySelector(".data-item");
  const listData = document.querySelector(".data-list");
  searchInput.addEventListener("input", fillterList);
  function fillterList() {
    const searchInput = document.querySelector("#input-search");
    const filter = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll(".menu-children-link");
    let dataListSearch = document.querySelector(".data-list");
    listItems.forEach((item) => {
      let text = item.textContent;
      if (filter != "") {
        if (text.toLowerCase().includes(filter.toLowerCase())) {
          /* item.style.display = "";  khi rỗng vẫn là true ? */
          /*  console.log(text.toLowerCase().includes(filter.toLowerCase())); */
          /* console.log(item.textContent.trim()); */
          /* dataListSearch.innerText = item.textContent.trim(); */
          dataListSearch.innerHTML = `<a>${item.textContent.trim()}</a>`;
          dataListSearch.style.display = "block";
          dataListSearch.style.padding = 10 + "px";
        } else {
          /* dataListSearch.style.display = "block";
          dataListSearch.innerText = "No result"; */
        }
      } else {
        /* dataListSearch.innerText = "No result"; */
        dataListSearch.style.display = "none";
      }
    });
  }
};

// Handle checkbox
function toggle(source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source) checkboxes[i].checked = source.checked;
  }
}

const handleCheckbox = function () {
  document.getElementsByTagName('input[class="checkbox-item"]');
  var postId = document.querySelector(".list-checkbox");
};
handleCheckbox();
const handleDeleteCheckbox = function () {
  let btnDelete = document.querySelector(".btn-delete");
  let val = [];
  btnDelete.addEventListener("click", function () {
    let inputCheck = document.querySelectorAll(".checkbox-item:checked");
    inputCheck.forEach(function (i) {
      val.push(i.value);
    });
    sessionStorage.setItem("test", JSON.stringify(val));
    let arrayID = JSON.parse(sessionStorage.test);
    for (let i in arrayID) {
      let test = document.querySelector(".list-row-" + arrayID[i]);
      if (test) {
        test.remove();
        /*  delete sessionStorage.test; */
        showSuccessToast();
      }
    }
  });
};
var startingX, startingY, movingX, movingY;
const touchstart = function (event) {
  startingX = event.touches[0].clientX;
  startingY = event.touches[0].clientY;
};
const touchmove = function (event) {
  movingX = event.touches[0].clientX;
  movingY = event.touches[0].clientY;
};
const touchend = function (id) {
  let actionBoxs = document.querySelectorAll(".action-box");
  if (startingX + 100 < movingX) {
    // event went user tough right
    console.log("right");
    row = document.querySelector(`.list-row-${id}`);
    row.style.right = 0;
    actionBoxs.forEach((actionBox) => {
      actionBox.style.opacity = 0;
    });
  } else if (startingX - 100 > movingX) {
    // event went user tough left
    console.log("left");
    row = document.querySelector(`.list-row-${id}`);
    row.style.right = 30 + "%";
    actionBoxs.forEach((actionBox) => {
      actionBox.style.opacity = 1;
    });
  }
  if (startingY + 100 < movingY) {
    console.log("down");
  } else if (startingY - 100 < movingY) {
    console.log("top");
  }
};

const toggleAction = function () {
  let actionBoxs = document.querySelectorAll(".action-box");

  actionBoxs.forEach((actionBox) => {
    actionBox.style.display = "block";
  });
};
let action = document.querySelectorAll(".action");
console.log(action);
start();
