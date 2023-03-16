data.acctList =result
form.getComponent('account').setValue(result[0].AccountId)
// form.getComponent('account').redraw()

if(!form.formState.listBalance){
  form.formState.listBalance = []
}
instance.emit('loadTranHis', component)
instance.emit('loadCarousel', component)



const getItem =()=>{

  return result.map((value,index) => {
        return (
            `
            <div class="swiper-slide">
            <div class="account-card ${value.AccountType === 'SBA'? "saving-account-bg" : value.AccountType === 'CAA' ? "current-account-bg" : "another-account-bg" }">
            <div class="account-type">
                 <div class="account-type-info">${value.AcctTypeName}</div>
                 <div class="account-detail-icon-redirect">
                    <a  href=${utils.formatUrl('accountdetail?acctId='+value.AccountId+'&type='+value.CompanyId)} class="account-detail-view">detail</a>
                 </div>
            </div>
            <div class="account-detail-icon-qr"> 
                <div class= "account-detail-icon-qr-wraper">
                  <p  class="qr-icon" data-accName-q = "${value.AccountName}" data-ccyid-q ="${value.CcyId}" data-accNo-q ="${value.AccountNo}" data-accID-q="${value.AccountId}" ></p>
                </div>
            </div>
            <div class="account-info">
                <div class="account-no">
                    <p>${utils.getLangText('accountnumber')}</p>
                    <p style="font-weight: bold;letter-spacing: 2px;">${value.AccountMask}</p>
                </div>
               <div class="wapper-acc-info">
                  <div class="account-name">
                      <p >${utils.getLangText('name')}</p>
                      <p style="font-weight: bold; margin-bottom: 0; font-size: 14px;">${value.AccountName}</p>
                  </div>
                  <div class="account-balance">
                      <p>${utils.getLangText('balance')}</p>
                      <div class="balance-value">
                      <i data-accId="${value.AccountId}" data-accNo= "${value.AccountNo}" data-companyId="${value.CompanyId}" class="fa fa-eye" aria-hidden="true"></i>
                      <p class='wrapper-loading'><span class='custom-loader'></span></p>
                      <p  class='balance-info' data-balance='false' data-accNo-p= "${value.AccountNo}" data-accId-p="${value.AccountId}" >**********</p>
                      <p style="margin-left: 5px">${value.CcyId}</p>
                      </div>
                  </div>
               </div>
            </div>
        </div>
        </div>
            `
        )
  })
}


const carosel = `
          <div class="acount-list-container">
            <h3>${utils.getLangText('accountlist')}</h3>
            <div class="swiper accountist-slider">
              <div class="swiper-wrapper">
                   ${getItem().join('')}
              </div>
              <div class="swiper-pagination"></div>
              </div>
           </div>
        `
        
document.querySelector('.waper-acount-list').innerHTML = carosel
var swiperBottom = new Swiper(".bottom-slider-home", {
  slidesPerView: 1,
    loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


var swiperRun = new Swiper(".accountist-slider", {
      slidesPerView: 1,
      grid: {
        rows: 1,
      },
      spaceBetween: 15,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      }, 
      breakpoints: {
          640: {
              slidesPerView: 2,
              grid: {
                  rows: 2,
              },
              spaceBetween: 20,
              },
          1366: {
              slidesPerView: 2,
              grid: {
                  rows: 2,
              },
              spaceBetween: 30,
          },
        }, 
    });
document.querySelectorAll('.account-card .balance-value i').forEach((bullet, bulletIndex) => {
   bullet.addEventListener('click', () => {
       data.accId = bullet.getAttribute('data-accId');
       data.accNo = bullet.getAttribute('data-accNo');
       data.companyId = bullet.getAttribute('data-companyId');
      const currentBalance =  form.formState.listBalance.find((value) => value.accNo === data.accNo)
       if(!!currentBalance){
          const balanceShow =  document.querySelector(`p[data-accNo-p="${data.accNo}"]`).getAttribute('data-balance')
          if(balanceShow === 'true'){
              document.querySelector(`p[data-accNo-p="${data.accNo}"]`).innerHTML = '**********'
              document.querySelector(`p[data-accNo-p="${data.accNo}"]`).setAttribute("data-balance", "false")
              bullet.classList.remove('fa-eye-slash')
              bullet.classList.add('fa-eye')
              bullet.nextElementSibling.querySelector(".custom-loader").style.display = "none"
            }else{
              document.querySelector(`p[data-accNo-p="${data.accNo}"]`).innerHTML = utils.numberWithCommas(currentBalance.accBalance)
              document.querySelector(`p[data-accNo-p="${data.accNo}"]`).setAttribute("data-balance", "true")
              bullet.classList.remove('fa-eye')
              bullet.classList.add('fa-eye-slash')
              bullet.nextElementSibling.querySelector(".custom-loader").style.display = "none"
          }
       }else{
          instance.emit('loadBalance', component)
          bullet.nextElementSibling.querySelector(".custom-loader").style.display = "block"
          bullet.classList.remove('fa-eye')
          bullet.classList.remove('fa-eye-slash')
       }
    })
})
document.querySelectorAll(".qr-icon").forEach((node) => {
  node.addEventListener("click", function () {
    data.transactionType = "GENMBACTQR";
    data.codeType = "QR";
    data.RecvAmount = "";
    data.invoiceNumber = "";
    data.description = "";
    data.accountName = node.getAttribute("data-accName-q");
    data.ccid = node.getAttribute("data-ccyid-q");
    data.accNo = node.getAttribute("data-accNo-q");
    data.accId = node.getAttribute("data-accID-q");
    form.getComponent('disabledPopupQr').setValue(0)
     instance.emit("genQrCode");
  });
});

document.querySelector('.image-qr-code-wrapper-ib').classList.remove('active')

const qrCloses = document.querySelectorAll('.qr-code-close-icon')
qrCloses.forEach((qrClose)=>{
  qrClose.addEventListener('click',(e)=>{
    document.querySelector('.qr-main').classList.toggle('active')
    form.getComponent('disabledPopupQr').setValue('')
    console.log('a');
  })
})



