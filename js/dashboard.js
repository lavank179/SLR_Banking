var userid = localStorage.getItem("user-login-id");
var accountno = localStorage.getItem("user-account-no");

if (userid == "" && accountno == "") {
  document.body.innerHTML = "";
  alert("Current Valid Session is not found! please login to continue.");
  window.location.href = `../`;
} else {

  // var url_string = window.location;
  // var url = new URL(url_string);
  // var userid = url.searchParams.get("user-id");
  // var accountno = url.searchParams.get("account-no");

  let profile_name = document.querySelector("#profilename");
  profile_name.innerText = userid;

  $("#refresh").on("click", function () {
    let coll = document.querySelector("#request-table");
    coll.innerHTML = "";
    getRequestForm();
  });

  $("#request_form").on("click", function () {
    req_form();
  });

  $("#live_chat_connect").on("click", function () {
    connect_live_chat();
  });

  $("#change_user_details").on("click", function () {
    change_user_details();
  });

  $("#get_user_details").on("click", function () {
    let coll = document.querySelector("#user-details-table");
    coll.innerHTML = "";
    get_user_details();
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
      },
      success: function (data) {
        data = JSON.parse(data);
        let dt = data;

        if (data == 0) {
          let coll = document.querySelector("#request-table");
          coll.append(" No active request forms present for this account! Please submit some forms to display here.");
        }
        else if (dt[0].account_no == accountno) {
          for (let i = 0; i < dt.length; i++) {
            printRequestDetails(
              dt[i].account_no,
              dt[i].form_id,
              dt[i].form_name,
              dt[i].request_type,
              dt[i].transaction_amount,
              dt[i].service_request_status
            );
          }
        } else {
          alert("Error in fetching details from Database!");
        }

      },
    });
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

    td1.innerHTML = v1;
    td2.innerHTML = v2;
    td3.innerHTML = v3;
    td4.innerHTML = v4;
    td5.innerHTML = v5;
    td6.innerHTML = v6;

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);

    coll.appendChild(tr);
  }

  function connect_live_chat() {
    let call_type = document.querySelector("#form_video_type").value;
    let name = document.querySelector("#user_name").value;
    alert("Call Sent - Do you want to connect!");
    window.open(`../video-chat/index.html?user-id=${userid}&account-no=${accountno}&user-name=${name}&call-type=${call_type}`, '_blank');
  }

  function logout() {
    let isExecuted = confirm("Are you sure want to logout?");
    if (isExecuted) {
      localStorage.setItem("user-login-id", "");
      localStorage.setItem("user-account-no", "");
      window.location.href = "../";
    } else {
      console.log("Not logged out! Staying here.");
    }
  }

  function change_user_details() {
    let user_change = document.getElementById("username_change").value;
    let ph_change = document.getElementById("phone_change").value;
    let add_change = document.getElementById("address_change").value;
    let refname = document.getElementById("refe_name").value;

    $.ajax({
      url: "https://lavankumar.000webhostapp.com/slr-video/update_user_details.php",
      method: "POST",
      data: {
        insert_user_details: 10,
        name: user_change,
        account_no: accountno,
        phone: ph_change,
        address: add_change,
        ref_name: refname
      },
      success: function (data) {
        console.log(data);
        if (data == 2) {
          alert("Your change user details request is submitted successfully!");
        } else {
          alert("Some error in submitting your request");
        }
      },
    });
  }

  function get_user_details() {
    $.ajax({
      url: "https://lavankumar.000webhostapp.com/slr-video/update_user_details.php",
      method: "POST",
      data: {
        get_user_details: 10,
        accountno: accountno
      },
      success: function (data) {
        data = JSON.parse(data);
        let dt = data;

        if (data == 0) {
          let coll = document.querySelector("#user-details-table");
          coll.append(" No active request forms present for this account! Please submit some forms to display here.");
        }
        else if (dt[0].account_no == accountno) {
          for (let i = 0; i < dt.length; i++) {
            printUserDetails(
              dt[i].account_no,
              dt[i].req_id,
              dt[i].ref_name,
              dt[i].phone,
              dt[i].address,
              dt[i].status
            );
          }
        } else {
          alert("Error in fetching details from Database!");
        }

      },
    });
  }


  function printUserDetails(v1, v2, v3, v4, v5, v6) {
    let coll = document.querySelector("#user-details-table");

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");

    td1.innerHTML = v1;
    td2.innerHTML = v2;
    td3.innerHTML = v3;
    td4.innerHTML = v4;
    td5.innerHTML = v5;
    td6.innerHTML = v6;

    console.log(td1, td2, td3, td4);

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);

    coll.appendChild(tr);
  }
}