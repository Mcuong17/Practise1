function start() {
  backToMainPage();
  getDataDetail(renderTableDetail);
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.id;
let apiDetail = "https://jsonplaceholder.typicode.com/posts/" + value;
console.log(apiDetail);
const backToMainPage = function () {
  let btnBack = document.querySelector(".btn-back");
  btnBack.addEventListener("click", function () {
    window.location.href = "./index.html";
  });
};

const getDataDetail = function (callback) {
  fetch(apiDetail)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const renderTableDetail = function (datas) {
  const table = document.querySelector(".table-detail");
  let htmls = `<tr>
                    <td>${datas.id}</td>
                    <td>${datas.userId}</td>
                    <td>${datas.title}</td>
                    <td>${datas.body}</td>
                </tr>`;
  table.innerHTML += htmls;
};

start();
