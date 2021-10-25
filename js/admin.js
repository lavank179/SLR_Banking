// localStorage.getItem("admin-login-id");
var userid = localStorage.getItem("admin-login-id");
var accountno = localStorage.getItem("admin-account-no");

if (userid == "" && accountno == "") {
  document.body.innerHTML = "";
  alert("Current Valid Session of Admin is not found! please login to continue.");
  window.location.href = `../`;
} else {

// var url_string = window.location;
// var url = new URL(url_string);
// var userid = url.searchParams.get("admin-id");
// var accountno = url.searchParams.get("account-no");


$("#request-form-table").on("click", function () {
  let coll = document.querySelector("#request-table");
  coll.innerHTML = "";
  getRequestForm();
});

$("#change-user-table").on("click", function () {
  let coll = document.querySelector("#user-table");
  coll.innerHTML = "";
  getuserdetails();
});

$("#request_form").on("click", function () {
  req_form();
});


function req_form() {
  let form = document.getElementById("form1").value;
  let amount = document.getElementById("transac_amount").value;
  let ref_name = document.getElementById("refname").value;

  $.ajax({
    url: "https://lavankumar.000webhostapp.com/slr-video/form_request.php",
    method: "POST",
    data: {
      insert_form_request: 10,
      userid: userid,
      account_no: accountno,
      type: form,
      amount: amount,
      reference_name: ref_name,
    },
    success: function (data) {
      if (data == 2) {
        alert("You form request is submitted successfully!");
        getRequestForm();
      } else {
        alert("Some error in submitting your request");
      }
    },
  });
}

function getRequestForm() {
  $.ajax({
    url: "https://lavankumar.000webhostapp.com/slr-video/form_request.php",
    method: "POST",
    data: {
      request_form_details: 10,
      userID: userid,
      account_no: accountno,
      admin: 1,
    },
    success: function (data) {
      data = JSON.parse(data);
      let dt = data;

      if (dt != 3) {
        for (let i = 0; i < dt.length; i++) {
          deleteTable(dt[i].account_no,
            dt[i].form_id,
            dt[i].form_name,
            dt[i].request_type,
            dt[i].transaction_amount,
            dt[i].service_request_status);
        }
      } else {
        alert("Error in fetching details from Database!");
      }

    },
  });
}

function deleteTable(v1, v2, v3, v4, v5, v6) {
  printRequestDetails(v1, v2, v3, v4, v5, v6);
}

function printRequestDetails(v1, v2, v3, v4, v5, v6) {
  let coll = document.querySelector("#request-table");

  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");
  let td7 = document.createElement("td");
  let td8 = document.createElement("td");

  td1.innerHTML = v1;
  td2.innerHTML = v2;
  td3.innerHTML = v3;
  td4.innerHTML = v4;
  td5.innerHTML = v5;
  td6.innerHTML = v6;
  td7.innerHTML = `<div class="form-outline mb-4">
                    <select name="" id="${v2}">
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                    </select>
                    </div>`;
  td8.innerHTML = `<button class="btn btn-primary btn-block" onclick="changeStatus('${v2}');"> Submit </button>`;

  tr.append(td1);
  tr.append(td2);
  tr.append(td3);
  tr.append(td4);
  tr.append(td5);
  tr.append(td6);
  tr.append(td7);
  tr.append(td8);

  coll.appendChild(tr);
}


function changeStatus(statusb) {
  let st = $('#' + statusb).val();

  $.ajax({
    url: "hhttps://lavankumar.000webhostapp.com/slr-video/admin_approval.php",
    method: "POST",
    data: {
      approval: 1,
      form_id: statusb,
      status: st,
      apiKey: accountno
    },
    success: function (data) {
      data = JSON.parse(data);
      let dt = data;

      if (dt == 3) {
        alert(" Request status changed successfully by you(admin)! \n ID: " + statusb + " -- status: " + st);
        let coll = document.querySelector("#request-table");
        coll.innerHTML = "";
        getRequestForm();
      } else if (dt == 2) {
        alert(" Error in update checking status! ");
      } else if (dt == 1) {
        alert(" Error in updating status in DB! ");
      } else if (dt == 4) {
        alert(" APIkey is not correct! ");
      } else {
        alert(" Some error happend! please try again. \n Message: " + dt);
      }

    },
  });

}

$("#live_chat_connect").on("click", function () {
  connect_live_chat();
});

function connect_live_chat() {
  let call_type = document.querySelector("#form_video_type").value;
  let name = document.querySelector("#user_name").value;

  alert("Call Sent - Do you want to connect!");
  window.open(`../video-chat/index.html?user-id=${userid}&account-no=${accountno}&user-name=${name}&call-type=${call_type}`,'_blank');
}

function logout() {
  let isExecuted = confirm("Are you sure want to logout?");
  if(isExecuted){
    localStorage.setItem("admin-login-id", "");
    localStorage.setItem("admin-account-no", "");
    window.location.href = "../";
  } else {
    console.log("Not logged out! Staying here.");
  }
}

function getuserdetails() {
  $.ajax({
    url: "https://lavankumar.000webhostapp.com/slr-video/update_user_details.php",
    method: "POST",
    data: {
      get_user_details: 10,
      accountno: accountno,
      admin: 1,
    },
    success: function (data) {
      data = JSON.parse(data);
      let dt = data;

      if (dt != 3) {
        for (let i = 0; i < dt.length; i++) {
          printuserdetails(dt[i].account_no,
            dt[i].req_id,
            dt[i].ref_name,
            dt[i].phone,
            dt[i].address,
            dt[i].status);
        }
      } else {
        alert("Error in fetching details from Database!");
      }

    },
  });
}

function printuserdetails(v1, v2, v3, v4, v5, v6) {
  let coll = document.querySelector("#user-table");

  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");
  let td7 = document.createElement("td");
  let td8 = document.createElement("td");

  td1.innerHTML = v1;
  td2.innerHTML = v2;
  td3.innerHTML = v3;
  td4.innerHTML = v4;
  td5.innerHTML = v5;
  td6.innerHTML = v6;
  td7.innerHTML = `<div class="form-outline mb-4">
                    <select name="" id="${v2}">
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                    </select>
                    </div>`;
  td8.innerHTML = `<button class="btn btn-primary btn-block" onclick="changeUserStatus('${v2}');"> Submit </button>`;

  tr.append(td1);
  tr.append(td2);
  tr.append(td3);
  tr.append(td4);
  tr.append(td5);
  tr.append(td6);
  tr.append(td7);
  tr.append(td8);

  coll.appendChild(tr);
}

function changeUserStatus(statusb) {
  let st = $('#' + statusb).val();
  $.ajax({
    url: "https://lavankumar.000webhostapp.com/slr-video/update_user_details.php",
    method: "POST",
    data: {
      update_user_details: 1,
      request_id: statusb,
      status: st,
    },
    success: function (data) {
      data = JSON.parse(data);
      let dt = data;

      if (dt == 2) {
        alert("User details status changed successfully by you(admin)! \n ID: " + statusb + " -- status: " + st);
        let coll = document.querySelector("#user-table");
        coll.innerHTML = "";
        getuserdetails();
      } else if (dt == 6) {
        alert(" Error in update checking status! ");
      } else if (dt == 1) {
        alert(" Error in updating status in DB! ");
      } else if (dt == 3) {
        alert(" Some error in getting previous index id! ");
      } else if(dt == 4) {
        alert(" Rejecting status update failed");
      }  else if(dt == 5) {
        alert(" Updated Rejected status Successfully in DB! ");
        let coll = document.querySelector("#user-table");
        coll.innerHTML = "";
        getuserdetails();
      } else {
        alert(" Some error happend! please try again. \n Message: " + dt);
      }
    },
  });

}

}