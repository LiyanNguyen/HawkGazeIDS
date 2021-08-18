$("#sidebar").mCustomScrollbar({theme:"minimal"});

function OpenSidebar()
{
	$("#sidebar").addClass("active");
	$(".overlay").addClass("active");
	$(".collapse.in").toggleClass("in");
}

function CloseSidebar()
{
	$("#sidebar").removeClass("active");
	$(".overlay").removeClass("active");
}