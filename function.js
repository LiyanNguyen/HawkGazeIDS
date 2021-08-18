function logout() {
	const params = new URLSearchParams(document.location.search);
	const user = params.get("user");
	var data = JSON.stringify({"request":"logout","user":user});
	
	$.ajax({
		type: 'POST',
		url: '../cgi-bin/ids-system.exe',
		data: data,
		dataType: "text",
		ContentType: "application/text; charset=utf-8",
		success: function (returnedData, status) {
			if (status == "success") {
				alert("logout successful");
				window.location.href="home.html";
			}
		},
		error: function (msg) {
			//alert("access failed：" + msg);
			$('.toast').toast('show');
			document.getElementById("toast-body-error-message").innerHTML = "access failed：" + msg;
		}
	});
}

function passSession(a){
	const params = new URLSearchParams(document.location.search);
	const user = params.get("user");
	const id = params.get("id");
	var href = a + "?user=" + user + "&id=" + id; 
	window.location.href = href;
}

function session() {
	const params = new URLSearchParams(document.location.search);
	const user = params.get("user");
	const id = params.get("id");
	var data = JSON.stringify({"request":"checksession","user":user,"id":id});
	
	$.ajax({
		type: 'POST',
		url: '../cgi-bin/ids-system.exe',
		data: data,
		dataType: 'text',
		ContentType: 'application/text; charset=utf-8',
		success: function (returnedData, status) {
			if (status == "success") {
				if(returnedData == "valid")
				{
					//do nothing
				}
				else
				{
					window.location.href="home.html";
				}
			}
		},
		error: function (msg) {
			//alert("access failed：" + msg);
			$('.toast').toast('show');
			document.getElementById("toast-body-error-message").innerHTML = "access failed：" + msg;
		}
	});
}

function retrieveNotificationSetting()
{
	$.ajax({
			type:'POST',
			url:'../cgi-bin/ids-system.exe',
			data:JSON.stringify({"request":"retrieveNotificationSetting"}),
			dataType:'text',
			ContentType:"application/text; charset=utf-8",
			success: function(returnData, status){
				const obj = JSON.parse(returnData);
				if(obj.status == "success")
				{
					if(window.location.href.search("notification-settings.html") > 0)
					{
						var d1 = '<div class="alert alert-secondary alert-dismissible fade show" role="alert">The last notification for traffic under priority 1 or 2.<button type="button" class="btn-close" data-bs-dismiss="alert"></button><hr><i class="text-muted" id="low">01-01-2020 22:45</i></div>';
						var d2 = '<div class="alert alert-warning alert-dismissible fade show" role="alert">The last notification for traffic under priority 3 or 4.<button type="button" class="btn-close" data-bs-dismiss="alert"></button><hr><i class="text-muted" id="medium">01-01-2020 22:45</i></div>';
						var d3 = '<div class="alert alert-danger alert-dismissible fade show" role="alert">The last notification for traffic under priority >= 5.<button type="button" class="btn-close" data-bs-dismiss="alert"></button><hr><i class="text-muted" id="high">02-02-2021 13:30</i></div>';
						if (document.getElementById("priority").value < 3)
						{
							document.getElementById("alert-notifs").innerHTML = d1 + d2 + d3;
							document.getElementById("low").innerHTML =  obj.low;
							document.getElementById("medium").innerHTML =  obj.medium;
							document.getElementById("high").innerHTML =  obj.high;
						}


						else if (document.getElementById("priority").value >= 3 && document.getElementById("priority").value < 5)
						{
							document.getElementById("alert-notifs").innerHTML = d2 + d3;
							document.getElementById("medium").innerHTML =  obj.medium;
							document.getElementById("high").innerHTML =  obj.high;
						}

						else if (document.getElementById("priority").value == 5)
						{
							document.getElementById("alert-notifs").innerHTML = d3;
							document.getElementById("high").innerHTML =  obj.high;
						}
					}
					if(obj.sendToApp == true)
						receiveNotification();
				}
			},
			error: function (msg){
				//alert(msg);
			}
		});
}
	
function receiveNotification()
{
	$.ajax({
		type:'POST',
		url:'../cgi-bin/ids-system.exe',
		data:JSON.stringify({"request":"receiveNotification"}),
		dataType:'text',
		ContentType:"application/text; charset=utf-8",
		success: function(returnData, status){
			if(returnData != "")
			{
				$('.toast').toast('show');
				document.getElementById("toast-body-error-message").innerHTML =  returnData;
			}
		},
		error: function (msg){
			//alert(msg);
		}
	});
}

$(document).ready(function(){
	session();//check valid user
	
	setInterval(function(){
		retrieveNotificationSetting()
	}, 1000);
});